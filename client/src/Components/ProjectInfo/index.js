import React, { useContext, useState } from 'react';
import SocialMedia from '../SocialMedia';
import styles from './ProjectInfo.module.scss';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context';
import Ellipse from "../../assets/Ellipse.png";

export default function ProjectInfo({ title, text }) {
  const { approvedCounter } = useContext(DataContext);

  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  return (
    <div className="container mt-0">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-5 order-lg-1 order-2 d-flex align-content-between flex-wrap flex-column">
          <div className="row">
            <div className="col-12">
              <p className={styles.count}>{approvedCounter}</p>
              <p className={styles.countText}>человек уже с нами</p>
              <div className={styles.buttonContainer}>
                <a href='#support'><button className={styles.supportButton}>Поддержать проект</button></a>
              </div>
            </div>
          </div>

          <div className="row" style={{marginBottom: '10rem', marginTop: '10rem', marginLeft: '4rem' }}>
            <div className="col-10 col-lg-12 position-relative m-auto">
              <img className={styles.ellipse} src={Ellipse} alt='ellipse' />
              <p className={styles.initiativeText}>
                Мы не просто говорим о проблемах. Мы знаем как их решить!
              </p>
              <Link to='/initiatives'><button className={styles.initiativeButton}>Посмотреть инициативы</button></Link>
            </div>
          </div>

          {isMobile && <SocialMedia />}
        </div>

        <div className="col-12 col-lg-7 order-lg-2 order-1">
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.text}>{text}</p>
          {!isMobile && <SocialMedia />}
        </div>
      </div>
    </div>
  );
}
