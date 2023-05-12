import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewsBySpotIdThunk } from "../../store/review";
import { useHistory } from 'react-router';
import { useState } from "react";
import { getSpotByIdThunk } from "../../store/spot";

function CreateReviewModal({ spotId }) {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars,
        }

        await dispatch(createReviewThunk(newReview, spotId))
        await Promise.all([
            dispatch(getSpotByIdThunk(spotId)),
            dispatch(getReviewsBySpotIdThunk(spotId))
        ]);

        history.push(`/spots/${spotId}`);
        closeModal();

    }

    const renderStarIcon = (index) => {
        if (stars >= index) {
            return <i className="fa-sharp fa-solid fa-star" onClick={() => setStars(index)}></i>;
        } else {
            return <i className="fa-sharp fa-regular fa-star" onClick={() => setStars(index)}></i>;
        }
    };

    return (
        <div className="create-review">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit} className="create-review-form">
                <label className="review">
                    <textarea
                        type="text"
                        rows={7}
                        cols={31}
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label className="stars">
                    {Array.from({ length: 5 }, (_, index) => (
                        <React.Fragment key={index}>
                            {renderStarIcon(index + 1)}
                        </React.Fragment>
                    ))}
                    <span></span> Stars
                </label>
                <button className='create-review-button' type="submit" disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReviewModal;
