import { useHistory } from 'react-router'
import DeleteModal from './DeleteModal'
import OpenModalButton from '../OpenModalButton'
import './SpotTile.css'

const SpotTile = ({ spot, myspots }) => {
    const history = useHistory()

    const handleClick = () => {
        history.push(`/spots${spot.id}`)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}/edit`)
    }

        let preview;
        if (spot.previewImage) {
            preview = spot.previewImage;
        } else {
            preview = `https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg`
        }

        const formattedPrice = `$${Number(spot.price).toFixed(2)} night`;

        let updateDeleteButtons = null;
        if (myspots) {
            updateDeleteButtons = (
                <div className='update-delete-buttons'>
                    <button onClick={handleUpdate} className='update-button'>Update</button>
                    <OpenModalButton
                        buttonText='Delete Spot'
                        modalComponent={<DeleteModal spotId={spot.id} />}
                    />
                </div>
            );
        }

        return (
            <div className='all-spots'>
                <div className='box' onClick={handleClick}>
                    <div className='tooltip'>
                        <span className='text'>{spot.name}</span>
                        <img src={preview} alt='noImage' className='img'></img>
                    </div>

                    <div>
                        <div className='rating'>
                            <div className='location'>
                                <span>{spot.city}</span>
                                <span>{spot.state}</span>
                            </div>
                            <span className='star'>
                                <i className="fa-soli fa-star"></i>
                                {+spot.avgRating < 5 ? spot.avgRating : 'NEW'}
                            </span>
                        </div>
                    </div>

                    <div className='price'>
                        <span>{formattedPrice}</span>
                    </div>
                </div>
                <div>{updateDeleteButtons}</div>
            </div>
        )
    }

export default SpotTile
