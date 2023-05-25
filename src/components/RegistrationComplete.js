import TrainingIcon from '../Images/training-icon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

function RegistrationComplete(props) {
    return (
        <div className="login-bg vh-100 d-flex justify-content-center align-items-center">
            <div className="d-flex login-form justify-content-center align-items-center">
                <div className="signup-form-container d-flex flex-column align-items-center justify-content-center align-items-center">
                        <img src={TrainingIcon} width={"100"} alt="trainingicon"/>
                        <h1 className={"mb-3"}>Tere Tulemast!</h1>
                        <h6 className={"mb-3"}>Registreerimine oli edukas!</h6>
                        <button onClick={() => props.setSignupView(false)} className="sign-in w-100">Logi sisse</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationComplete;


