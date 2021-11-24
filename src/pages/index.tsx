import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { QuestionModel } from '../model/question';
import { Button } from '../components/Button';

import styles from '../styles/home.module.css';

const BASE_URL = 'http://172.27.222.61:3000/api';

export default function Home() {
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
    <div className={styles.home}>
      <h1>Bem vindo ao jogo de questionário</h1>
      <Button text="Iniciar jogo" href="/game" />
    </div>
  )
}
