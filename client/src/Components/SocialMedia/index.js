import React from 'react';
import styles from './SocialMedia.module.scss';
import instagram from '../../assets/instagram.svg';
import telegram from '../../assets/telegram.svg';
import youtube from '../../assets/youtube.svg';

export default function SocialMedia({ contactsComp }) {
  const containerStyle = contactsComp ? styles.contacts : styles.container;
  return (
    <div className={['d-flex', containerStyle].join(' ')}>
      <a href='https://www.youtube.com/channel/UCju_nIvmb40XMGxjLO559ow/featured' target='blank' className={styles.icon} >
        <img src={youtube} placeholder='youtube'/>
      </a>
      <a href='https://t.me/artemmetelev' target='blank' className={styles.icon} >
        <img src={telegram} placeholder='telegram' />
      </a>
      <a href='https://www.instagram.com/artmetelev/' target='blank' className={styles.icon} >
        <img src={instagram} placeholder='instagram' />
      </a>
    </div>
  );
}
