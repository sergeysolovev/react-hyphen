import React from 'react';
import createHyphenator from 'hyphen';
import hyphenationPatternsEnUs from 'hyphen/patterns/en-us';

const hyphenate = createHyphenator(hyphenationPatternsEnUs);

const Hyphenated = ({ children }) => {
  return React.Children.toArray(children).map(item => {
    if (item.type === Hyphenated) {
      return item;
    } else if (typeof item === 'string') {
      return hyphenate(item);
    } else {
      const { children, ...props } = item.props;
      return children
        ? React.cloneElement(item, props, <Hyphenated>{children}</Hyphenated>)
        : item;
    }
  });
};

export default Hyphenated;
