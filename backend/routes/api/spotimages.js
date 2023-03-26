const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();

//Delete review image spot
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const spot = await Spot.findByPk(spotImage.spotId); //moved down

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    if (spot.ownerId !== req.user.id) {
        const err = new Error("Forbidden request")
        err.status = 403
        return next(err)
    }

    await spotImage.destroy();

    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;
