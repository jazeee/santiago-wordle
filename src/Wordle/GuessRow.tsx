import { Box, Stack } from '@mui/material';
import { getMetrics } from './utils';

interface GuessRowProps {
  word: string;
  guessedWord: string;
}
export function GuessRow(props: GuessRowProps) {
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
