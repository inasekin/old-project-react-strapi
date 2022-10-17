import React from 'react';
import styles from './SupportedBy.module.scss';
import { Grid } from 'semantic-ui-react';
import 'react-multi-carousel/lib/styles.css';
import NewCoverflow from '../Coverflow';


export default function SupportedBy({ supported }) {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={8}>
              <p className={styles.title}>Что нам для этого надо?</p>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>
          <Grid>

            <Grid.Column width={12} id={styles.coverflow}>
              {supported && supported.length && <NewCoverflow supported={supported} />}
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>
        </div>
      </div>
    </div>
  );
}
