const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');

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

        if (spotImage !== null && spotImage.preview == true){
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

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }

    if (booking.userId !== req.user.id) {
        return res.status(404).json({ message: "Forbidden request" })
    }

    const startDate2 = new Date(req.body.startDate);
    const endDate2 = new Date(req.body.endDate);

    if (endDate2 <= startDate2) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    const { startDate, endDate } = req.body;

    // Create new Date objects from startDate and endDate
    const startNew = new Date(startDate);
    const endNew = new Date(endDate);

    // Find all bookings for the specified spot and convert them to an array of JSON objects
    const bookings = await Booking.findAll({
    });

    const bookingsArray = bookings.map((booking) => booking.toJSON());

    // Create an object to store the booking conflict error message and errors
    const bookingConflict = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
            // "startDate": "Start date conflicts with an existing booking",
            // "endDate": "End date conflicts with an existing booking"
        },
    };

    // Check if there is any booking that conflicts with the new booking
    const hasConflict = bookingsArray.some((booking) => { //checks array if one satisfies condition of true
        // return false
        // Create new Date objects from the current booking's start and end dates
        const currStart = new Date(booking.startDate);
        const currEnd = new Date(booking.endDate);

        //If the new boooking start and end date with the existing booking period
        if (
            ((startNew.getTime() >= currStart.getTime() &&
                startNew.getTime() <= currEnd.getTime()) &&
                (endNew.getTime() >= currStart.getTime() &&
                    endNew.getTime() <= currEnd.getTime()))
        ) {
            bookingConflict.errors.startDate =
                "Start date conflicts with an existing booking";
            bookingConflict.errors.endDate =
                "End date conflicts with an existing booking";
            return true;
        }

        // If the new booking start date falls within an existing booking period
        if (
            startNew.getTime() >= currStart.getTime() &&
            startNew.getTime() <= currEnd.getTime()
        ) {
            bookingConflict.errors.startDate =
                "Start date conflicts with an existing booking";
            return true;
        }

        // If the new booking end date falls within an existing booking period
        if (
            endNew.getTime() >= currStart.getTime() &&
            endNew.getTime() <= currEnd.getTime()
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
        return res.status(403).json(bookingConflict)
    }

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

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (booking.userId !== req.user.id) {
        const err = new Error("Current User is not authorized to delete.");
        err.status = 404;
        return next(err);
    }

    const bookingStart = new Date(booking.stateDate)
    if (bookingStart <= Date.now()) {
        const err = new Error('Cannot delete booking after stateDate')
        err.status = 403
        return next(err)
    }

    await booking.destroy()
    res.status(200).json({ message: "Successfully deleted" })

})

module.exports = router;
