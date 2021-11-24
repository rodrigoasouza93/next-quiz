import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Button } from '../components/Button';
import { Statistics } from '../components/Statistics';

import styles from '../styles/result.module.css';

export default function Result() {
  const router = useRouter();

  const total = +router.query.total;
  const corrects = +router.query.corrects;
  const percentage = Math.round((corrects / total) * 100);


  const percentageBackgroundColor = useMemo(() => {
    if (percentage >= 70) {
      return '#9CD2A4';
    } else if (percentage >= 50) {
      return '#FDD60F';
    } else {
      return '#DE6A33';
    }
  }, [percentage]);

  return (
    <div className={styles.result}>
      <h1>Resultado final</h1>
      <div className={styles.statistics}>
        <Statistics
          text="Perguntas"
          value={total}
        />
        <Statistics
          text="Certas"
          value={corrects}
          backgroundColor="#9CD2A4"
        />
        <Statistics
          text="Percentual"
          value={`${percentage}%`}
          backgroundColor={percentageBackgroundColor}
        />
      </div>
      <Button 
        href='/game'
        text="Tentar novamente"
      />
      <Button 
        href='/'
        text="Voltar ao início"
      />
    </div>
  )
}