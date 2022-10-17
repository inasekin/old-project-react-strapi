import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import ProjectName from '../../Components/ProjectName';
import Footer from '../../Components/Footer';
import ProjectInfo from '../../Components/ProjectInfo';
import AboutAuthor from '../../Components/AboutAuthor';
import { MainInitiativesDesctop, MainInitiativesMobile } from '../../Components/MainInitiatives';
import News from '../../Components/News';
import Reviews from '../../Components/Reviews';
import { DataContext } from '../../Context';
import Help from '../../Components/Help';
import ContactUs from '../../Components/ContactUs';
import styles from './Main.module.css';
import CookieConsent from 'react-cookie-consent';

export default function Main() {

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const { news, initiatives, mainPage } = useContext(DataContext);
  const [cursorX, setCursorX] = useState();
  const [cursorY, setCursorY] = useState();
  const [cursorStyle, setCursorStyle] = useState(styles.cursorSmall);

  const handleCursor = (e) => {
    setCursorX(e.pageX);
    setCursorY(e.pageY);
    e.target.id === 'containerPrName' ? setCursorStyle(styles.cursorBig) : setCursorStyle(styles.cursorSmall);
  };
  const initiativeNames = [];
  initiatives.forEach(el => initiativeNames.push(el.title));
  const allRecentNews = [];
  initiativeNames.forEach(el => {
    const currentNews = news && news.filter(item => item.tag === el);
    if (currentNews && currentNews.length) {
      allRecentNews.push(currentNews[0]);
    }
  });
  const newsToShow = allRecentNews.length > 4 ?
    allRecentNews.slice(0, 4).sort((a, b) => {

      const dateA = a.news_date.split('-').join();
      const dateB = b.news_date.split('-').join();
      return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
    }) :
    allRecentNews.sort((a, b) => {

      const dateA = a.news_date.split('-').join();
      const dateB = b.news_date.split('-').join();
      return dateB < dateA ? -1 : (dateB > dateA ? 1 : 0);
    });
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  const isInitiativesMobile = width < 992 ? true : false;

  return (
    <div className={styles.container}>
      <div onMouseMove={handleCursor} className={styles.main}>
        <div className={cursorStyle} style={{
          left: cursorX - 65 + 'px',
          top: cursorY - 65 + 'px'
        }}></div>
        <Navbar backgroundColor='transparent' color='black' logoType='black' initiativeName='' main={true} />
        <CookieConsent
          location='bottom'
          buttonText='Согласиться и продолжить'
          cookieName='odobrenoCookie'
          style={{ background: '#1E2A46', fontFamily: 'Montserrat,  sans-serif'}}
          buttonStyle={{ fontFamily: 'Montserrat,  sans-serif', background: '#5287FF', borderRadius: '5rem' }}
          expires={150}
        >
          Мы используем cookie на нашем сайте. Если вы продолжите навигацию по сайту, это значит, что вы с этим согласны.
        </CookieConsent>
        <ProjectName />
        <ProjectInfo title={mainPage && mainPage.project_info_title} text={mainPage && mainPage.project_info_description} />

        <div className={isInitiativesMobile ? "container-fluid pr-0" : "container"}>
          <div className="row">
            <div className={"col-12"}>
              {isInitiativesMobile ? <MainInitiativesMobile /> : <MainInitiativesDesctop />}
            </div>
          </div>
        </div>

        <AboutAuthor about={mainPage && mainPage.author_text} textBullets={mainPage && mainPage.author_text_bullets} videoId={mainPage && mainPage.video_id} videoPlaceholder={mainPage && mainPage.videoPlaceholder} videoText={mainPage && mainPage.videoText} lastBullet={mainPage && mainPage.lastBullet} authorImg={mainPage && mainPage.author_image} />
        <News newsToShow={newsToShow} />
        <Reviews />
        <ContactUs text={mainPage && mainPage.contact_us_text} />
        <Help style='light' />
        <Footer />
      </div>
    </div>
  );
}
