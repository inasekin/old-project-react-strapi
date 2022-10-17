import React from 'react';
import SocialMedia from '../SocialMedia';
import styles from './Subscribe.module.scss';

export default function Subscribe() {

  return (
    <div className="container pb-5">
      <div className="row">
        <div className="col-12 d-lg-flex d-block justify-content-between align-items-center">
          <h1 className={styles.text}>Подпишись на социальные сети</h1>
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}
