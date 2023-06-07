import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewSpotIdThunk } from "../../../store/review";
import { useHistory } from 'react-router';
import { useState } from "react";
import { getSpotIdThunk } from "../../../store/spots";
import "../CreateReview/CreateReview.css"

function CreateReviewModal({ spotId }) {

  const [review, setReview] = useState("");
  const [stars, setStars] = useState();

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
    await dispatch(getSpotIdThunk(spotId));
    await dispatch(getReviewSpotIdThunk(spotId));
    history.push(`/spots/${spotId}`);
    closeModal();
  }

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
        <label className="rating">
          {stars > 0 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(1)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(1)}></i>
          }
          {stars > 1 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(2)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(2)}></i>
          }
          {stars > 2 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(3)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(3)}></i>
          }
          {stars > 3 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(4)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(4)}></i>
          }
          {stars > 4 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(5)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(5)}></i>
          }
          <span></span> Stars
        </label>
        <button className='create-review-button' type="submit" disabled={(review.length < 10) || !stars}>Submit Your Review</button>
      </form>
    </div>
  )
}

export default CreateReviewModal;
