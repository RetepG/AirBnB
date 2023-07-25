import React from 'react';
import { useHistory } from 'react-router';
import './SpotTile.css';

const SpotTile = ({ spot, myspots }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${spot.id}`);
    };

    let preview;
    if (spot.previewImage) {
        preview = spot.previewImage;
    } else {
        preview = `https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg`
    }

    let ratingElement;
    if (spot.avgRating && spot.avgRating !== 'NEW') {
        const avgRating = Number(spot.avgRating).toFixed(1);
        const numStars = Math.floor(avgRating);
        ratingElement = (
            <span className='star'>
                <i className="fa-sharp fa-solid fa-star"></i>
                {avgRating}
            </span>
        );
    } else {
        ratingElement = <span className='star'>NEW</span>;
    }

    return (
        <div className='all-spots'>
            <div className='tile' onClick={handleClick}>
                <div className='tooltip'>
                    <span className='tooltiptext'>{spot.name}</span>
                    <img src={preview} alt='noImage' className='img'></img>
                </div>
                <div className='spot-name'>
                    <span className='text'>{spot.name}</span>
                </div>
                <div>
                    <div className='rating'>
                        <div className='location'>
                            <span>{spot.city}</span>
                            <span>{spot.state}</span>
                        </div>
                        {ratingElement}
                    </div>
                </div>
                <div className='price'>
                    <span>${Number(spot.price).toFixed(2)}</span> night
                </div>
            </div>
        </div>
    );
};

export default SpotTile;
