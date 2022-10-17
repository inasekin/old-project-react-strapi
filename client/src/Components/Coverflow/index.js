import React from 'react';
import styles from './Coverflow.module.scss';

export default function NewCoverflow({ supported }) {

  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;

  const textStyle = isMobile ? styles.mobText : styles.text;
  const checkedStyle = isMobile ? styles.checkedMob : styles.checked;

  return (
    <div className={styles.container}>
      {/* <form> */}
      {/* <Coverflow
          className={styles.coverflow}
          startPosition={0}
          enableScroll={true}
          rotate={5}
          animationSpeed={6}> */}
      <div className={styles.coverflow}>
        {supported && supported.map((org) => {
          return (
            <div className={styles.card} key={org.organization} style={{ background: org.background }}>
              <p className={textStyle}>{org.organization}</p>
              {org.supported && <img src={`http://${window.location.host}/Checked.png`} alt='checked' className={checkedStyle} />}
            </div>
          );
        })}
      </div>
      {/* </Coverflow> */}
      {/* </form> */}
    </div>
  );
}
