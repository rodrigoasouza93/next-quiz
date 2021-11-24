export function shuffle(elements: any[]): any[] {
  return elements
    .map(value => ({ value, randomValue: Math.random() }))
    .sort((elementOne, elementTwo) => elementOne.randomValue - elementTwo.randomValue)
    .map(element => element.value);
}