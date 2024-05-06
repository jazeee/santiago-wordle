import { GuessOutcome } from './types';

export const ALLOWED_WORD_LENGTH = 5;

function summarizeWordMetrics(word: string) {
  const characterCount: Map<string, number> = new Map();
  for (const character of word) {
    const count = characterCount.get(character) ?? 0;
    characterCount.set(character, count + 1);
  }
  return characterCount;
}

export function getMetrics(word: string, guessedWord: string): GuessOutcome[] {
  // if (
  //   word.length !== ALLOWED_WORD_LENGTH ||
  //   guessedWord.length !== ALLOWED_WORD_LENGTH
  // ) {
  //   throw new Error(`Invalid word lengths ${word}`);
  // }
  const characterCount = summarizeWordMetrics(word);
  // alpha validation.
  // upper case validation.
  const guessStates = [];
  for (let index = 0; index < ALLOWED_WORD_LENGTH; index += 1) {
    const character = word[index];
    const guessedCharacter = guessedWord[index];
    const guessedCharacterCount = characterCount.get(guessedCharacter) ?? 0;
    if (character === guessedCharacter) {
      guessStates.push(GuessOutcome.MATCH_IN_POSITION);
    } else if (guessedCharacterCount > 0) {
      guessStates.push(GuessOutcome.MATCH_IN_OTHER_POSITION);
      characterCount.set(guessedCharacter, guessedCharacterCount - 1);
    } else {
      guessStates.push(GuessOutcome.NO_MATCH);
    }
  }
  return guessStates;
}
