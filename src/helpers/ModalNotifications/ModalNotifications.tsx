import { useEffect } from 'react';
import styles from './styles.module.css';

interface NotificationProps {
  id: number;
  message: string;
  duration?: number;
  removeNotification: (id: number) => void;
}

function ModalNotifications({ id, message, duration = 3000, removeNotification }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => removeNotification(id), duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeNotification]);

  return (
    <div className={styles.notification__Container}>
      <div className={styles.notification__Item}>{message}</div>
    </div>
  );
}

export default ModalNotifications;