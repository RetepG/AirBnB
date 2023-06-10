import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateSpot.css';
import { useHistory } from "react-router";
import { createSpotThunk, getSpotThunk } from "../../store/spots";

function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formValues, setFormValues] = useState({
        country: "",
        address: "",
        city: "",
        state: "",
        description: "",
        title: "",
        price: "",
        previewImage: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
    });
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getSpotThunk());
    }, [dispatch]);

    useEffect(() => {
        setErrors({});
    }, [dispatch]);

    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        }
    }, [sessionUser, history]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const spotImages = [];

        if (!formValues.address) newErrors.address = 'Address is required';
        if (!formValues.city) newErrors.city = 'City is required';
        if (!formValues.state) newErrors.state = 'State is required';
        if (!formValues.country) newErrors.country = 'Country is required';
        if (!formValues.title) newErrors.title = 'Name is required';
        if (formValues.description.length < 30) newErrors.description = 'Description needs a minimum of 30 characters';
        if (!Number(formValues.price)) newErrors.price = 'Price must be a valid integer';
        if (!formValues.price) newErrors.price = 'Price is required';

        if (!formValues.previewImage) newErrors.previewImage = 'A preview image is required!';
        else if (
            !(formValues.previewImage.endsWith(".png")) &&
            !(formValues.previewImage.endsWith(".jpg")) &&
            !(formValues.previewImage.endsWith(".jpeg"))
        ) {
            newErrors.previewImageEnding = "Please make sure your preview image URL ends with .png, .jpg, or .jpeg";
        }
        // else {
        //     spotImages.push(formValues.previewImage)
        // }
        const imageUrls = ["img1", "img2", "img3", "img4"];
        for (const imageUrl of imageUrls) {
            if (formValues[imageUrl]) {
                if (
                    !(formValues[imageUrl].endsWith(".png")) &&
                    !(formValues[imageUrl].endsWith(".jpg")) &&
                    !(formValues[imageUrl].endsWith(".jpeg"))
                ) {
                    newErrors[`${imageUrl}Ending`] = `Please make sure your ${imageUrl} URL ends with .png, .jpg, or .jpeg`;
                } else {
                    spotImages.push({ url: formValues[imageUrl], preview: false });
                }
            }
        }

        // if (Object.keys(newErrors).length === 0) {
        //     const { id } = await dispatch(createSpotThunk({
        //         address: formValues.address,
        //         city: formValues.city,
        //         state: formValues.state,
        //         country: formValues.country,
        //         lat: 1,
        //         lng: 1,
        //         name: formValues.title,
        //         description: formValues.description,
        //         price: formValues.price,
        //         previewImage: { url: formValues.previewImage, preview: true }, // Include the previewImage in the dispatched action
        //         spotImages: spotImages,
        //     }));

        //     history.push(`/spots/${id}`);
        // }

        const previewImg = { url: formValues.previewImage, preview: true }
        spotImages.push(previewImg)

        // const smallImg1 = { url: formValues.img1, preview: false }
        // const smallImg2 = { url: formValues.img2, preview: false }
        // const smallImg3 = { url: formValues.img3, preview: false }
        // const smallImg4 = { url: formValues.img4, preview: false }

        // if (!formValues.img1) {
        //     spotImages.push(smallImg1)
        // }
        // if (!formValues.img2) {
        //     spotImages.push(smallImg2)
        // }
        // if (!formValues.img3) {
        //     spotImages.push(smallImg3)
        // }
        // if (!formValues.img4) {
        //     spotImages.push(smallImg4)
        // }

        console.log(spotImages)

        const object = {
            id: null,
            address: formValues.address,
            city: formValues.city,
            state: formValues.state,
            country: formValues.country,
            lat: 1,
            lng: 1,
            name: formValues.title,
            description: formValues.description,
            price: formValues.price,
            // previewImage: { url: formValues.previewImage, preview: true }, // Include the previewImage in the dispatched action
            spotImages: spotImages,
        }
        console.log(object)

        if (Object.keys(newErrors).length === 0) {
            const { id } = await dispatch(createSpotThunk(object))
            history.push(`/spots/${id}`)
        }

        console.log(object)

        setErrors(newErrors);
    };
    return (
        <div className="form">
            <div className="create-spot-form-page">
                <h1 className="title">Create a Spot</h1>
                <form onSubmit={handleSubmit} className="sumbits">
                    <div className="address">
                        <div className="header">
                            <div className="lead-header">Where's your place located?</div>
                            <div>Guests will only get your exact address once they booked a reservation.</div>
                        </div>

                        <label>
                            <div className="labels">Country</div>
                            {errors.country && <span className="error-text">{errors.country}</span>}
                        </label>
                        <input
                            type="text"
                            name="country"
                            className="inputs"
                            value={formValues.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                        />
                        <label>
                            <div className="labels">Street Address</div>
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="inputs"
                            value={formValues.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                        />

                        <div className="city-state-form">
                            <div className="city-box">
                                <label>
                                    <div className="labels">City</div>
                                    {errors.city && <span className="error-text">{errors.city}</span>}
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    className="inputs"
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                />
                            </div>
                            <div className="state-box">
                                <label>
                                    <div className="labels">State</div>
                                    {errors.state && <span className="error-text">{errors.state}</span>}
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    className="inputs"
                                    value={formValues.state}
                                    onChange={handleInputChange}
                                    placeholder="State"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="lead-header">Describe your place to guests</div>
                        <div>Mention the best features of your space, any special amenities like fast Wi-Fi or parking, and what you love about the neighborhood.</div>
                        <textarea
                            type="text"
                            name="description"
                            className="textarea"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Please write at least 30 characters"
                            rows="5"
                            cols="42"
                        ></textarea>
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>
                    <div className="spot-title">
                        <div className="lead-header">Create a title for your spot</div>
                        <div className="info">Catch guests' attention with a spot title that highlights what makes your place special</div>
                        <input
                            type="text"
                            name="title"
                            className="inputs"
                            value={formValues.title}
                            onChange={handleInputChange}
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
                                name="price"
                                className="inputs"
                                value={formValues.price}
                                onChange={handleInputChange}
                                placeholder="Price per night (USD)"
                            />
                        </div>
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>

                    <div>
                        <div className="lead-header">Liven up your spot with photos</div>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <div className="image-inputs">
                            <input
                                type="text"
                                name="previewImage"
                                className="inputs"
                                value={formValues.previewImage}
                                onChange={handleInputChange}
                                placeholder="Preview Image URL"
                            />
                            {errors.previewImage && <span className="error-text">{errors.previewImage}</span>}
                            {errors.previewImageEnding && (
                                <span className="error-text">{errors.previewImageEnding}</span>
                            )}
                            <input
                                type="text"
                                name="img1"
                                className="inputs"
                                value={formValues.img1}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                            />
                            {errors.img1Ending && <span className="error-text">{errors.img1Ending}</span>}
                            <input
                                type="text"
                                name="img2"
                                className="inputs"
                                value={formValues.img2}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                            />
                            {errors.img2Ending && <span className="error-text">{errors.img2Ending}</span>}
                            <input
                                type="text"
                                name="img3"
                                className="inputs"
                                value={formValues.img3}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                            />
                            {errors.img3Ending && <span className="error-text">{errors.img3Ending}</span>}
                            <input
                                type="text"
                                name="img4"
                                className="inputs"
                                value={formValues.img4}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                            />
                            {errors.img4Ending && <span className="error-text">{errors.img4Ending}</span>}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Create Spot
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;
