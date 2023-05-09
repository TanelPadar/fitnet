import TrainingIcon from '../Images/training-svgrepo-com1.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';




function RegistrationComplete(props) {

    return (
        <div className="login-bg vh-100 d-flex justify-content-center align-items-center">
            <div className="login-form align-items-center">
                <div className="d-block align-items-center">
                    <div className="d-flex justify-content-start ms-4 mt-3"><img src={TrainingIcon} alt="trainingicon"/></div>
                    <div className="signup-form-container align-items-center h-100">
                        <h1>Thank you!</h1>
                        <h6>Registration was successful.</h6>
                        <button  onClick={() => props.setSignupView(false) }  className="sign-in w-50">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationComplete;


