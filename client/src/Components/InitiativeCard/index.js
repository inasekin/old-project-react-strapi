import React, { useContext } from 'react';
import styles from './InitiativeCard.module.scss';
import { DataContext } from '../../Context';
import { Link, useHistory } from 'react-router-dom';
import Ellipse from '../../assets/Ellipse.png';

export default function InitiativeCard({ initiative }) {
  const { host } = useContext(DataContext);
  const history = useHistory();
  const numberOfSupporting = initiative.start_number_of_supporting + initiative.users.length;

  const readyId = initiative.readyToShow ? styles.ready : styles.notReady;

  return (
    <>
      {initiative &&
      <div className="col-12">
        <div className="row mb-2">
          <Link id={readyId} className="col-12 col-lg-9 d-flex" to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'}>
            <div className={[styles.projectCard].join(" ")}>

              <img src={`${host}${initiative.image && initiative.image.url}`} alt='initiative_image' className={styles.projectImage} />
              <div className={styles.rightColumn}>
                <div className={styles.textContainer}>
                  <h1>{initiative.title}</h1>
                  <p className={styles.cardText}>{initiative.card_description}</p>
                </div>
                {
                  initiative.approved ?
                    initiative.readyToShow && <Link to={initiative.readyToShow ? `/initiatives/${initiative.name}` : '#'}><button className={styles.support}>История</button></Link> :
                    initiative.readyToShow && <button className={styles.support} onClick={() => history.push(initiative.readyToShow ? `/initiatives/${initiative.id}` : '#')}>Поддержать</button>
                }
              </div>

            </div>
          </Link>
          {initiative.approved ?
            <div className={[styles.approved, 'col-12 col-lg-3'].join(" ")}>Одобрено!</div> :
            (initiative.readyToShow ?
                <div className={[styles.projectInfo, 'col-12 col-lg-3'].join(" ")} style={{ 'background': initiative.card_background }}>
                  <div className={styles.infoBox}>
                    <p className={styles.info}>{numberOfSupporting}</p>
                    <p className={styles.text}>человек одобрили инициативу</p>
                  </div>
                  <div className={styles.infoBox}>
                    <p className={styles.info}>{initiative.partners_number}</p>
                    <p className={styles.text}>партнеры проекта</p>
                  </div>
                  <div className={styles.infoBox}>
                    <p className={styles.info}>{initiative.solutions_released}</p>
                    <p className={styles.text}>решений внедрено</p>
                  </div>
                </div> :
                <div className="col-12 col-lg-3">
                  <div className={styles.developing}>
                    <img className={styles.ellipse} src={Ellipse} alt='ellipse' />
                    <p className={styles.developingText}>Сейчас мы работаем над инициативой. Скоро она станет активной</p>
                  </div>
                </div>
            )
          }
        </div>
      </div>}
    </>
  );
}
