import logo from '../../assets/Telegram.png';
import styles from "./WhatsApp.module.css";

export default function Telegram () {
    const username = 'CarlosMario';

    return (
        <div className={`${styles.telegramLanding} center`}>
            <a href={`https://t.me/${username}`} target="_blank" rel="noreferrer noopener" >
                <img className={`${styles.telegram}`} src={logo} alt="Logo Telegram" />
            </a>
        </div>
    );
}