import React, { useContext } from 'react';
import styles from './MetelevInfo.module.scss';
import { DataContext } from '../../Context';
import InitiativeAccordion from '../Accordion';

export default function MetelevInfo() {

  const { host, aboutAuthorPage } = useContext(DataContext);
  const { about_author, author_image, author_facts, biography, bio_title } = aboutAuthorPage && aboutAuthorPage;
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h1 className={styles.name}>Артем Метелев</h1>
          <h3 className={styles.position}>автор проекта «Одобрено»</h3>
          {isMobile && <img src={`${host}${author_image && author_image.url}`} placeholder='artem_metelev' className={styles.avatarMob} />}
          <p className={styles.about}>{about_author}</p>
        </div>
        <div className="col-12 col-lg-6">
          {!isMobile && <img src={`${host}${author_image && author_image.url}`} placeholder='artem_metelev' className={styles.avatar} />}
        </div>
      </div>
      <div className="row">
        {author_facts && author_facts.map(fact => {
          return (
            <div key={fact.id} className={[styles.fact, 'col-12 col-lg-4'].join(" ")}>
              <h1 className={styles.years}>{fact.header}</h1>
              <p className={styles.achievements}>{fact.fact}</p>
            </div>
          );
        })}
      </div>
      {biography && <InitiativeAccordion color='black' content={aboutAuthorPage && biography} bioTitle={aboutAuthorPage && bio_title} biography={true} />}
    </div>
  );
}
