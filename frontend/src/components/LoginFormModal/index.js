import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
            );
    };

    const demoUser = (user) => {
        user.preventDefault()
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal);
    }

    return (
        <div className="page">
            <h1 className="title">Log In</h1>
            <div className="Center">
                <form className="login-cred" onSubmit={handleSubmit}>
                    <label className='username'>
                        {/* Username or email */}
                        <input
                            type="text"
                            value={credential}
                            placeholder="Username or Email"
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label className='password'>
                        {/* Password */}
                        <input className="password-input"
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && <p className='error-info'>{errors.credential}</p>}
                    {/* <button type="submit">Log In</button> */}
                    <button disabled={(credential.length < 4) || (password.length < 6)} className='login-button' type="submit">Log In</button>
                </form>
            </div>
            <button className="demo-user-button" type='submit' onClick={demoUser}>Demo User</button>
        </div>
    );
}

export default LoginFormModal
