import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = ({onRegister}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

return(
    <form className="sign-form" onSubmit={handleSubmit}>
        <h2 className="sign-form__title">Регистрация</h2>
        <input className="sign-form__input" type="email" placeholder="Email" onChange={handleEmailChange} required/>
        <input className="sign-form__input" type="password" placeholder="Пароль" onChange={handlePasswordChange} required/>
        <button className="sign-form__button"type="submit">Зарегистрироваться</button>
        <div className="sign-form__text">
            Уже зарегистрированы? 
            <Link to="/sign-in" className="sign-form__text">Войти</Link>
        </div>
    </form>
);
};

export default Register;