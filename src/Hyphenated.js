import React from 'react';
import { hyphenators } from './hyphenators';

const Hyphenated = ({ children, language }) => {
  return React.Children.toArray(children).map(item => {
    if (item.type === Hyphenated) {
      return item;
    } else if (typeof item === 'string') {
      const hyphenate = hyphenators.get(language);
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
