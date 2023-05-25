import TrainingIcon from '../Images/training-icon.svg';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Signup from "./Signup";
import {LoginUser} from "./utils";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signupView, setSignupView] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate email
        if (!email) {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }

        // validate password
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }

        // submit the form if there are no errors
        if (!emailError && !passwordError) {
            try {
                const response = await LoginUser(email,password);
                if (response.status === 202) {
                    props.setLoggedIn(true)
                    localStorage.setItem('userId', response.data.id)
                }
            } catch (error) {
                console.log('Login failed',)
                if (error.response.status === 401) {
                    setPasswordError(error.response.data.error)
                } else if (error.response.status === 404) {
                    setEmailError(error.response.data.error)
                }
            }
        }
    };

    function validateInput(passwordError, emailError) {
        return (
            <div className="form-group row justify-content-center">
                {(passwordError && emailError) ?
                    <div className="error d-block justify-content-center w-75 my-2">
                        {passwordError ?
                            <div className="login-input-error">{passwordError}</div> :
                            <div className="login-input-error" style={{height: '25px'}}></div>
                        }
                        {emailError ?
                            <div className="login-input-error">{emailError}</div> :
                            <div className="login-input-error" style={{height: '25px'}}></div>
                        }
                    </div> :
                    <div className="error d-flex justify-content-center w-75">
                        {passwordError ?
                            <div className="login-input-error">{passwordError}</div> :
                            <div className="login-input-error" style={{height: '25px'}}></div>
                        }
                        {emailError ?
                            <div className="login-input-error">{emailError}</div> :
                            <div className="login-input-error" style={{height: '25px'}}></div>
                        }
                    </div>
                }
            </div>
        );
    }


    return (
        <div>
            {!signupView ?
                <div className="login-bg vh-100 d-flex justify-content-center align-items-center">
                    <div className="login-form">
                        <div className="d-block">
                            <div><img src={TrainingIcon} alt="trainingicon"/></div>
                            <div className="form-container">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row justify-content-center mb-3">
                                        <div className="d-flex w-75">
                                            <input type="email"
                                                   className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                                   id="inputEmail3"
                                                   placeholder="E-mail"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-center">
                                        <div className="d-flex w-75">
                                            <input type="password"
                                                   className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                                   id="inputPassword3"
                                                   placeholder="Parool"
                                                   value={password}
                                                   onChange={(e) => setPassword(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-center">
                                        {validateInput(passwordError, emailError)}
                                    </div>

                                    <div className="form-group row justify-content-center">
                                        <div className="d-flex w-75">
                                            <button type="submit" className="sign-in w-100">Logi sisse</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="form-group row justify-content-center mt-4">
                                    <div className="d-flex w-75 gap-1">
                                        <button type="submit" className="forgot-password w-50">Unustasid salasõna</button>
                                        <button onClick={() => setSignupView(true)} type="submit"
                                                className="sign-up w-50">Liitu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Signup setSignupView={setSignupView}/>
            }
        </div>
    )
}

export default Login;


