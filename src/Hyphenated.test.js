import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Hyphenated from './Hyphenated';
import enGb from 'hyphenated-en-gb';
import de from 'hyphenated-de';
import fr from 'hyphenated-fr';
import { shallow, mount, render } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const softHyphen = '\u00AD';
const hyphenate = (...syllables) => syllables.join(softHyphen);
const Paragraph = ({ children }) => <p>{children}</p>;
const Section = ({ children }) => <section>{children}</section>;

describe('Hyphenated', () => {
  it('renders without crashing', () => {
    shallow(<Hyphenated />);
  });

  it('hyphenates the text “hyphenated”', () => {
    const wrapper = shallow(<Hyphenated>hyphenated</Hyphenated>);
    expect(wrapper.text()).toEqual(hyphenate('hy', 'phen', 'at', 'ed'));
  });

  it('hyphenates text which consists of multiple nodes', () => {
    const wrapper = render(
      <Hyphenated>
        <strong>Scribbler</strong>, <span>n.</span> A professional writer whose
        views are antagonistic to one’s own.
      </Hyphenated>
    );
    expect(wrapper.text()).toEqual(
      hyphenate(
        'Scrib',
        'bler, n. A pro',
        'fes',
        'sion',
        'al writer whose views are an',
        'tag',
        'o',
        'nis',
        'tic to one’s own.'
      )
    );
  });

  it('hyphenates text which consists of multiple nested nodes', () => {
    const wrapper = render(
      <Hyphenated>
        From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
        <section>
          <p>
            <strong>Scribbler</strong>, <em>n.</em> A professional writer whose
            views are antagonistic to one’s own.
          </p>
          <p>
            <strong>Self-evident</strong>, <em>adj.</em> Evident to one’s self
            and to nobody else.
          </p>
        </section>
      </Hyphenated>
    );
    expect(wrapper.text()).toEqual(
      hyphenate(
        'From Am',
        'brose Bierce’s Dev',
        'il’s Dic',
        'tio',
        'nary:Scrib',
        'bler, n. A pro',
        'fes',
        'sion',
        'al writer whose views are an',
        'tag',
        'o',
        'nis',
        'tic to one’s own.Self-ev',
        'i',
        'dent, adj. Ev',
        'i',
        'dent to one’s self and to no',
        'body else.'
      )
    );
  });

  it('hyphenates text which consists of React components', () => {
    const wrapper = render(
      <Hyphenated>
        From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
        <Section>
          <Paragraph>
            <strong>Scribbler</strong>, <em>n.</em> A professional writer whose
            views are antagonistic to one’s own.
          </Paragraph>
          <Paragraph>
            <strong>Self-evident</strong>, <em>adj.</em> Evident to one’s self
            and to nobody else.
          </Paragraph>
        </Section>
      </Hyphenated>
    );
    expect(wrapper.text()).toEqual(
      hyphenate(
        'From Am',
        'brose Bierce’s Dev',
        'il’s Dic',
        'tio',
        'nary:Scrib',
        'bler, n. A pro',
        'fes',
        'sion',
        'al writer whose views are an',
        'tag',
        'o',
        'nis',
        'tic to one’s own.Self-ev',
        'i',
        'dent, adj. Ev',
        'i',
        'dent to one’s self and to no',
        'body else.'
      )
    );
  });

  it('hyphenates text which contains nested Hyphenated components', () => {
    const wrapper = render(
      <Hyphenated>
        From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
        <Hyphenated>
          <Paragraph>
            <strong>
              <Hyphenated>Scribbler</Hyphenated>
            </strong>
            , <em>n.</em> A professional writer whose views are antagonistic to
            one’s own.
          </Paragraph>
        </Hyphenated>
      </Hyphenated>
    );
    expect(wrapper.text()).toEqual(
      hyphenate(
        'From Am',
        'brose Bierce’s Dev',
        'il’s Dic',
        'tio',
        'nary:Scrib',
        'bler, n. A pro',
        'fes',
        'sion',
        'al writer whose views are an',
        'tag',
        'o',
        'nis',
        'tic to one’s own.'
      )
    );
  });

  it('doesn’t add extra Hyphenated components to virtual DOM', () => {
    const wrapper = mount(
      <Hyphenated>
        From Ambrose Bierce’s <em>Devil’s Dictionary</em>:
        <Hyphenated>
          <Paragraph>
            <strong>
              <Hyphenated>Scribbler</Hyphenated>
            </strong>
            , <em>n.</em> A professional writer whose views are antagonistic to
            one’s own.
          </Paragraph>
        </Hyphenated>
      </Hyphenated>
    );
    expect(wrapper.find(Hyphenated)).toHaveLength(3);
  });

  it('preserves the only child of wrapped components which have the only child', () => {
    const WrappedComponent = ({ children }) => children;
    const wrapper = mount(
      <Hyphenated>
        <WrappedComponent>
          <span>a single child</span>
        </WrappedComponent>
      </Hyphenated>
    );
    expect(() =>
      React.Children.only(wrapper.find(WrappedComponent).props().children)
    ).not.toThrow();
  });

  it('preserves no children of wrapped components which have no children', () => {
    const WrappedComponent = () => null;
    const wrapper = mount(
      <Hyphenated>
        <WrappedComponent />
      </Hyphenated>
    );
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
    expect(
      React.Children.count(wrapper.find(WrappedComponent).props().children)
    ).toBe(0);
  });

  it('hyphenates the text “antagonistic” differently for en-GB language', () => {
    const wrapper = shallow(<Hyphenated>antagonistic</Hyphenated>);
    const wrapperEnGb = shallow(
      <Hyphenated language={enGb}>antagonistic</Hyphenated>
    );
    expect(wrapper.text()).toEqual(wrapper.text());
    expect(wrapperEnGb.text()).toEqual(wrapperEnGb.text());
    expect(wrapper.text()).not.toEqual(wrapperEnGb.text());
  });

  it('hyphenates multilingual text using a few instances', () => {
    const wrapper = render(
      <p>
        <Hyphenated>
          It is possible to hyphenate multilingual text.{' '}
          <Hyphenated language={fr}>
            Je suis l'itinéraire donné par Pierre, un ami <span>français</span>.
          </Hyphenated>{' '}
          <Hyphenated language={de}>
            Das <span>Universalgenie</span> war nicht nur Schriftsteller,
            sondern auch Rechtsanwalt.
          </Hyphenated>{' '}
          Just wrap it using an appropriate language.
        </Hyphenated>
      </p>
    );
    expect(wrapper.text()).toEqual(
      hyphenate(
        'It is pos',
        'si',
        'ble to hy',
        'phen',
        'ate mul',
        'ti',
        'lin',
        "gual text. Je suis l'iti",
        'né',
        'raire don',
        'né par Pierre, un ami fran',
        'çais. Das Uni',
        'ver',
        'sal',
        'ge',
        'nie war nicht nur Schrift',
        'stel',
        'ler, son',
        'dern auch Rechts',
        'an',
        'walt. Just wrap it us',
        'ing an ap',
        'pro',
        'pri',
        'ate lan',
        'guage.'
      )
    );
  });

  it('doesn’t crash if there are null children', () => {
    render(
      <Hyphenated>
        <span>a child with text</span>
        {null}
        <span>a child with text</span>
      </Hyphenated>
    );
  });
});
