const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage } = require('../../db/models');

const router = express.Router()

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



// const validateSpot = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .withMessage('Street address is required'),
//     check('city')
//         .exists({ checkFalsy: true })
//         .withMessage('City is required'),
//     check('state')
//         .exists({ checkFalsy: true })
//         .withMessage('State is required'),
//     check('country')
//         .exists({ checkFalsy: true })
//         .withMessage('Country is required'),
//     check('lat')
//         .exists({ checkFalsy: true })
//         .withMessage('Latitude is not valid'),
//     check('lng')
//         .exists({ checkFalsy: true })
//         .withMessage('Longitude is not valid'),
//     check('name')
//         .exists({ checkFalsy: true })
//         .withMessage('Name must be less than 50 characters'),
//     check('description')
//         .exists({ checkFalsy: true })
//         .withMessage('Description is required'),
//     check('price')
//         .exists({ checkFalsy: true })
//         .withMessage('Price per day is required'),
//     handleValidationErrorsSpots
// ];

// //create a spot
// router.post('/', requireAuth, validateSpot, async (req, res) => {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body

//     const createSpot = await Spot.create({
//         ownerId: req.user.id,
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price,
//     })

//     return res.status(201).json(createSpot)
// })

module.exports = router;
