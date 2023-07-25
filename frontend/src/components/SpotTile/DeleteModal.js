// import { useModal } from "../../context/Modal";
// import { useDispatch } from "react-redux";
// import { deleteSpotThunk } from '../../store/spots';
// import { useHistory } from "react-router-dom";
// import "./DeleteModal.css"

// function DeleteModal({ spotId }) {
//     const { closeModal } = useModal();
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const handleDelete = async (shouldDelete) => {
//         if (shouldDelete) {
//             await dispatch(deleteSpotThunk(spotId));
//             history.push('/spots/current');
//         }
//         closeModal();
//     }

//     return (
//         <div className="delete-spot-modal">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to remove this spot?</p>
//             <div className="delete-spot-buttons">
//                 <button onClick={() => handleDelete(true)} className="delete-spot-button">Yes (Delete Spot)</button>
//                 <button onClick={() => handleDelete(false)} className="no-delete-spot-button">No (Keep Spot)</button>
//             </div>
//         </div>
//     );
// }

// export default DeleteModal;

import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, getSpotThunk } from '../../store/spots';
import { useHistory } from "react-router-dom";
import "./DeleteModal.css"

function DeleteModal({ spotId }) {
    const { closeModal } = useModal(); // Get the closeModal function from the useModal hook
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpots = useSelector((state) => state.spot.allSpots); // Get the currentSpots from the spot state in the Redux store

    const handleDelete = async (shouldDelete) => {
        if (shouldDelete) {
            await dispatch(deleteSpotThunk(spotId));
            // Manually remove the spot from the currentSpots array
            const updatedSpots = { ...currentSpots }; // Create a copy of the currentSpots object
            delete updatedSpots[spotId]; // Remove the spot with the given spotId from the updatedSpots object
            dispatch({ type: 'SET_SPOTS', spots: updatedSpots }); // Dispatch an action to update the spots state with the updatedSpots object
            history.push('/spots/current'); // Navigate to the '/spots/current' route
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
