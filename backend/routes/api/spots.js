const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

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
                FROM reviews
                WHERE reviews.spotId = Spot.id
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
        return res.json({ message: "Spot couldn't be found!" })
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

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let error = { message: "Validation error", statusCode: 400, errors: [] }
    const { spotId } = req.params

    const checkSpot = await Spot.findByPk(spotId)

    // Check spot exist
    if (!checkSpot) {
        const err = new Error("Spot couldn't be found!");
        err.status = 404;
        return next(err);
    }
    if (checkSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden user");
        err.status = 404;
        return next(err);
    }

    // Check spot belong to user
    if (checkSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    // Check spot exist and belong to current user
    const spot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    });

    if (!spot) {
        res.json({
            message: "Spot couldn't be found!",
            statusCode: 404
        })
        return res.status(404)
    }
    //checking body for info
    const { url, preview } = req.body;
    if (!url || url === '') {
        error.errors.push("url is required");
    }

    if (!preview || preview === '') {
        error.errors.push("preview is required");
    }

    if (error.errors.length) {
        return res.status(400).json(error);
    }

    const newImage = await SpotImage.create({ url, preview, spotId });

    return res.status(200).json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
})

//edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const checkSpot = await Spot.findByPk(req.params.spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if (!checkSpot) {
        const err = new Error("Spot couldn't be found!");
        err.status = 404;
        return next(err);
    }
    if (checkSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden user");
        err.status = 404;
        return next(err);
    }

    checkSpot.set({ address, city, state, country, lat, lng, name, description, price });
    await checkSpot.save();
    return res.status(200).json(checkSpot);

})

//delete a spot
router.delete('/:id', requireAuth, async (req, res, next) => {
    const deleteSpot = await Spot.findByPk(req.params.id);

    if (!deleteSpot) {
        const err = new Error("Spot couldn't be found!")
        err.status = 404;
        return next(err);
    }

    if (deleteSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden user.");
        err.status = 404;
        return next(err);
    }

    await deleteSpot.destroy();
    res.status(200).json({ message: "Successfully deleted" })
})

// get review by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        }
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found!")
        err.status = 404;
        return next(err);
    }

    res.status(200).json({ Reviews: spot.Reviews })
})

//check for any input from user
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a review.'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a rating (stars) value.'),
    handleValidationErrors
]

//Create a review for a spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    //looking for if review exist
    if (!spot) {
        const err = new Error("Spot couldn't be found!")
        err.status = 404;
        return next(err);
    }

    const oldreview = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })

    if (oldreview.length) {
        const err = new Error('User already reviewed this spot.')
        err.status = 403;
        return next(err);
    }

    const createReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars,
    })

    await createReview.save()

    res.status(201).json(createReview)
})

// // Get booking by spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const attributes = ['spotId', 'startDate', 'endDate'] //always return these values regardless of if user or not
    let include = []

    if (!spot) {
        const err = new Error("Spot couldn't be found!")
        err.status = 404;
        return next(err);
    }

    if (req.user.id === spot.ownerId) { //if user add more attributes
        attributes.push('id', 'userId', 'createdAt', 'updatedAt')
        include.push({ model: User, attributes: ['id', 'firstName', 'lastName'] })
    }

    //empty unless its the actual user
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include, //empty if not user
        attributes //add more attributes if user
    })

    res.status(200).json({ Bookings: bookings })
})

const validBookTime = async (req, res, next) => {
    const err = new Error('Validation error');
    err.status = 400;
    err.errors = {};

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (endDate <= startDate) {
        err.errors.endDate = 'endDate cannot be on or before startDate'
        return next(err);
    }
    next();
}

const checkBooking = async (req, res, next) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;

    // Create new Date objects from startDate and endDate
    const newBookingStart = new Date(startDate);
    const newBookingEnd = new Date(endDate);

    // Find all bookings for the specified spot and convert them to an array of JSON objects
    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    });
    const bookingsArray = bookings.map((booking) => booking.toJSON());

    // Create an object to store the booking conflict error message and errors
    const bookingConflict = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {},
    };

    // Check if there is any booking that conflicts with the new booking
    const hasConflict = bookingsArray.some((booking) => { //checks array if one satisfies condition of true

        // Create new Date objects from the current booking's start and end dates
        const currBookingStart = new Date(booking.startDate);
        const currBookingEnd = new Date(booking.endDate);

        // If the new booking start date falls within an existing booking period, set the error message and return true
        if (
            newBookingStart.getTime() >= currBookingStart.getTime() &&
            newBookingStart.getTime() <= currBookingEnd.getTime()
        ) {
            bookingConflict.errors.startDate =
                "Start date conflicts with an existing booking";
            return true;
        }

        // If the new booking end date falls within an existing booking period, set the error message and return true
        if (
            newBookingEnd.getTime() >= currBookingStart.getTime() &&
            newBookingEnd.getTime() <= currBookingEnd.getTime()
        ) {
            bookingConflict.errors.endDate =
                "End date conflicts with an existing booking";
            return true;
        }

        // If there is no conflict, return false
        return false;
    });

    // If there is a conflict, send a 403 response with the booking conflict error message and errors
    if (hasConflict) {
        return res.status(403).json(bookingConflict);
    }
    next();
}


//create a booking from spot based on spot id
router.post('/:spotId/bookings', requireAuth, validBookTime, checkBooking, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { startDate, endDate } = req.body

    if (!spot) {
        const err = new Error("Spot couldn't be found!")
        err.status = 404;
        return next(err);
    }

    if (req.user.id === spot.ownerId) {
        const err = new Error("Forbidden")
        err.status = 404;
        return next(err);
    }

    const bookings = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate,
    })

    return res.status(200).json(bookings)
})

module.exports = router;
