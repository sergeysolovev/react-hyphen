import React from 'react';
import { hyphenated } from 'hyphenated';

const Hyphenated = ({ children, language }) => {
  const childrenCount = React.Children.count(children);
  const hyphenateChild = child => {
    if (child.type === Hyphenated) {
      return child;
    } else if (typeof child === 'string') {
      return hyphenated(child, { language });
    } else {
      const { children, ...props } = child.props;
      return children
        ? React.cloneElement(child, props, Hyphenated({ children, language }))
        : child;
    }
  };
  if (childrenCount === 1) {
    return hyphenateChild(children);
  }
  return React.Children.map(children, hyphenateChild);
};

export default Hyphenated;
