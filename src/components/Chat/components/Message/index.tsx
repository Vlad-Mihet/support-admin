import { format } from "date-fns";
import styles from "./index.module.scss";

export interface MessageProps {
  id: string;
  text: string;
  timestamp: number;
  sentByAdmin: boolean;
}

const Message = ({ text: message, sentByAdmin, timestamp }: MessageProps) => {
  return (
    <div className={`${styles.message} ${!sentByAdmin ? styles.me : ""}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.user}>{sentByAdmin ? "Us" : "You"}</span>
        </div>
        <div className={styles.body}>
          <p>{message}</p>
        </div>
        <span className={styles.date}>
          {format(timestamp, "dd/MM/yyyy HH:mm")}
        </span>
      </div>
    </div>
  );
};

export default Message;
