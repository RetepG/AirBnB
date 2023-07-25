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
        case GET_REVIEW_SPOT_ID: {
            const newState = { ...state, spot: {}, user: {} }
            const reviews = action.review.Reviews
            reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            delete newState.spot[action.reviewId]
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            const review = action.review;
            newState.spot[review.id] = review;
            return newState
        }
        default: {
            return state;
        }
    }
}
