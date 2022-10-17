import React from 'react';
import InitiativeAccordion from '../Accordion';
import styles from './Problem.module.scss';
import Markdown from 'react-markdown';

export default function Problem({ currentInitiative }) {

  const longProblem = currentInitiative && currentInitiative.problem_more;
  const shortProblem = currentInitiative && currentInitiative.problem_short;
  const imageUrl = currentInitiative && currentInitiative.problem_image && currentInitiative.problem_image.url;
  const askText = currentInitiative && currentInitiative.title === 'Оторванное образование';
  return (
    <div className={[styles.wrapper, 'container-fluid mt-0'].join(" ")}>
      <div className={[styles.container, 'row d-flex justify-content-center'].join(" ")}>
        <div className="col-lg-10 col-12">
          <div className="row">
            <div className="col-lg-6 col-12">
              <p className={styles.title}>Проблема</p>
            </div>
            <div className="col-lg-6 col-12">
              <Markdown className={styles.pre}>{shortProblem}</Markdown>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-5">
        <div className="col-lg-10 col-12">
          {longProblem && <div className={styles.accordion}><InitiativeAccordion content={longProblem} imageUrl={imageUrl} image={true} askText={askText} problem={true} /></div>}
        </div>
      </div>
    </div>
  );
}

