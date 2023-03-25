const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {

    const options = {
        where: { userId: req.user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    };

    const reviews = await Review.findAll(options);

    // Create an array to hold the modified reviews.
    const reviewArr = [];

    for (let i = 0; i < reviews.length; i++) {
        // Convert the review to a JSON object.
        let review = reviews[i].toJSON();

        const spot = await Spot.findOne({
            where: { id: review.spotId },
            include: {
                model: SpotImage,
                attributes: ['preview', 'url']
            }
        });

        // If the spot data was successfully fetched, find the preview image and modify the review.
        if (spot) {
            const previewImage = spot.SpotImages.find(spotImage => spotImage.preview === true);

            if (previewImage) {
                review.Spot.previewImage = previewImage.url;
            } else {
                review.Spot.previewImage = 'Preview Unavailable';
            }
        }

        reviewArr.push(review);
    }

    res.json({ Reviews: reviewArr });
})


module.exports = router
