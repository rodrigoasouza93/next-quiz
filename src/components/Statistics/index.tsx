import styles from './styles.module.css';

interface StatisticsProps {
  value: any;
  text: string;
  backgroundColor?: string;
  fontColor?: string;
}

export function Statistics({ value, text, backgroundColor, fontColor }: StatisticsProps ) {
  return (
    <div className={styles.statistics}>
      <div 
        className={styles.value} 
        style={{
          background: backgroundColor ?? '#FDD60F',
          color: fontColor ?? '#333'
        }}
      >
        {value}
      </div>
      <div className={styles.text}>
        {text}
      </div>
    </div>
  )
}