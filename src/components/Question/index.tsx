import { QuestionModel } from '../../model/question';
import { Timer } from '../Timer';
import { Answer } from './Answer';
import { Statement } from './Statement';

import styles from './styles.module.css';

const letters = [
  { value: 'A', color: '#F2C866'},
  { value: 'B', color: '#F266BA'},
  { value: 'C', color: '#85D4F2'},
  { value: 'D', color: '#BCE596'},
]

interface QuestionProps {
  question: QuestionModel;
  answerProvided: (index: number) => void;
  timeToAnswer?: number;
  timeIsOver: () => void;
}

export function Question({ question, answerProvided, timeToAnswer = 10, timeIsOver }: QuestionProps) {
  function renderAnswers() {
    return question.answers.map((answer, i) => (
      <Answer
        key={`${question.id}-${i}`}
        answer={answer}
        index={i}
        letter={letters[i].value}
        letterBackgroundColor={letters[i].color}
        answerProvided={answerProvided}
      />
    ));
  }

  return (
    <div className={styles.question}>
      <Statement text={question.statement} />
      <Timer key={question.id} duration={timeToAnswer} timeIsOver={timeIsOver}/>
      {renderAnswers()}
    </div>
  )
}