import React, { useContext } from 'react';
import styles from './Experience.module.scss';
import { DataContext } from '../../Context';
import Markdown from 'react-markdown';

export default function Experience({ text }) {

  const { host } = useContext(DataContext);

  const experience = text && text.country_experience;

  return (
    <div className={["container-fluid mt-0 py-5 mb-0", styles.wrapper].join(" ")}>
      <div className={["row justify-content-center", styles.container].join(" ")}>
        {text && text.image && <img src={`${host}${text.image && text.image.url}`} alt='flag' className={styles.flagUpper} />}

        <div className="col-lg-6 col-12">
          <h1 className={styles.title}>Опыт других</h1>
          <Markdown className={[styles.text, 'mt-5'].join(" ")}>{text.text}</Markdown>
        </div>

      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-12">
          {experience && experience.map((country) => {
            return (
              <div key={country.country} className={styles.country}>
                <img className={styles.flag} src={`${host}${country.picture && country.picture.url}`} alt='flag' />
                <div className={styles.text}>
                  <h2 className={styles.countryName}>{country.country}</h2>
                  <p className={styles.countryExp}>{country.experience}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
