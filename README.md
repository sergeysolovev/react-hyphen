# react-hyphen

[![npm version](https://img.shields.io/npm/v/react-hyphen.svg?style=flat)](https://npmjs.org/package/react-hyphen)
[![CircleCI](https://circleci.com/gh/sergeysolovev/react-hyphen.svg?style=shield)](https://circleci.com/gh/sergeysolovev/react-hyphen)

Hyphenate text in React components. Based on the
[hyphenated](https://github.com/sergeysolovev/hyphenated) library.

- **Simple API**: wrap your components with `Hyphenated` to hyphenate all nested
  elements.
- **Multiple languages**: use any language from
  [hyphenated](https://github.com/sergeysolovev/hyphenated#supported-languages).

[View demo →](https://hyphenated.netlify.com/)

## Quickstart

Install from the command line:

```shell
npm install react-hyphen
```

This installation will include hyphenation patterns for the American English
language as a dependency.

Wrap your components with `Hyphenated`, so they will be rendered with soft
hyphens:

```js
import React from 'react';
import Hyphenated from 'react-hyphen';

const HyphenatedText = () => (
  <Hyphenated>
    From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
    <section>
      <p>
        <strong>Self-evident</strong>, <em>adj.</em> Evident to one’s self and
        to nobody else.
      </p>
    </section>
  </Hyphenated>
);
```

Soft hyphens are invisible but they tell the browser where to put real visible
hyphens.

## Multilingual text

By default, `Hyphenated` uses hyphenation patterns for the American English
language. To hyphenate text in another language, import necessary languages from
[hyphenated](https://github.com/sergeysolovev/hyphenated#supported-languages)
and pass as a `language` prop:

```js
import React from 'react';
import Hyphenated from 'react-hyphen';
import fr from 'hyphenated-fr';
import de from 'hyphenated-de';

const MultilingualText = () => (
  <Hyphenated>
    It is possible to hyphenate multilingual text.{' '}
    <Hyphenated language={fr}>
      Je suis l{"'"}itinéraire donné par Pierre, un ami français.
    </Hyphenated>{' '}
    <Hyphenated language={de}>
      Das Universalgenie war nicht nur Schriftsteller, sondern auch
      Rechtsanwalt.
    </Hyphenated>{' '}
    Just wrap it using an appropriate language.
  </Hyphenated>
);
```

The resulting text will include optional hyphens using patterns for American
English, French and German languages.

## License

MIT
