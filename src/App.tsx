import {
  Button,
  Container,
  CssBaseline,
  Stack,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { APP_THEME } from './Mui/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { GuessRow } from './Wordle/GuessRow';

const queryClient = new QueryClient();

export function App() {
  const word = 'PILLS';
  const [guessedWord, setGuessedWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const id = useId();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Stack spacing={2}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                // TODO validate guess length.
                setGuesses((priorGuesses) => {
                  const lastWord = guessedWord;
                  setGuessedWord('');
                  return [...priorGuesses, lastWord];
                });
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  label="Guess"
                  id={id}
                  name="guessed-word"
                  type="text"
                  value={guessedWord}
                  onChange={(event) => {
                    setGuessedWord(event.target.value);
                  }}
                />
                <Button variant="contained" type="submit">
                  Enter Guess
                </Button>
              </Stack>
            </form>
            {guesses.map((guess, index) => {
              return (
                <Stack spacing={1}>
                  <GuessRow key={index} word={word} guessedWord={guess} />
                </Stack>
              );
            })}
          </Stack>
        </Container>
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
