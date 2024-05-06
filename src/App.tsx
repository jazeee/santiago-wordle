import {
  Box,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { APP_THEME } from './Mui/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useId, useState } from 'react';

const queryClient = new QueryClient();

const ALLOWED_WORD_LENGTH = 5;

enum GUESS_STATE {
  NO_MATCH = 'NO_MATCH', // gray
  MATCH_IN_OTHER_POSITION = 'MATCH_IN_OTHER_POSITION', // yellow
  MATCH_IN_POSITION = 'MATCH_IN_POSITION', // green
}
function getMetrics(word: string, guessedWord: string): GUESS_STATE[] {
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
      guessStates.push(GUESS_STATE.MATCH_IN_POSITION);
    } else if (characters.has(guessedCharacter)) {
      guessStates.push(GUESS_STATE.MATCH_IN_OTHER_POSITION);
    } else {
      guessStates.push(GUESS_STATE.NO_MATCH);
    }
  }
  return guessStates;
}

interface GuessRowProps {
  word: string;
  guessedWord: string;
}
function GuessRow(props: GuessRowProps) {
  const { word, guessedWord } = props;
  const guessMetrics = getMetrics(word, guessedWord);

  return (
    <Stack direction="row" spacing={1}>
      {guessMetrics.map((metric, index) => {
        const character = guessedWord[index];
        return (
          <Box
            sx={{
              color: 'green',
            }}
          >
            {character}
          </Box>
        );
      })}
    </Stack>
  );
}

export function App() {
  const word = 'PILLS';
  const [guessedWord, setGuessedWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const id = useId();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        {getMetrics('ABCDE', 'AAAAA').map((guessState, index) => {
          return <Typography key={index}>{guessState}</Typography>;
        })}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setGuesses((priorGuesses) => {
              try {
                const lastWord = guessedWord;
                setGuessedWord('');
                return [...priorGuesses, lastWord];
              } catch (error) {
                console.error(error);
                return priorGuesses;
              }
            });
          }}
        >
          <label htmlFor={id}>Guess</label>
          <input
            id={id}
            name="guessedWord"
            type="text"
            value={guessedWord}
            onChange={(event) => {
              setGuessedWord(event.target.value);
            }}
          />
          <button type="submit">Enter</button>
        </form>
        {guesses.map((guess, index) => {
          return <GuessRow key={index} word={word} guessedWord={guess} />;
        })}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/**
 * API provides word of the day (client's timezone)
 * GET /words
 * '2024-05-06': PPLLS
 *
 * 6 guesses
 * LIPPY And hit enter, or go back.
 * On Submit
 * Is this a word in a valid US English dictionary. (Localization - do we support UK English, Spanish, ... RTL languages)
 * Not a word, show error message to user
 *
 * If it is a word, compare to given word
 * L Yellow
 * I Green
 * P Yellow
 * P Gray? Or Yellow
 * Y Gray
 *
 * If exact match, success, else
 *
 * 6 guesses allowed.
 */
