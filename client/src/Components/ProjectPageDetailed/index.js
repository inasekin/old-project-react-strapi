import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectPageDetailed.module.scss';
import Ellipse from '../../assets/Ellipse.png';

export default function ProjectPageDetailed({ header, text }) {

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <img className={styles.ellipse} src={Ellipse} alt='ellipse' />
          <h1 className={styles.header}>{header}</h1>
          <p className={styles.text}>{text}</p>
          <Link to='/initiatives' className={styles.link}>Перейти к инициативам</Link>
        </div>
      </div>
    </div>
  );
}
