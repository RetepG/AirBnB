// import { useHistory } from 'react-router'
// import DeleteModal from './DeleteModal'
// import OpenModalButton from '../OpenModalButton'
// import './SpotTile.css'

// const SpotTile = ({ spot, myspots }) => {
//     const history = useHistory()

//     const handleClick = () => {
//         history.push(`/spots/${spot.id}`)
//     }

//     const handleUpdate = (e) => {
//         e.preventDefault()
//         history.push(`/spots/${spot.id}/edit`)
//     }

//     // let preview;
//     // if (spot.previewImage) {
//     //     preview = spot.previewImage;
//     // } else {
//     //     preview = `https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg`
//     // }

//     let preview = 'https://a0.muscache.com/im/pictures/miso/Hosting-29417765/original/ba764a9c-03b5-43d1-ac74-88d77ead7691.jpeg?im_w=1440'

//     const formattedPrice = `$${Number(spot.price).toFixed(2)} night`;

//     let updateDeleteButtons = null;
//     if (myspots) {
//         updateDeleteButtons = (
//             <div className='update-delete-buttons'>
//                 <button onClick={handleUpdate} className='update-button'>Update</button>
//                 <OpenModalButton
//                     buttonText='Delete Spot'
//                     modalComponent={<DeleteModal spotId={spot.id} />}
//                 />
//             </div>
//         );
//     }

//     return (
//         <div className='all-spots'>
//             <div className='tile' onClick={handleClick}>
//                 <div className='tooltip'>
//                     <img src={preview} alt='noImage' className='img'></img>
//                     {/* <span className='text'>{spot.name}</span> */}
//                 </div>
//                 <div className="spot-name">
//                     <span className='text'>{spot.name}</span>
//                 </div>
//                 <div>
//                     <div className='rating'>
//                         <div className='location'>
//                             <span>{spot.city}</span>
//                             <span>{spot.state}</span>
//                         </div>
//                         <span className='star'>
//                             <i class="fa-sharp fa-solid fa-star"></i>
//                             {+spot.avgRating < 5 ? spot.avgRating : 'NEW'}
//                         </span>
//                     </div>
//                 </div>

//                 {/* <div className='price'>
//                         <span>{formattedPrice}</span>
//                     </div> */}
//                 <div className='price'><span>${Number(spot.price).toFixed(2)}</span> night</div>
//             </div>
//             <div>{updateDeleteButtons}</div>
//         </div>
//     )
// }

// export default SpotTile

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
