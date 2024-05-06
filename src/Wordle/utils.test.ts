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
});
