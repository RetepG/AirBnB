import { csrfFetch } from "./csrf";

//Action Type
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SPOT_ID = 'spots/getSpotId'
const CREATE_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const UPDATE_SPOT = 'spots/updateSpot'

// Action Creator
export const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

export const getSpotById = (spot) => ({
    type: GET_SPOT_ID,
    spot
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const deleteSpot = (spot) => ({
    type: DELETE_SPOT,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})


// THUNKS
export const getSpotThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const spot = await res.json()
        dispatch(getAllSpots(spot))
        return spot
    }
}

export const getSpotIdThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`);

    if (res.ok) {
        const spot = await res.json();
        dispatch(getSpotById(spot));
        return spot;
    }
}

// export const createSpotThunk = (spot) => async (dispatch) => {
//     const res = await csrfFetch('/api/spots', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot)
//     })

//     if (res.ok) {
//         const spot = await res.json()
//         dispatch(createSpot(spot))
//         return spot
//     }
// }

export const createSpotThunk = (spot) => async (dispatch) => {
    const {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        spotImages
    } = spot;

    const spot2 = {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    };

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot2)
    });

    if (response.ok) {
        const spot = await response.json();

        for (let i = 0; i < spotImages.length; i++) { //looping through spotimage array to upload
            const image = spotImages[i];
            await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(image)
            });
        }

        dispatch(createSpot(spot));
        return spot;
    }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        // const spot = await res.json()
        dispatch(deleteSpot(spotId))
        // return spot
    }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(updateSpot(spot.id))
        return spot
    }
}

//Reducer
const initialState = { allSpots: null, singleSpot: null }

export default function spotsReducer(state = initialState, action) { // Spots reducer function.
    switch (action.type) {
        case GET_ALL_SPOTS: { // Case for getting all spots.
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: null }; // Creating a new state object with the updated allSpots and singleSpot properties.
            const spots = action.spots.Spots; // Extracting the spots array from the action payload.
            spots.forEach(spot => { // Iterating over the spots array to update the allSpots property.
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case GET_SPOT_ID: { // Case for getting a spot by ID.
            const spot = action.spot; // Extracting the spot object from the action payload.
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
            newState.singleSpot = spot; // Updating the singleSpot property with the received spot data.
            return newState;
        }
        case CREATE_SPOT: { // Case for creating a spot.
            const spot = action.spot; // Extracting the spot object from the action payload.
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
            newState.singleSpot = spot; // Updating the singleSpot property with the created spot data.
            newState.allSpots[spot.id] = spot; // Updating the allSpots property with the created spot data.
            return newState;
        }
        case DELETE_SPOT: { // Case for deleting a spot.
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
            delete newState.allSpots[action.spotId]; // Removing the deleted spot from the allSpots property.
            return newState;
        }
        case UPDATE_SPOT: { // Case for updating a spot.
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
            newState.allSpots[action.spot.id] = { ...newState.allSpots[action.spotId], ...action.spot }; // Updating the spot data in the allSpots property.
            return newState;
        }
        default: { // Default case.
            return state; // Returning the current state.
        }
    }
}
