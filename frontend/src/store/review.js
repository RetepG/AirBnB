import { csrfFetch } from "./csrf";

const GET_REVIEW_SPOT_ID = 'review/get_review_spot_id'
const DELETE_REVIEW = 'review/delete_review'
const CREATE_REVIEW = 'review/create_review'

//Action Creator
const getReviewSpotId = (review) => ({
    type: GET_REVIEW_SPOT_ID,
    review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})
const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

//THUNKS
export const getReviewSpotIdThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        console.log('reviews for spot by id data', data)
        dispatch(getReviewSpotId(data));
        return data
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

export const createReviewThunk = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json();
        dispatch(createReview(review));
        return review;
    }
}

//Reducer
const initialState = { spot: {}, user: {} }

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW_SPOT_ID: { // Handle the action for getting review by spot ID
            const newState = { ...state, spot: {}, user: {} }; // Create a new state object
            const reviews = action.review.Reviews; // Get the reviews from the action payload
            reviews.forEach(review => {
                newState.spot[review.id] = review; // Update the state with the reviews
            });
            return newState;
        }
        case DELETE_REVIEW: { // Handle the action for deleting a review
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }; // Create a new state object
            delete newState.spot[action.reviewId]; // Delete the review from the state
            return newState;
        }
        case CREATE_REVIEW: { // Handle the action for creating a review
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }; // Create a new state object
            const review = action.review; // Get the new review from the action payload
            newState.spot[review.id] = review; // Add the new review to the state
            return newState;
        }
        default: {
            return state; // Return the current state for any other action type
        }
    }
}
