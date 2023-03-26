const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();

//Delete review image spot
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const reviewImage = await ReviewImage.findByPk(imageId);

    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const review = await Review.findByPk(reviewImage.reviewId);

    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }

    if (review.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }


    await reviewImage.destroy();

    return res.status(200).json({ "message": "Successfully deleted" });
})

module.exports = router;
