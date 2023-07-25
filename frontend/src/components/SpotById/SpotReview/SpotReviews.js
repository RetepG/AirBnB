import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OpenModalButton from '../../OpenModalButton';
import DeleteReviewModal from '../DeleteReview/DeleteReviewModal';
import CreateReviewModal from '../CreateReview/CreateReviewModal';
import { getReviewSpotIdThunk } from '../../../store/review';
import { getSpotIdThunk } from '../../../store/spots';
import "../SpotReview/Review.css"

function SpotReviews({ reviews, spotId }) { //component with reviews and spotId as props.
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user); // Extracting the session user from the Redux store state.
    const spot = useSelector((state) => state.spot.singleSpot);

    useEffect(() => {
        dispatch(getReviewSpotIdThunk(spotId)); //get review data based on spotId.
        dispatch(getSpotIdThunk(spotId)); //get spot data based on spotId.
    }, [dispatch, spotId]); // Running the side effect whenever dispatch or spotId changes.

    if (!spot || !spotId) return null;

    const getMonthName = (monthNumber) => { // Defining a helper function that returns the name of a month based on a month number.
        const date = new Date(); // Creating a new Date object.
        date.setMonth(monthNumber - 1); // Setting the month of the date object based on the month number.
        return date.toLocaleString('en-US', { month: 'long' }); // Returning the long name of the month in English.
    };

    const renderReview = (reviews) => { // Defining a helper function that renders individual reviews.
        return reviews.map((r) => {
            if (!r.User) return null; // If the review does not have a User object associated, return null.

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
