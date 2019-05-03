import createHyphenator from 'hyphen';
import { enUs } from './languages/en-us';

const cache = {};

const hyphenators = {
  get: (language = enUs) => {
    if (!cache[language.id]) {
      cache[language.id] = createHyphenator(language.patterns);
    }
    return cache[language.id];
  }
};

export { hyphenators };
