import createHyphenator from 'hyphen';
import { enUs } from './languages/en-us';
import { enGb } from './languages/en-gb';

jest.mock('hyphen');
createHyphenator.mockImplementation(() => () => {});

describe('hyphenators', () => {
  describe('get', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('creates a hyphenator for en-US language when called without args', () => {
      const { hyphenators } = require('./hyphenators');
      hyphenators.get();
      expect(createHyphenator).toHaveBeenCalledWith(enUs.patterns);
    });

    it('creates a hyphenator only once when called without args', () => {
      const { hyphenators } = require('./hyphenators');
      expect(hyphenators.get()).toBe(hyphenators.get());
      expect(createHyphenator).toHaveBeenCalledTimes(1);
    });

    it('creates a hyphenator only once for a particular language', () => {
      const { hyphenators } = require('./hyphenators');
      expect(hyphenators.get(enGb)).toBe(hyphenators.get(enGb));
      expect(createHyphenator).toHaveBeenCalledTimes(1);
    });
  });
});
