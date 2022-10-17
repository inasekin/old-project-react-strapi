import React, { useContext } from 'react';
import styles from './Companies.module.scss';
import { DataContext } from '../../Context';

export default function Companies({ companies, partnersNum }) {
  const { host } = useContext(DataContext);

  return (
    <div className={[styles.wrapper, "container-fluid mt-0 mb-0"].join(" ")}>
      <div className={[styles.container, 'row justify-content-center'].join(" ")}>
        <div className="col-lg-10 col-12">
          <p className={styles.header}>Партнеры, поддержавшие проект</p>

          <div className={['row', styles.carouselWrapper].join(" ")}>
            <div className="col-lg-2 col-md-4 col-4">
              <div className={styles.text}>
                <p className={styles.partners}>{partnersNum && partnersNum}</p>
                <p className={styles.about}>Партнеры проекта</p>
              </div>
            </div>
            <div className="col-lg-10 col-md-8 col-8">
              <div className={styles.imageColumn}>
                {companies && companies.map((company, i) => {
                  return (
                    <div className={styles.imageContainer} key={company.url}>
                      <img className={styles.logo} src={`${host}${companies && company.url}`} alt={`company${i + 1}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
