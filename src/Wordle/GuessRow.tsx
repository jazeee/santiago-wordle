import { Box, Stack } from '@mui/material';
import { getMetrics } from './utils';
import { GuessOutcome } from './types';

const GUESS_OUTCOME_BACKGROUND_COLORS: Record<GuessOutcome, string> = {
  [GuessOutcome.NO_MATCH]: '#999',
  [GuessOutcome.MATCH_IN_OTHER_POSITION]: 'yellow',
  [GuessOutcome.MATCH_IN_POSITION]: 'green',
};
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
              color: '#000',
              backgroundColor: GUESS_OUTCOME_BACKGROUND_COLORS[metric],
              width: 48,
              height: 48,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {character}
          </Box>
        );
      })}
    </Stack>
  );
}
