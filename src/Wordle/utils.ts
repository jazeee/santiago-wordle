import { GuessOutcome } from './types';

export const ALLOWED_WORD_LENGTH = 5;

export function getMetrics(word: string, guessedWord: string): GuessOutcome[] {
  // if (
  //   word.length !== ALLOWED_WORD_LENGTH ||
  //   guessedWord.length !== ALLOWED_WORD_LENGTH
  // ) {
  //   throw new Error(`Invalid word lengths ${word}`);
  // }
  const characters = new Set([...word]);
  // alpha validation.
  // upper case validation.
  const guessStates = [];
  for (let index = 0; index < ALLOWED_WORD_LENGTH; index += 1) {
    const character = word[index];
    const guessedCharacter = guessedWord[index];
    if (character === guessedCharacter) {
      guessStates.push(GuessOutcome.MATCH_IN_POSITION);
    } else if (characters.has(guessedCharacter)) {
      guessStates.push(GuessOutcome.MATCH_IN_OTHER_POSITION);
    } else {
      guessStates.push(GuessOutcome.NO_MATCH);
    }
  }
  return guessStates;
}
