import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Quiz } from '../components/Quiz';
import { QuestionModel } from '../model/question';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Game() {
  const router = useRouter();

  const [questionsIds, setQuestionsIds] = useState<number[]>([]);
  const [question, setQuestion] = useState<QuestionModel>();
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const questionRef = useRef<QuestionModel>();

  useEffect(() => {
    loadQuestionsIds();
  }, []);

  useEffect(() => {
    questionsIds.length > 0 && loadQuestion(questionsIds[0]);
  }, [questionsIds]);

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  async function loadQuestionsIds() {
    const response = await fetch(`${BASE_URL}/quiz`);
    const questionsIdsData = await response.json();

    setQuestionsIds(questionsIdsData);
  }

  async function loadQuestion(questionId: number) {
    const response = await fetch(`${BASE_URL}/questions/${questionId}`);
    const json = await response.json();

    const newQuestion = QuestionModel.createUsingObject(json);
    setQuestion(newQuestion);
  }

  function answeredQuestion(userAnsweredQuestion: QuestionModel) {
    setQuestion(userAnsweredQuestion);
    const hit = userAnsweredQuestion.hit;

    if (hit) {
      setCorrectAnswers(correctAnswers + 1);
    }
  }

  function getNextQuestionid() {
    const nextIndex = questionsIds.indexOf(question.id) + 1;
    return questionsIds[nextIndex];
  }

  function goToNextQuestion(nextId: number) {
    loadQuestion(nextId);
  }

  function end() {
    router.push({
      pathname: '/result',
      query: {
        total: questionsIds.length,
        corrects: correctAnswers
      }
    });
  }

  function goToNextStep() {
    const nextId = getNextQuestionid();

    nextId ? goToNextQuestion(nextId) : end();
  }

  return (
    question ? (
      <Quiz
        question={question}
        last={getNextQuestionid() === undefined}
        answeredQuestion={answeredQuestion}
        goToNextStep={goToNextStep}
      />
    ) : false
  )
}
