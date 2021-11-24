import { AnswerModel } from "../../../model/answer";

import styles from './styles.module.css';

interface AnswerProps {
  answer: AnswerModel,
  index: number,
  letter: string;
  letterBackgroundColor: string;
  answerProvided: (index: number) => void
}

export function Answer({ answer, answerProvided, index, letter, letterBackgroundColor }: AnswerProps) {
  const { value } = answer;
  const answerReveled = answer.reveled ? styles.answerReveled : '';

  return (
    <div className={styles.answer} onClick={() => answerProvided(index)}>
      <div className={`${answerReveled} ${styles.answerContent}`}>
        <div className={styles.front}>
          <div
            className={styles.letter}
            style={{
              background: letterBackgroundColor
            }}
          >{letter}</div>
          <div className={styles.value}>{value}</div>
        </div>
        <div className={styles.back}>
          {answer.correct ? (
            <div className={styles.correct}>
              <div>A resposta certa é...</div>
              <div className={styles.text}>{answer.value}</div>
            </div>
          ) : (
            <div className={styles.incorrect}>
              <div>A resposta informada está errada...</div>
              <div className={styles.text}>{answer.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}