import React from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './ProjectPageScheme.module.scss';

export default function ProjectPageScheme({ steps }) {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <p className={styles.title}>Схема работы</p>
            <div className={styles.stepsContainer}>
              {steps && steps.map((step, i) => {
                return (
                  <div className="col-lg-3 col-12 d-flex d-lg-block" key={i}>
                    <h1 className={styles.index}>{i + 1}</h1>
                    <p className={styles.text}>{step}</p>
                  </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
