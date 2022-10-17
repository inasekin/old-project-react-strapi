import React from 'react';
import Contacts from '../Contacts';
import SocialMedia from '../SocialMedia';
import styles from './ContactUs.module.scss';


export default function ContactUs({ text }) {
  return (
    <div className="container mt-0">
      <div className="row justify-content-center">
        <div className={['col-lg-6'].join(" ")}>
          <div className={styles.textContainer}>
            <h1 className={styles.header}>Свяжитесь с нами</h1>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
        <div className={['col-lg-6 MailForm_rightColumn__13TJA'].join(" ")}>
          <div className={styles.contactsContainer}>
            <Contacts theme='light' />
            <SocialMedia contactsComp={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
