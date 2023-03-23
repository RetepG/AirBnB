const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage } = require('../../db/models');

const router = express.Router()

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a street address.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a city.'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a state.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a country.'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a latitude.'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a longitude.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a name.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a description for your place.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Enter in your desired price.'),
    handleValidationErrors
];

//get all users
router.get('/', async (req, res) => {
    // Find all spots and their associated data
    const spots = await Spot.findAll({
        attributes: [
            'id', 'ownerId', 'address', 'city', 'state',
            'country', 'lat', 'lng', 'name', 'description',
            'price', 'createdAt', 'updatedAt',
            // include the average rating using a subquery
            [
                sequelize.literal(`(SELECT AVG(stars)
                FROM Reviews
                WHERE Reviews.spotId = Spot.id
                )`), 'avgRating'
            ],
            [
                sequelize.literal(`(SELECT url
                FROM "SpotImages"
                WHERE "SpotImages"."spotId" = "Spot"."id")`), 'previewImage',
            ],
        ]
    });

    // Return all spots as the response
    return res.status(200).json({ Spots: spots });
});

//get spot by user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        attributes: [
            'id', 'ownerId', 'address', 'city', 'state',
            'country', 'lat', 'lng', 'name', 'description',
            'price', 'createdAt', 'updatedAt',
            // include the average rating using a subquery
            [
                sequelize.literal(`(SELECT AVG(stars)
                FROM Reviews
                WHERE Reviews.spotId = Spot.id
                )`), 'avgRating'
            ],
            [
                sequelize.literal(`(SELECT url
                FROM "SpotImages"
                WHERE "SpotImages"."spotId" = "Spot"."id")`), 'previewImage',
            ],
        ],
    });
    return res.status(200).json({ Spots: spots });
});

//get detail of spot from :id
router.get('/:id', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id, {
        group: ['Spot.id', 'SpotImages.id', 'Owner.id'],
        attributes: {
            include: [
                [
                    sequelize.literal(`(SELECT COUNT(*)
                    FROM Reviews
                    WHERE Reviews.spotId = Spot.id
                    )`), 'numReviews'
                ],
                [
                    sequelize.literal(`(SELECT AVG(stars)
                    FROM Reviews
                    WHERE Reviews.spotId = Spot.id
                    )`), 'avgRating'
                ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                as: 'Owner',
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    if (!spot && spot === null) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" })
    }
    console.log(spot)

    return res.json({ spot })
})

//create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const createSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })

    return res.status(201).json(createSpot)
})

module.exports = router;
