
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from './DeleteReviewModal';
import CreateReviewModal from './CreateReviewModal.js';
import { getReviewsBySpotIdThunk } from '../../store/review';
import { getSpotByIdThunk } from '../../store/spot';
import './SpotReview.css';

function SpotReviews({ spotId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviewsState = useSelector(state => Object.values(state.review));
    const spot = useSelector(state => state.spot.singleSpot);

    useEffect(() => {
        dispatch(getReviewsBySpotIdThunk(spotId));
        dispatch(getSpotByIdThunk(spotId));
    }, [dispatch, spotId]);

    if (!spot || !spotId) return null;

    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };

    const renderCreateReviewButton = () => {
        if (sessionUser && sessionUser.id !== spot.ownerId && !reviewsState.find(r => r.userId === sessionUser.id)) {
            return (
                <OpenModalButton
                    buttonText='Create Review'
                    modalComponent={<CreateReviewModal spotId={spotId} />}
                />
            );
        }
        return null;
    };

    const renderReviewList = () => {
        if (sessionUser && !reviewsState.length && sessionUser.id !== spot.ownerId) {
            return (
                <div>
                    <p>Be the first to post a review!</p>
                </div>
            );
        } else {
            return (
                <div>
                    {reviewsState.reverse().map(r => {
                        if (!r.User) return null;
                        return (
                            <div key={r.id}>
                                <div className='review-info'>
                                    <h3>{r.User.firstName} {r.User.lastName}</h3>
                                    <div className='review-date-created'>{months[r.createdAt.slice(5, 7)]} {r.createdAt.slice(0, 4)}</div>
                                    <p>{r.review}</p>
                                    {(r.userId === sessionUser?.id) &&
                                        <div>
                                            <OpenModalButton
                                                buttonText='Delete Review'
                                                modalComponent={<DeleteReviewModal reviewId={r.id} spotId={spotId} />}
                                            />
                                        </div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <div>
            {renderCreateReviewButton()}
            {renderReviewList()}
        </div>
    );
}

export default SpotReviews;
