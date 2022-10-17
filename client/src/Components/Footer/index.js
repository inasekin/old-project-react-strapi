import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import SocialMedia from '../SocialMedia';
import Contacts from '../Contacts';
import logoWhite from '../../assets/Logo_white.svg';

export default function Footer() {
  const { pathname } = useLocation();
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  const handleOnClick = useCallback(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [document.body, document.documentElement]);
  return (
    <div className={[styles.wrapper, 'container-fluid'].join(" ")}>
      <div className="row">
        <div className="col-lg-8 col-12">

          <div className="row">
            <div className="col-6 col-lg-7">
              <Link to='/'><img src={logoWhite} placeholder='odobreno_logo' className={styles.logo}/></Link>
            </div>

            <div className="col-6 col-lg-5">
              <Link id={styles.link} to='/about'>О проекте</Link>
              <Link id={styles.link} to='/initiatives'>Инициативы</Link>
              <Link id={styles.link} to='/author'>Об авторе</Link>
              <Link id={styles.link} to='/news'>Новости</Link>
              <Link id={styles.link} to='/contacts'>Контакты</Link>
            </div>
          </div>


        </div>
        <div className="col-12 col-lg-4">
          <Contacts theme='dark' />
          <SocialMedia />
        </div>
        {isMobile && pathname !== '/' && <button onClick={(handleOnClick)()} style={{ 'visibility': 'hidden' }}>TOP</button>}
      </div>
    </div>
  );
}
