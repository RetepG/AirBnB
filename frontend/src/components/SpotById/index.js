import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spot';
import { getReviewSpotIdThunk } from '../../store/review';
import { useParams } from 'react-router';
import SpotReviews from './SpotReviews';
import './SpotById.css';

const SpotById = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const reviewsObj = useSelector(state => state.review.spot);
    const spot = useSelector(state => state.spot.singleSpot);
    const reviews = Object.values(reviewsObj);

    useEffect(() => {
        dispatch(getReviewSpotIdThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getSpotByIdThunk(id));
    }, [dispatch, id, reviews.length]);

    if (!spot || !spot.Owner || !reviews) return null;

    const spotImages = spot.Spotimages || [];
    const preview = spotImages.find(i => i.preview === true);
    const nonpreview = spotImages.filter(i => i.preview === false);

    const numReviews = reviews.length;

    const handleReserve = () => {
        alert("Feature coming soon!");
    };

    return (
        <div className='spot'>
            <div className='spot_card'>
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                <div className='images'>
                    <div className='big_image'>
                        <img src={preview ? preview.url : 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=626&ext=jpg'} className='big-image' alt='Spot' />
                    </div>
                    <div className='small_image'>
                        {nonpreview.map(image => (
                            <img key={image.id} src={image.url} className='small-image' alt='Spot' />
                        ))}
                    </div>
                </div>
                <div className='details'>
                    <div className='spot-description'>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-info'>
                        <div className='price_rating'>
                            <p>${Number(spot.price).toFixed(2)} per night</p>
                            {numReviews ? (
                                <h5>
                                    <i className="fa-solid fa-star"></i> {spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}
                                </h5>
                            ) : (
                                <p>
                                    <i className="fa-solid fa-star"></i> New
                                </p>
                            )}
                        </div>
                        <button onClick={handleReserve} className='reserve'>Reserve</button>
                    </div>
                </div>
                <div className='border'></div>
                <div className='spot_details_reviews'>
                    {numReviews ? (
                        <div>
                            <h3><i className="fa-solid fa-star"></i> {spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</h3>
                            <SpotReviews reviews={reviews} spotId={id} />
                        </div>
                    )
                        : (
                            <div>
                                <h3><i className="fa-solid fa-star"></i> New</h3>
                                <SpotReviews reviews={reviews} first={true} spotId={id} />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SpotById;
