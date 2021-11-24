export class AnswerModel {
  #value: string;
  #correct: boolean;
  #reveled: boolean;

  constructor(value: string, correct: boolean, reveled = false) {
    this.#value = value;
    this.#correct = correct;
    this.#reveled = reveled;
  }

  static correctAnswer(value: string) {
    return new AnswerModel(value, true);
  }

  static wrong(value: string) {
    return new AnswerModel(value, false);
  }

  get value() {
    return this.#value;
  }

  get correct() {
    return this.#correct;
  }

  get reveled() {
    return this.#reveled;
  }

  revel() {
    return new AnswerModel(this.#value, this.#correct, true);
  }

  static createUsingObject(object: AnswerModel): AnswerModel {
    return new AnswerModel(object.value, object.correct, object.reveled);
  }

  toObject() {
    return {
      value: this.#value,
      correct: this.#correct,
      releved: this.#reveled,
    }
  }
}