import { useState } from 'react';

const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(
        <form className="sign-form" onSubmit={handleSubmit}>
            <h2 className="sign-form__title">Вход</h2>
            <input className="sign-form__input" type="email" placeholder="Email" onChange={handleEmailChange} required/>
            <input className="sign-form__input" type="password" placeholder="Пароль" onChange={handlePasswordChange} required/>
            <button className="sign-form__button" type="submit">Войти</button>
        </form>
    );
};

export default Login;