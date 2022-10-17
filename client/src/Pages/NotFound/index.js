import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.textContainer}>
            <h1 className={styles.header}>Возникла ошибка</h1>
            <h1 className={styles.error}>404</h1>
          </div>
          <Link to='/'><button id={styles.toMain}>На главную</button></Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
