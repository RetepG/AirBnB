const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Rate stars 1-5'),
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Enter in a review'),
    handleValidationErrors
]

//get curr review
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

//add image to review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const { reviewId } = req.params;
    const { url: imageUrl } = req.body;

    const review = await Review.findByPk(reviewId, {
        include: {
            model: ReviewImage,
            attributes: ['id']
        }
    });

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (review.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }

    // Count the number of review images for this review, using the related data that was loaded.
    const currReviewImg = review.ReviewImages;
    const numReviewImages = currReviewImg.length;

    if (numReviewImages >= 8) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 404;
        return next(err);
    }

    // Create a new review image for this review.
    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url: imageUrl
    });

    const { id, url } = newReviewImage.toJSON();

    return res.status(200).json({
        id,
        url
    });

});

//Edit Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const userReview = await Review.findByPk(req.params.reviewId)
    const { review, stars} = req.body

    if (!userReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (userReview.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }

    userReview.set({ review, stars})
    await userReview.save()
    res.status(200).json(userReview)
})


module.exports = router
