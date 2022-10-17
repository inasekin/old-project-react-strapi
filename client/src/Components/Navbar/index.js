import React, {useEffect, useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logoBlack from '../../assets/Logo_black.svg';
import logoWhite from '../../assets/Logo_white.svg';
import SocialMedia from '../SocialMedia';

export default function Navbar(props) {
  const { color, initiativeName } = props;

  return (
    <div className={[styles.navWrapper, (color === 'black' ? '' : styles.black)].join(' ')}>
      {/*<YMInitializer accounts={[80625049, 86639997]} options={{webvisor: true}} />*/}
      <nav className={[styles.nav, 'container', 'mb-7'].join(' ')}>
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className={styles.logo}>
              {color === 'black' ? <NavLink exact to="/"><img src={logoBlack} placeholder='odobreno_logo' alt=""/></NavLink> : <NavLink exact to="/"><img src={logoWhite} placeholder='odobreno_logo' alt=""/></NavLink>}
              <p className={styles.initiative}>{initiativeName}</p>
            </div>

            <ul className={['d-md-flex', 'd-sm-none', 'd-none', 'align-items-center', styles.listMenuItems].join(' ')}>
              <li><NavLink activeClassName={styles.active} to='/about' >О проекте</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/initiatives'>Инициативы</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/author'>Об авторе</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/news'>Новости</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/contacts'>Контакты</NavLink></li>
            </ul>

            <div className="d-flex d-md-none d-sm-flex">
              <div className={styles.menuToggle}>
                <input type="checkbox" /><span/><span/><span/>
                <div className={styles.menu}>
                  <ul className={styles.listMenuItems}>
                    <li><NavLink activeClassName={styles.active} to='/about' >О проекте</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/initiatives'>Инициативы</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/author'>Об авторе</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/news'>Новости</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/contacts'>Контакты</NavLink></li>
                  </ul>
                  <SocialMedia />
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}
