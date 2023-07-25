import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, getSpotThunk } from '../../store/spots';
import { useHistory } from "react-router-dom";
import "./DeleteModal.css"

function DeleteModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpots = useSelector((state) => state.spot.allSpots);

    const handleDelete = async (shouldDelete) => {
        if (shouldDelete) {
            await dispatch(deleteSpotThunk(spotId));
            // Manually remove the spot from the currentSpots array
            const updatedSpots = { ...currentSpots };
            delete updatedSpots[spotId];
            dispatch({ type: 'SET_SPOTS', spots: updatedSpots });
            history.push('/spots/current');
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
