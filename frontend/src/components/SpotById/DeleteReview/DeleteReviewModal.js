import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../store/review";
import { useHistory } from 'react-router';
import "../DeleteReview/DeleteReview.css";

function DeleteReviewModal({ reviewId, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteReview = () => {
        dispatch(deleteReviewThunk(reviewId));
        history.push(`/spots/${spotId}`);
        closeModal();
    };

    const handleCancelDelete = () => {
        closeModal();
    };

    return (
        <div className="delete">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="confirmation">
                <button onClick={handleDeleteReview} className="delete-review-button">
                    Yes (Delete Review)
                </button>
                <button onClick={handleCancelDelete} className="no-delete-review-button">
                    No (Keep Review)
                </button>
            </div>
        </div>
    );
}

export default DeleteReviewModal;
