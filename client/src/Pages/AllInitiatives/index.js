import React, { useContext, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Help from '../../Components/Help';
import styles from './AllInitiatives.module.scss';
import { DataContext } from '../../Context';
import InitiativeCard from '../../Components/InitiativeCard';
import { useLocation } from 'react-router-dom';

export default function AllInitiatives() {
  const { initiatives } = useContext(DataContext);
  const { pathname } = useLocation();
  const initiativesToShow = initiatives.sort((a, b) => a.position_in_list - b.position_in_list);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return (
    <>
      <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={false} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={styles.top}>
              <h1 className={styles.header}>Наши инициативы</h1>
              <p className={styles.text}>Здесь можно узнать чего мы добились и поддержать актуальные инициативы.</p>
            </div>
            {initiatives && initiativesToShow.map(initiative => <InitiativeCard key={initiative.id} initiative={initiative} />)}
          </div>
          <div className="col-12">
            <Help style='light' />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
