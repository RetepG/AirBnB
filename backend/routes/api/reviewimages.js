const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();

//Delete review image spot
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findbyPk(req.params.imageId)
    const reviews = await Review.findbyPk(reviewImage.reviewId)

    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (!reviews) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }

    if (reviews.userId !== req.user.id) {
        const err = new Error("Forbidden request")
        err.status = 403
        return next(err)
    }

    await reviewImage.destroy();

    return res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router;
