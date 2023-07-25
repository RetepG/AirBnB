import { csrfFetch } from "./csrf";

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

        for (let i = 0; i < spotImages.length; i++) {
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
        dispatch(deleteSpot(spotId))
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

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: null }
            const spots = action.spots.Spots
            spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState
        }
        case GET_SPOT_ID: {
            const spot = action.spot
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.singleSpot = spot;
            return newState
        }
        case CREATE_SPOT: {
            const spot = action.spot
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.singleSpot = spot
            newState.allSpots[spot.id] = spot
            return newState
        }
        case DELETE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spotId]
            return newState
        }
        case UPDATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.allSpots[action.spot.id] = { ...newState.allSpots[action.spotId], ...action.spot }
            return newState
        }
        default: {
            return state;
        }
    }
}
