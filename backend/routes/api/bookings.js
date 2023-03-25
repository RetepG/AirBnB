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

module.exports = router;
