import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getReviewSpotIdThunk } from '../../store/review';
import { getSpotIdThunk } from '../../store/spots';
import SpotReviews from './SpotReview/SpotReviews';
import "./SpotId.css"

const SpotById = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const reviewsObj = useSelector(state => state.review.spot)
    const spot = useSelector(state => state.spot.singleSpot);
    const reviews = Object.values(reviewsObj);

    useEffect(() => {
        dispatch(getReviewSpotIdThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getSpotIdThunk(id));
    }, [dispatch, id, reviews.length]);

    if (!spot || !spot.Owner || !reviews) return null;

    const numReviews = reviews.length;
    const defaultImage = 'https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg';
    const imagesArr = spot?.SpotImages || [];

    for (let i = imagesArr.length; i < 5; i++) {
        imagesArr.push({ url: defaultImage });
    }

    const handleReserve = () => {
        alert("Feature coming soon!");
    }

    return (
        <div className='spot-id'>
            <div className='spot-id-card'>
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                <div className='images-box'>
                    <div className='spot-images'>
                        {imagesArr && imagesArr.length > 0 ? (
                            <>
                                <img
                                    className='big-image'
                                    src={imagesArr[0]?.url}
                                    alt="spot's big preview"
                                />
                                <div className='small-images-box'>
                                    {imagesArr.length > 1 && (
                                        <img
                                            className='small-image'
                                            src={imagesArr[1]?.url}
                                            alt="spot image 1"
                                        />
                                    )}
                                    {imagesArr.length > 2 && (
                                        <img
                                            className='small-image'
                                            src={imagesArr[2]?.url}
                                            alt="spot image 2"
                                        />
                                    )}
                                    {imagesArr.length > 3 && (
                                        <img
                                            className='small-image'
                                            src={imagesArr[3]?.url}
                                            alt="spot image 3"
                                        />
                                    )}
                                    {imagesArr.length > 4 && (
                                        <img
                                            className='small-image'
                                            src={imagesArr[4]?.url}
                                            alt="spot image 4"
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <img
                                className='big-image'
                                src={defaultImage}
                                alt="default image"
                            />
                        )}
                    </div>
                </div>
                <div className='spot-id-details'>
                    <div className='spot-description'>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-info'>
                        <div className='price-rating-review'>
                            <p>${Number(spot.price).toFixed(2)} per night</p>
                            {numReviews
                                ? <h5><i className="fa-solid fa-star"></i>{Number(spot.avgStarRating).toFixed(1)} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</h5>
                                : <p><i className="fa-solid fa-star"></i> New</p>
                            }
                        </div>
                        <button onClick={handleReserve} className='reserve-button'>Reserve</button>
                    </div>
                </div>
                <div className='border'></div>
                <div className='spot-details-reviews'>
                    {numReviews
                        ? <div>
                            <h3><i className="fa-solid fa-star"></i> {Number(spot.avgStarRating).toFixed(1)} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</h3>
                            <SpotReviews reviews={reviews} spotId={id} />
                        </div>
                        : <div>
                            <h3><i className="fa-solid fa-star"></i> New</h3>
                            <SpotReviews reviews={reviews} first={true} spotId={id} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SpotById;
