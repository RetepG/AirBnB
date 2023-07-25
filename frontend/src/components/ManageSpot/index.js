// import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getSpotThunk, deleteSpot } from '../../store/spots';
// import DeleteModal from '../SpotTile/DeleteModal';
// import OpenModalButton from '../OpenModalButton';
// import "./ManageSpot.css";

// const MySpots = () => {
//     const dispatch = useDispatch();
//     const currentSpots = useSelector((state) => state.spot.allSpots);
//     const sessionUser = useSelector((state) => state.session.user);

//     useEffect(() => {
//         dispatch(getSpotThunk());
//     }, [dispatch]);

//     if (!currentSpots) return <h3>Loading Beep Boop..</h3>;

//     const userSpots = Object.values(currentSpots).filter((spot) => spot.ownerId === sessionUser.id);

//     if (userSpots.length === 0) {
//         return (
//             <>
//                 <h1>No spots yet!</h1>
//                 <NavLink to="/spots/new">
//                     <button className="Create-Button">Create New Spot</button>
//                 </NavLink>
//             </>
//         );
//     }

//     const handleDelete = (spotId) => {
//         dispatch(deleteSpot(spotId));
//     };

//     let preview =
//         'https://a0.muscache.com/im/pictures/miso/Hosting-29417765/original/ba764a9c-03b5-43d1-ac74-88d77ead7691.jpeg?im_w=1440';

//     return (
//         <div className="Whole-Page">
//             <div className="Header">
//                 <h1 className="Title">Manage Spots</h1>
//                 <button className="create-spot-button">
//                     <NavLink
//                         to="/spots/new"
//                         style={() => {
//                             return {
//                                 color: "black",
//                                 textDecoration: "none"
//                             }
//                         }}
//                     >
//                         Create a New Spot
//                     </NavLink>
//                 </button>
//             </div>
//             <div id="SpotsContainer">
//                 {userSpots.map((spot) => (
//                     <div className="My-Spots" key={spot.id}>
//                         <NavLink to={`/spots/${spot.id}`}>
//                             <div>
//                                 <img
//                                     src={spot.previewImage}
//                                     className="Image"
//                                     alt={spot.name}
//                                 />
//                                 <div className="My-Spots-Info">
//                                     <div className="Loc-Rating">
//                                         <p className="Spot-Loc">
//                                             {spot.city}, {spot.state}
//                                         </p>
//                                         <p className="Spot-Rating">
//                                             {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'NEW'} <i className="fa-sharp fa-solid fa-star"></i>
//                                         </p>
//                                     </div>
//                                     <p className="Spot-Info" id="Spot-Price">
//                                         ${spot.price} per visit
//                                     </p>
//                                     <div className="Update-Delete">
//                                         <NavLink exact to={`/spots/${spot.id}/edit`}>
//                                             <button className="Update-Button">Update</button>
//                                         </NavLink>
//                                         <OpenModalButton
//                                             buttonText="Delete"
//                                             modalComponent={
//                                                 <DeleteModal
//                                                     spotId={spot.id}
//                                                     handleDelete={handleDelete}
//                                                 />
//                                             }
//                                             className="Delete-Button"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </NavLink>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MySpots;



import DeleteModal from '../SpotTile/DeleteModal';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotThunk, deleteSpotThunk } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import "./ManageSpot.css";

const MySpots = () => {
    const dispatch = useDispatch(); 
    const currentSpots = useSelector((state) => state.spot.allSpots); // Accessing the 'allSpots' state from the redux store using useSelector().
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getSpotThunk()); // Dispatching the getSpotThunk action to fetch spots data when the component mounts.
    }, [dispatch]);

    if (!currentSpots) return <h3>Loading..</h3>;

    const userSpots = Object.values(currentSpots).filter((spot) => spot.ownerId === sessionUser.id); // Filter the spots based on the current user's ID.

    if (userSpots.length === 0) {
        return (
            <>
                <h1>No spots yet!</h1> // Display a message if the user has no spots.
                <NavLink to="/spots/new"> // Link to create a new spot.
                    <button className="Create-Button">Create New Spot</button> // Button to create a new spot.
                </NavLink>
            </>
        );
    }

    const handleDelete = async (spotId) => {
        await dispatch(deleteSpotThunk(spotId)); // Dispatching the deleteSpotThunk action to delete a spot.
    };

    const removeSpotFromState = (spotId) => {
        const updatedSpots = userSpots.filter((spot) => spot.id !== spotId); // Filtering out the deleted spot from the state.
        dispatch({ type: 'SET_SPOTS', spots: updatedSpots }); // Dispatching an action to update the spots state.
    };

    return (
        <div className="Whole-Page">
            <div className="Header">
                <h1 className="Title">Manage Spots</h1>
                <button className="create-spot-button">
                    <NavLink
                        to="/spots/new"
                        style={() => {
                            return {
                                color: "black",
                                textDecoration: "none"
                            }
                        }}
                    >
                        Create a New Spot
                    </NavLink>
                </button>
            </div>
            <div id="SpotsContainer">
                {userSpots.map((spot) => (
                    <div className="My-Spots" key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <div>
                                <img
                                    src={spot.previewImage}
                                    className="Image"
                                    alt={spot.name}
                                />
                                <div className="My-Spots-Info">
                                    <div className="Loc-Rating">
                                        <p className="Spot-Loc">
                                            {spot.city}, {spot.state}
                                        </p>
                                        <p className="Spot-Rating">
                                            {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'NEW'} <i className="fa-sharp fa-solid fa-star"></i>
                                        </p>
                                    </div>
                                    <p className="Spot-Info" id="Spot-Price">
                                        ${spot.price} per visit
                                    </p>
                                    <div className="Update-Delete">
                                        <NavLink exact to={`/spots/${spot.id}/edit`}>
                                            <button className="Update-Button">Update</button>
                                        </NavLink>
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={() => (
                                                <DeleteModal
                                                    spotId={spot.id}
                                                    handleDelete={() => {
                                                        handleDelete(spot.id);
                                                        removeSpotFromState(spot.id);
                                                    }}
                                                />
                                            )}
                                            className="Delete-Button"
                                        />
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MySpots;
