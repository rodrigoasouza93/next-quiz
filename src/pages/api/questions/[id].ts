import { questions } from "../questionsDatabase"

const getQuestion = (req, res) => {
  const selectedId = +req.query.id;

  const uniqueQuestion = questions.filter(question => question.id === selectedId);

  if (uniqueQuestion.length === 1) {
    const selectedQuestion = uniqueQuestion[0].scrambleAnswers();
    res.status(200).json(selectedQuestion.toObject());
  } else {
    res.status(204).send();
  }
}

export default getQuestion;
