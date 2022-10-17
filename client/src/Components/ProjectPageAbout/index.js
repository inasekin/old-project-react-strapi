import React from 'react';
import styles from './ProjectPageAbout.module.scss';

export default function ProjectPageAbout({ logo, text, counter, host }) {
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="flex-column d-flex h-100 flex-start justify-content-center">
            <h1 className={styles.header}>О проекте</h1>
            {isMobile && <img className={styles.logo} src={`${host}${logo}`} alt='logo' />}
            <p className={styles.text}>{text}</p>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          {!isMobile && <img className={styles.logo} src={`${host}${logo}`} alt='logo' />}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-lg-center align-items-start flex-lg-row flex-column mt-50">
            <p className={styles.counter}>{counter}</p><p className={styles.countText}>человек уже с нами</p>
          </div>
        </div>
      </div>
    </div>
  );
}
