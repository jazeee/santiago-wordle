import { GuessOutcome } from './types';
import { getMetrics } from './utils';

describe('getMetrics', () => {
  it('should get exact metrics match', () => {
    expect(getMetrics('PILLS', 'PILLS')).toEqual([
      GuessOutcome.MATCH_IN_POSITION,
      GuessOutcome.MATCH_IN_POSITION,
      GuessOutcome.MATCH_IN_POSITION,
      GuessOutcome.MATCH_IN_POSITION,
      GuessOutcome.MATCH_IN_POSITION,
    ]);
  });

  it('should get other position metrics match', () => {
    expect(getMetrics('ABCDE', 'BCDEA')).toEqual([
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.MATCH_IN_OTHER_POSITION,
    ]);
  });

  it('should get no matches', () => {
    expect(getMetrics('ABCDE', 'VWXYZ')).toEqual([
      GuessOutcome.NO_MATCH,
      GuessOutcome.NO_MATCH,
      GuessOutcome.NO_MATCH,
      GuessOutcome.NO_MATCH,
      GuessOutcome.NO_MATCH,
    ]);
  });

  it('should get yellow and gray metrics for mismatched position guesses', () => {
    expect(getMetrics('PILLS', 'LIPPY')).toEqual([
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.MATCH_IN_POSITION,
      GuessOutcome.MATCH_IN_OTHER_POSITION,
      GuessOutcome.NO_MATCH,
      GuessOutcome.NO_MATCH,
    ]);
  });
});
