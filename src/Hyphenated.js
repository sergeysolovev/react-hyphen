import React from 'react';
import { hyphenated } from 'hyphenated';

const Hyphenated = ({ children, language }) => {
  handleDangerouslySetInnerHTML(children, language);
  const childrenCount = React.Children.count(children);
  const hyphenateChild = child => {
    if (child === null) {
      return null;
    } else if (child.type === Hyphenated) {
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

function handleDangerouslySetInnerHTML(children, language) {
  if (children && children.props && children.props.dangerouslySetInnerHTML) {
    children.props.dangerouslySetInnerHTML.__html = hyphenated(
      children.props.dangerouslySetInnerHTML.__html,
      { language }
    );
  }
}

export default Hyphenated;
