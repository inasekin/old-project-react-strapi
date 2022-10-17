import React, { useState, useContext } from 'react';
import styles from './Accordion.module.scss';
import { Accordion } from 'semantic-ui-react';
import { DataContext } from '../../Context';
import Markdown from 'react-markdown';

export default function InitiativeAccordion({ content, color, imageUrl, image, askText, biography, bioTitle, problem, solution }) {
  const { host } = useContext(DataContext);
  const [state, setState] = useState(1);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = state === index ? -1 : index;
    setState(newIndex);
  };

  const text = typeof content === 'string' ? true : false;

  const textStyle = color ? styles.black : styles.blue;
  const preStyle = color ? styles.preBlack : styles.preWhite;
  const marker = state === 0 ? '-' : '+';

  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;

  return (
    <Accordion>
      <Accordion.Title
        active={state === 0}
        index={0}
        onClick={handleClick}
        className={textStyle}
      >
        <div className={styles.titleContainer}>
          {solution && <p className={styles.darkerBlue}>Подробнее о решении<p className={styles.plus}>{marker}</p></p>}
          {problem && <p className={styles.blue}><p className={styles.plus}>{marker}</p>Подробнее о проблеме</p>}
          {biography && color && <p className={styles.dark}>{bioTitle}<p className={styles.plus}>{marker}</p></p>}
        </div>
      </Accordion.Title>
      <Accordion.Content active={state === 0}>
        {image && imageUrl && isMobile && <img className={styles.problemImg} src={`${host}${imageUrl && imageUrl}`} alt='initiative_media' />}
        {askText && <p className={styles.askText}>Спросите себя</p>}
        <div className={styles.problemContainer}>
          {
            text ?
              <Markdown className={preStyle}>{content}</Markdown> :
              content && <AccordionContent host={host} solution={content} biography={biography} />
          }
          {image && imageUrl && !isMobile && <img className={styles.problemImg} src={`${host}${imageUrl && imageUrl}`} alt='initiative_media' />}
        </div>
      </Accordion.Content>
    </Accordion>
  );
}

function AccordionContent({ solution, host, biography }) {
  const { header_one, text_first, text_second, solution_image, header_second, text_third } = solution;
  return (
    <div className={styles.solutionContainer}>
      {header_one && <h1 className={styles.headerOne}>{header_one}</h1>}
      {text_first && <Markdown className={styles.textMedium}>{text_first}</Markdown>}
      {biography && <Markdown className={styles.textMedium}>{biography}</Markdown>}
      {text_second && <Markdown className={styles.textBig}>{text_second}</Markdown>}
      {solution_image && <img className={styles.solutionImage} src={`${host}${solution_image.url}`} alt='solution' />}
      {header_second && <h1 className={styles.headerSecond}>{header_second}</h1>}
      {text_third && <Markdown className={styles.textMedium}>{text_third}</Markdown>}
    </div>
  );
}
