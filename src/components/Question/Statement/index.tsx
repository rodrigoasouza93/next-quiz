import styles from './styles.module.css';

interface StatementProps {
  text: string;
}

export function Statement({ text }: StatementProps) {
  return (
    <div className={styles.statement}>
      <span className={styles.text}>{text}</span>
    </div>
  );
}