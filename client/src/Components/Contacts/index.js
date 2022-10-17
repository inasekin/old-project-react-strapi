import React from 'react';
import styles from './Contacts.module.scss';

export default function Contacts({ theme }) {

  const style = theme === 'dark' ? styles.contactNameLight: styles.contactNameDark;
  const containerStyle = theme === 'dark' ? styles.containerDark: styles.containerLight;
  return (
    <div className={containerStyle}>
      <p className={style}>Обратная связь</p>
      <p className={styles.link}><a href='mailto:info@odobreno.team' className={styles.contactMail}>info@odobreno.team</a></p>
      <p className={style}>Контакты для СМИ</p>
      <p className={styles.link}><a href='mailto:pr@odobreno.team' className={styles.contactMail}>pr@odobreno.team</a></p>
    </div>
  );

}
