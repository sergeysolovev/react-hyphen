import React from 'react';
import { hyphenated } from 'hyphenated';

const Hyphenated = ({ children, language }) => {
  return React.Children.toArray(children).map(item => {
    if (item.type === Hyphenated) {
      return item;
    } else if (typeof item === 'string') {
      return hyphenated(item, { language });
    } else {
      const { children, ...props } = item.props;
      return children
        ? React.cloneElement(item, props, <Hyphenated>{children}</Hyphenated>)
        : item;
    }
  });
};

export default Hyphenated;
