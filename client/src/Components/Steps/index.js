import React from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './Steps.module.scss';

export default function Steps({ steps }) {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <p className={styles.title}>Как это должно быть устроено</p>
          <div className={styles.stepsContainer}>
            {steps && steps.map((step, i) => {
              return (<Grid.Column width={3} key={step}>
                <div className={styles.step}>
                  <h1 className={styles.index}>{i + 1}</h1>
                  <p className={styles.text}>{step}</p>
                </div>
              </Grid.Column>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
