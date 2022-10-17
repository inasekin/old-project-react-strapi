import React from 'react';
import styles from './ProjectName.module.scss';
import NameMobile from '../../assets/name_mobile.svg';
import NameDesktop from '../../assets/name_desktop.svg';

export default function ProjectName() {
  return (
    <div className="container mt-0">
      <div id="containerPrName" className="row">
        <div className={['col-12', 'justify-content-center'].join(" ")}>
              <img className={styles.mobileName} id='containerPrName' src={NameMobile} alt='project_name' /> :
              <img className={styles.name} id='containerPrName' src={NameDesktop} alt='project_name' />
        </div>
      </div>
    </div>
  );
}
