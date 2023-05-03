import TrainingIcon from '../Images/training-svgrepo-com1.svg';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';



function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');

    const validateInput = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please insert a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Password is required.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (rePassword !== password) {
            setRePasswordError('Passwords do not match.');
            valid = false;
        } else {
            setRePasswordError('');
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email
       validateInput()
    };

    function handleInputErrors(passwordError, emailError,rePasswordError) {
        return (
            <div className="form-group row justify-content-center">
                {(passwordError && emailError && rePasswordError) ?
                    <div className="error d-block justify-content-center w-75 my-2">
                        {[passwordError, emailError, rePasswordError].map((error, index) => (
                            <div key={index} className="login-input-error" style={{ height: error ? 'auto' : '' }}>
                                {error}
                            </div>
                        ))}
                    </div> :
                    <div className="error d-block justify-content-center w-75 my-2">
                        {[passwordError, emailError, rePasswordError].map((error, index) => (
                            <div key={index} className="login-input-error" style={{ height: error ? 'auto' : '' }}>
                                {error}
                            </div>
                        ))}
                    </div>

                }
            </div>
        );
    }


    return (
        <div className="login-bg vh-100 d-flex justify-content-center align-items-center">
            <div className="login-form">
                <div className="d-block">
                    <div className="d-flex justify-content-start ms-4 mt-3"><img src={TrainingIcon} alt="trainingicon"/></div>
                    <div className="signup-form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row justify-content-center mb-3">
                                <div className="d-flex w-75">
                                    <input type="email"
                                           className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                           id="inputEmail3"
                                           placeholder="Email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center mb-3">
                                <div className="d-flex w-75">
                                    <input type="password"
                                           className={`form-control ${passwordError  ? 'is-invalid' : ''}`}
                                           id="inputPassword3"
                                           placeholder="Password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center mb-3">
                                <div className="d-flex w-75">
                                    <input type="password"
                                           className={`form-control ${rePassword !== password ? 'is-invalid' : ''}`}
                                           id="inputPassword3"
                                           placeholder="Re-type your Password"
                                           value={rePassword}
                                           onChange={(e) => {
                                               setRePassword(e.target.value)
                                           }}></input>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                <div className="d-flex w-75">
                                    <input type="tel"
                                           className={`form-control`}
                                           id="phonenumber"
                                           placeholder="Phone number"
                                           value={phoneNumber}
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           ></input>
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                {handleInputErrors(passwordError,emailError,rePasswordError)}
                            </div>

                            <div className="form-group row justify-content-center mx-2">
                                <div className="d-flex w-75">
                                    <button type="submit" className="sign-in w-100">Sign up</button>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center mt-5">
                                <div className="d-block justify-content-center">
                                    <a href=""><p className="have-acccount-text fw-bold">Have an account?</p></a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;


