import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/review";
import { useHistory } from "react-router-dom";

function DeleteModal({ reviewId, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (shouldDelete) => {
        if (shouldDelete) {
            await dispatch(deleteReviewThunk(reviewId));
            history.push(`/spots/${spotId}`);
        }
        closeModal();
    }

    return (
        <div className="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div className="delete-spot-buttons">
                <button onClick={() => handleDelete(true)} className="delete-spot-button">Yes (Delete Spot)</button>
                <button onClick={() => handleDelete(false)} className="no-delete-spot-button">No (Keep Spot)</button>
            </div>
        </div>
    );
}

export default DeleteModal;
