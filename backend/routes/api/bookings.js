const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');
const spot = require('../../db/models/spot');

const router = express.Router();

// get all current user booking
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    // store booking objects
    const bookingsArr = []

    for (let booking of bookings) {
        const bookingObj = await booking.toJSON()

        // exclude createdAt and updatedAt
        const spot = await Spot.findByPk(bookingObj.spotId, {
            attributes: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'price'
            ]
        })

        const spotObj = await spot.toJSON()

        // Find the spot image as the preview image
        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spotObj.id
            }
        })

        // If preview image add it to the spot obj
        if (spotImage.preview === true) {
            spotObj.previewImage = spotImage.url
        } else {
            spotObj.previewImage = null
        }

        // Add the spot object to the booking object
        bookingObj.Spot = spotObj
        bookingsArr.push(bookingObj)
    }
    return res.status(200).json({ Bookings: bookingsArr })
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
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;

    // Create new Date objects from startDate and endDate
    const startNew = new Date(startDate);
    const endNew = new Date(endDate);

    // Find all bookings for the specified spot and convert them to an array of JSON objects
    const bookings = await Booking.findAll({
        // where: {
        //     bookingId
        // },
        // attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    });

    const bookingsArray = bookings.map((booking) => booking.toJSON());

    // Create an object to store the booking conflict error message and errors
    const bookingConflict = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
        },
    };

    // Check if there is any booking that conflicts with the new booking
    const hasConflict = bookingsArray.some((booking) => { //checks array if one satisfies condition of true
        // return false
        // Create new Date objects from the current booking's start and end dates
        const currStart = new Date(booking.startDate);
        const currEnd = new Date(booking.end);

        // If the new booking start date falls within an existing booking period, set the error message and return true
        if (
            startNew.getTime() >= currStart.getTime()  &&
            startNew.getTime()  <= currEnd.getTime()
        ) {
            bookingConflict.errors.startDate =
                "Start date conflicts with an existing booking";
            return true;
        }

        // If the new booking end date falls within an existing booking period, set the error message and return true
        if (
            endNew.getTime()  >= currStart.getTime()  &&
            endNew.getTime()  <= currEnd.getTime()
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

//edit a booking based on booking id
router.put('/:bookingId', requireAuth, validBookTime, checkBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    if (booking.userId !== req.user.id) {
        const err = new Error('Forbidden request')
        err.status = 404
        return next(err)
    }

    const { startDate, endDate } = req.body

    let end = new Date(endDate)
    let start = new Date()

    if (start > end) {
        const err = new Error("Past bookings can't be modified")
        err.status = 400
        return next(err)
    }

    booking.set({ startDate, endDate })
    await booking.save()

    res.status(200).json(booking)
})

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

module.exports = router;
