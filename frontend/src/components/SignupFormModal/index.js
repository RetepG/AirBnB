import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignUpForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <>
            <div className="SignUp">
                <h1 className="title">Sign Up</h1>
                <form className="Form" onSubmit={handleSubmit}>
                    <label>
                        {/* Email */}
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </label>
                    {errors.email && <p>{errors.email}</p>}
                    <label>
                        {/* Username */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="UserName"
                        />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                    <label>
                        {/* First Name */}
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="First Name"
                        />
                    </label>
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <label>
                        {/* Last Name */}
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            placeholder="Last Name"
                        />
                    </label>
                    {errors.lastName && <p>{errors.lastName}</p>}
                    <label>
                        {/* Password */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            minLength={6}
                        />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                    <label>
                        {/* Confirm Password */}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm Password"
                            minLength={6}
                        />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    {/* <button type="submit">Sign Up</button> */}
                    <button type="submit" className="signup-button" disabled={(!email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmPassword)}>Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
