import TrainingIcon from '../Images/training-svgrepo-com1.svg';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import RegistrationComplete from "./RegistrationComplete";
import {RegisterUser} from "./utils";


function Signup(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [registrationComplete, setRegistrationComplete] = useState(false)

    const validateInput = () => {
        let valid = true;
        if (!name) {
            setNameError('Nimi on nõutud väli.');
            valid = false;
        } else {
            setNameError('');
        }

        if (!email) {
            setEmailError('E-post on nõutud väli.');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Palun sisesta korrektne E-posti aadress.');
            valid = false;
        }  else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Salasõna peab olema vähemalt 6 tähemärki.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (rePassword !== password) {
            setRePasswordError('Salasõnad ei kattu.');
            valid = false;
        } else {
            setRePasswordError('');
        }

        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInput() === true) {
            try {
                await RegisterUser(name,email,password,phoneNumber).then(res => {
                    if (res.status === 200) {
                        setRegistrationComplete(true)
                    }
                })
            } catch (error) {
            }
        }

    };

    function handleInputErrors(passwordError, emailError, rePasswordError) {
        return (
            <div className="form-group row justify-content-center">
                {(passwordError && emailError && rePasswordError && nameError) ?
                    <div className="error d-block justify-content-center w-75 my-2">
                        {[passwordError, emailError, rePasswordError, nameError].map((error, index) => (
                            <div key={index} className="login-input-error" style={{height: error ? 'auto' : ''}}>
                                {error}
                            </div>
                        ))}
                    </div> :
                    <div className="error d-block justify-content-center w-75 my-2">
                        {[passwordError, emailError, rePasswordError, nameError].map((error, index) => (
                            <div key={index} className="login-input-error" style={{height: error ? 'auto' : ''}}>
                                {error}
                            </div>
                        ))}
                    </div>

                }
            </div>
        );
    }


    return (
        <div>
            {!registrationComplete ?
            <div className="login-bg vh-100 d-flex justify-content-center align-items-center">
                <div className="login-form">
                    <div className="d-block">
                        <div className="d-flex justify-content-start ms-4 mt-3"><img src={TrainingIcon} alt="trainingicon"/></div>
                        <div className="signup-form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row justify-content-center mb-3">
                                    <div className="d-flex w-75">
                                        <input type="name"
                                               className={`form-control ${nameError ? 'is-invalid' : ''}`}
                                               id="name"
                                               placeholder="Nimi"
                                               value={name}
                                               onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center mb-3">
                                    <div className="d-flex w-75">
                                        <input type="email"
                                               className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                               id="inputEmail3"
                                               placeholder="E-post"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center mb-3">
                                    <div className="d-flex w-75">
                                        <input type="password"
                                               className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                               id="inputPassword3"
                                               placeholder="Parool"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center mb-3">
                                    <div className="d-flex w-75">
                                        <input type="password"
                                               className={`form-control ${rePassword !== password ? 'is-invalid' : ''}`}
                                               id="inputPassword3"
                                               placeholder="Sisesta uuesti parool"
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
                                               placeholder="Telefoni number"
                                               value={phoneNumber}
                                               onChange={(e) => setPhoneNumber(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center">
                                    {handleInputErrors(passwordError, emailError, rePasswordError)}
                                </div>

                                <div className="form-group row justify-content-center  mx-3">
                                    <div className="d-flex w-75">
                                        <button type="submit" onClick={handleSubmit} className="sign-in w-100">Registreeri
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center mt-2">
                                    <div className="d-block justify-content-center">
                                        <a href="" onClick={() => props.setSignupView(false)}><p
                                            className="have-acccount-text fw-bold">Kasutaja olemas?</p></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> : <RegistrationComplete setSignupView={props.setSignupView}/>}
        </div>
    )
}

export default Signup;


