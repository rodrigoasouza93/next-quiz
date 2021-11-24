import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './styles.module.css';

interface TimerProps {
  key: any;
  duration: number;
  timeIsOver: () => void;
}

export function Timer({ duration, timeIsOver }: TimerProps) {
  return (
    <div className={styles.timer}>
      <CountdownCircleTimer
        duration={duration}
        size={120}
        isPlaying
        onComplete={timeIsOver}
        colors={[
          ['#BCE596', 0.33],
          ['#F7B801', 0.33],
          ['#ED827A', 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}