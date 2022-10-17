import React from 'react';
import styles from './InDevelopment.module.css';

export default function InDevelopment() {

  return (
    <div className={styles.container}>
      <p className={styles.text}>Извините, страница находится в разработке</p>
    </div>
  );
}