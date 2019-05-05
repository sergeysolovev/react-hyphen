import { createHyphenator } from './createHyphenator';
import { enUs } from './languages/en-us';

const cache = {};

const hyphenators = {
  get: (language = enUs) => {
    if (!cache[language.id]) {
      cache[language.id] = createHyphenator(language);
    }
    return cache[language.id];
  }
};

export { hyphenators };
