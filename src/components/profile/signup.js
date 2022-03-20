import {useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const signup = () => {
        if (name === '' || password === '' || email === '') {
            alert('Empty Input Detected');
            return;
        }
        const newUser = {
            username: name,
            password: password,
            email: email
        }
        service.register(newUser)
            .then(() => navigate('/home'))
            .catch(e => alert(e));
    }
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setName(e.target.value)}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setPassword(e.target.value)}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setEmail(e.target.value)}
                   placeholder="email" type="email"/>
            <button onClick={signup}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}
export default Signup;