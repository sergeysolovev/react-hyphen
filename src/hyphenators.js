import createHyphenator from 'hyphen';
import defaultLanguage from './languages/en-us';

const cache = {};

const hyphenators = {
  get: (language = defaultLanguage) => {
    if (!cache[language.id]) {
      cache[language.id] = createHyphenator(language.patterns);
    }
    return cache[language.id];
  }
};

export { hyphenators };
