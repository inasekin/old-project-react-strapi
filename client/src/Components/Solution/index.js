import React from 'react';
import styles from './Solution.module.scss';
import InitiativeAccordion from '../Accordion';
import Markdown from 'react-markdown';

export default function Solution({ currentInitiative }) {

  const shortSolutionSections = currentInitiative && currentInitiative.solution_short_sections;
  const solution = currentInitiative && currentInitiative.solution_more;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12">
          <p className={styles.title}>Решение</p>
        </div>
        <div className="col-lg-6 col-12">
          <div className={styles.solutionContainer}>
            {
              shortSolutionSections && shortSolutionSections.length > 1 ?
                shortSolutionSections.map((solution, index) => {
                  return (
                    <>
                      <p className={styles.title}>{`${index + 1}.`}</p>
                      <Markdown className={styles.pre}>{solution}</Markdown>
                    </>
                  );
                }) :
                <Markdown className={styles.pre}>{currentInitiative && currentInitiative.solution_without_sections}</Markdown>
            }
            {solution && (solution.header_one || solution.text_first || solution.image || solution.header_second || solution.text_second || solution.text_third) && <InitiativeAccordion content={solution} color='black' image={false} solution={true} />}
          </div>
        </div>
      </div>
    </div>
  );
}
