import { shuffle } from "../functions/arrays";
import { AnswerModel } from "./answer";

export class QuestionModel {
  #id: number;
  #statement: string;
  #answers: AnswerModel[];
  #hit: boolean;

  constructor(id: number, statement: string, answers: AnswerModel[], hit = false) {
    this.#id = id;
    this.#statement = statement;
    this.#answers = answers;
    this.#hit = hit;
  }

  get id() {
    return this.#id;
  }

  get statement() {
    return this.#statement;
  }

  get answers() {
    return this.#answers;
  }

  get hit() {
    return this.#hit;
  }

  get answered() {
    for(let answer of this.#answers) {
      if(answer.reveled) return true;
    }

    return false;
  }

  get notAnswered() {
    return !this.answered;
  }

  answerWith(index: number): QuestionModel {
    const hit = this.#answers[index]?.correct;
    const answers = this.#answers.map((resp, i) => {
      const selectedResponse = index === i;
      const shouldRevel = selectedResponse || resp.correct;
      return shouldRevel ? resp.revel() : resp;
    });

    return new QuestionModel(this.id, this.statement, answers, hit);
  }

  scrambleAnswers() {
    const scrambledAnswers = shuffle(this.#answers);
    return new QuestionModel(this.#id, this.#statement, scrambledAnswers, this.#hit);
  }

  static createUsingObject(object: QuestionModel): QuestionModel {
    const answers = object.answers.map(answer => AnswerModel.createUsingObject(answer));
    return new QuestionModel(object.id, object.statement, answers, object.hit);
  }

  toObject() {
    return {
      id: this.#id,
      statement: this.#statement,
      answered: this.answered,
      hit: this.#hit,
      answers: this.#answers.map(answer => answer.toObject()),
    }
  }
}