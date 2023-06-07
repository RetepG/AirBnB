import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OpenModalButton from '../../OpenModalButton';
import DeleteReviewModal from '../DeleteReview/DeleteReviewModal';
import CreateReviewModal from '../CreateReview/CreateReviewModal';
import { getReviewSpotIdThunk } from '../../../store/review';
import { getSpotIdThunk } from '../../../store/spots';
import "../SpotReview/Review.css"

function SpotReviews({ reviews, spotId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spot.singleSpot);

    useEffect(() => {
        dispatch(getReviewSpotIdThunk(spotId));
        dispatch(getSpotIdThunk(spotId));
    }, [dispatch, spotId]);

    if (!spot || !spotId) return null;

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    };

    const renderReview = (reviews) => {
        return reviews.map((r) => {
            if (!r.User) return null;

            return (
                <div key={r.id} className="review-block">
                    <h3>{r.User.firstName} {r.User.lastName}</h3>
                    <div className="created-at">
                        {getMonthName(Number(r.createdAt.slice(5, 7)))} {r.createdAt.slice(0, 4)}
                    </div>
                    <p>{r.review}</p>
                    {r.userId === sessionUser?.id && (
                        <div>
                            <OpenModalButton
                                buttonText="Delete Review"
                                modalComponent={<DeleteReviewModal reviewId={r.id} spotId={spotId} />}
                            />
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div>
            {sessionUser && sessionUser.id !== spot.ownerId && !reviews.find((r) => r.userId === sessionUser.id) && (
                <div>
                    <OpenModalButton buttonText="Create Review" modalComponent={<CreateReviewModal spotId={spotId} />} />
                </div>
            )}
            {sessionUser && !reviews.length && sessionUser.id !== spot.ownerId ? (
                <div>
                    <p>Be the first to post a review!</p>
                </div>
            ) : (
                <div>
                    {renderReview(reviews.slice().reverse())}
                </div>
            )}
        </div>
    );
}

export default SpotReviews;
