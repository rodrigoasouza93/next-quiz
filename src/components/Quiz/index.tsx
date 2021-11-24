import { QuestionModel } from '../../model/question';
import { Button } from '../Button';
import { Question } from '../Question';

import styles from './styles.module.css';

interface QuizProps {
  question: QuestionModel;
  last: boolean;
  answeredQuestion: (question: QuestionModel) => void;
  goToNextStep: () => void;
}

export function Quiz({ question, last, answeredQuestion, goToNextStep }: QuizProps) {
  function answerProvided(index: number) {
    if (question.notAnswered) {
      answeredQuestion(question.answerWith(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {question ? (
        <Question
          question={question}
          timeToAnswer={6}
          answerProvided={answerProvided}
          timeIsOver={goToNextStep}
        />
      ) : false}
      <Button
        onClick={goToNextStep}
        text={last ? 'Finalizar' : 'Próxima'}
      />
    </div>
  )
}