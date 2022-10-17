import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import { Link } from 'react-router-dom';
import styles from './MainInitiatives.module.scss';
import { DataContext } from '../../Context';

export function MainInitiativesDesctop() {
  const { initiatives, host } = useContext(DataContext);
  const filteredInitiatives = initiatives && initiatives.filter(el => el.showOnMain);
  const initiativesToShow = filteredInitiatives.length > 4 ?
    initiatives.slice(initiatives.length - 4, initiatives.length) :
    filteredInitiatives;
  const initiativesToShowSortedInOrder = initiativesToShow && initiativesToShow.sort((a,b) => a.orderOnMain - b.orderOnMain);

  return (
    <div className={styles.wrapper}>
        <div className={styles.text}>
            <p className={styles.header}>У нас есть инициативы</p>
            <Link to='/initiatives' id={styles.link}>Посмотреть все</Link>
        </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          {initiativesToShowSortedInOrder && initiativesToShowSortedInOrder.map((initiative, index) => {
            let cardStyle;
            if (initiativesToShowSortedInOrder.length === 4) {
              if (index === 0) {
                cardStyle = styles.initiativeCardTopLeft;
              } else if (index === initiativesToShowSortedInOrder.length - 1) {
                cardStyle = styles.initiativeCardRightBottom;
              } else if (index === 1) {
                cardStyle = styles.initiativeCardSecond;
              } else if (index === 2 && index !== initiativesToShowSortedInOrder.length - 1) {
                cardStyle = styles.initiativeCardThird;
              }
            } else if (initiativesToShowSortedInOrder.length === 3) {
              if (index === 0) {
                cardStyle = styles.initiativeCardTopLeftThree;
              } else if (index === initiativesToShowSortedInOrder.length - 1) {
                cardStyle = styles.initiativeCardThirdThree;
              } else if (index === 1) {
                cardStyle = styles.initiativeCardSecondThree;
              }
            }


            return (
              <Link key={initiative.id} to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} >
                <div key={initiative.id} className={cardStyle} style={{ 'background': initiative.card_background }}>
                  <img className={styles.initiativeImage} src={`${host}${initiative.image && initiative.image.url}`} alt={initiative.title} />
                  <h1 className={styles.initiativeName} >{initiative.title}</h1>
                  <p className={styles.initiativeDescription} >{initiative.short_description}</p>
                  {initiative.readyToShow ?
                    <Link to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} ><button className={styles.supportButton}>Поддержать</button></Link> :
                    <p className={styles.supportButton} >Инициатива в разработке</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MainInitiativesMobile() {
  const { initiatives, host } = useContext(DataContext);

  return (
    <>
      <p className={styles.header}>У нас есть инициативы</p>
      <div className={styles.swiperWrapper}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoHeight={true}
        >
          {initiatives && initiatives.map(initiative => {
            return (
              <SwiperSlide key={initiative.id}>
                <Link to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} >
                  <div className={styles.card} style={{ 'background': initiative.card_background }}>
                    <img className={styles.initiativeImage} src={`${host}${initiative.image && initiative.image.url}`} alt={initiative.title} />
                    <h1 className={styles.initiativeName} >{initiative.title}</h1>
                    <p className={styles.initiativeDescription}>{initiative.short_description}</p>
                    {initiative.readyToShow ?
                      <Link to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'} ><button className={styles.supportButton}>Поддержать</button></Link> :
                      <p className={styles.supportButton} >Инициатива в разработке</p>}
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Link to='/initiatives' id={styles.link}>Посмотреть все</Link>
    </>
  );
}
