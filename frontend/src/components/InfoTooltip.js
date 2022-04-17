import fail from '../images/fail.png';
import success from '../images/success.png';

const InfoTooltip = ({status, onClose, isOpen}) => {

    let isInfoTooltip = isOpen ? 'popup_opened' : '';

    return(
        <div className={`popup ${isInfoTooltip}`}>
            <div className="infotooltip">
                <img className="infotooltip__img" src={status ? success : fail} alt={status ? "Успех" : "Неудача"}/>
                <p className="infotooltip__text">{status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
                <button className="popup__close-button popup__close" type="button" aria-label="Закрыть" onClick={onClose}/>
            </div>
        </div>
    );
};

export default InfoTooltip;