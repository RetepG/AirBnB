import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { updateSpotThunk } from "../../store/spots";
import { getSpotIdThunk } from '../../store/spots';
import "./UpdateSpot.css"

function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const mySpots = useSelector(state => state.spot.singleSpot);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSpotIdThunk(id))
    }, [dispatch, id]);

    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCountry(mySpots?.country);
        setAddress(mySpots?.address);
        setCity(mySpots?.city);
        setState(mySpots?.state);
        setDescription(mySpots?.description);
        setTitle(mySpots?.name);
        setPrice(mySpots?.price);
    }, [mySpots])

    if (!mySpots) {
        return null
    }

    if (!sessionUser) {
        history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!country) errors.country = 'country is required';
        if (!title) errors.title = 'Name is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!(+price)) errors.price = 'Price must be valid integer'
        if (!price) errors.price = 'Price is required';


        if (!Object.values(errors).length) { // If there are no validation errors:
            await dispatch(updateSpotThunk({ // Dispatching a Redux thunk action to update the spot.
                id,
                address,
                city,
                state,
                country,
                lat: 1,
                lng: 1,
                name: title,
                description,
                price
            }));
            history.push(`/spots/${id}`); // Redirecting to the spot page.
        }
        setErrors(errors); // Setting the errors state variable.
    };

    return (
        <div className="form">
            <div className="create-spot-form-page">
                <h1 className="title">Update Spot</h1>
                <form onSubmit={handleSubmit} className="create-spot-form">
                    <div className="address">
                        <label className="labels">Country</label>
                        <input
                            type="text"
                            value={country}
                            className="inputs"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                        {errors.country && <p className="error-text">{errors.country}</p>}

                        <label className="labels">Street Address:</label>
                        <input
                            type="text"
                            value={address}
                            className="inputs"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                        <div className="city-state-form">
                            <div className="city-box">
                                <label className="labels">City: </label>
                                <input
                                    type="text"
                                    value={city}
                                    className="inputs"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                />
                            </div>
                            {errors.city && <p className="error-text">{errors.city}</p>}
                            <div className="state-box">
                                <label className="labels">State: </label>
                                <input
                                    type="text"
                                    value={state}
                                    className="inputs"
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="State"
                                />
                                {errors.state && <p className="error-text">{errors.state}</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="lead-header">Describe your place to guests</div>
                        <div>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</div>
                        <textarea
                            type="text"
                            value={description}
                            className="textarea"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="PLease wrtite at least 30 characters"
                            rows='5'
                            cols='42'
                        >
                        </textarea>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>
                    <div className="spot-title">
                        <div className="lead-header">Create a title for your spot</div>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                        <input
                            type="text"
                            className="inputs"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name of your spot"
                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>
                    <div>
                        <div className="lead-header">Set a base price for your spot</div>
                        <div className="info">Competitive pricing can help your listing stand out and rank higher in search results.</div>
                        <div className="input-group">
                            <span className="space-dollarsign">$</span>
                            <input
                                type="text"
                                value={price}
                                className="inputs"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price per night (USD)"
                            />
                        </div>
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>
                    <button type="submit" className="submit-button">
                        Update Spot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSpot
