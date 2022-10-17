import React from 'react';
import styles from './Infographics.module.scss';
import Markdown from 'react-markdown';

export default function Infographics({ infographics }) {

  let infoSum;
  if (infographics && infographics.infographics_field.length) {
    let sum = 0;
    infographics.infographics_field[0] && infographics.infographics_field.forEach((el) => sum += el.value);
    infographics.info_big[0] && infographics.info_big.forEach((el) => sum += el.value);
    infoSum = sum;
  }

  console.log(infoSum);

  const percentOne = infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].value / infoSum * 500;

  const percentTwo = infographics.infographics_field && infographics.infographics_field[1] && infographics.infographics_field[1].value / infoSum * 500;

  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {infographics.info_big && infographics.info_big[0] && <div className={styles.big}>
          <p className={styles.bigText}>{infographics.info_big && infographics.info_big[0] && infographics.info_big[0].text_start}&nbsp;<span className={styles.bigTextEmph} style={{ 'color': infographics.info_big && infographics.info_big[0] && infographics.info_big[0].color }}>{infographics.info_big && infographics.info_big[0] && infographics.info_big[0].emphasis}&nbsp;</span>{infographics.info_big && infographics.info_big[0] && infographics.info_big[0].text_end}</p>
        </div>}
        {infographics.info_big && infographics.info_big[1] && <div className={styles.bigTwo}>
          <p className={styles.bigTextTwo}>{infographics.info_big && infographics.info_big[1] && infographics.info_big[1].text_start}&nbsp;<span className={styles.bigTextEmphTwo} style={{ 'color': infographics.info_big && infographics.info_big[1] && infographics.info_big[1].color }}>{infographics.info_big && infographics.info_big[1] && infographics.info_big[1].emphasis}&nbsp;</span>{infographics.info_big && infographics.info_big[1] && infographics.info_big[1].text_end}</p>
        </div>}
        {isMobile && <div className={styles.pieChart}
          style={{ 'width': '15rem', 'height': '15rem', 'borderRadius': '50%', 'background': `conic-gradient(${infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].color} 0.00% ${percentOne}%, ${infographics.infographics_field && infographics.infographics_field[1] && infographics.infographics_field[1].color} ${percentOne}% ${percentOne + percentTwo}%)` }}
        />}
        <div className={styles.left}>
          <h2 className={styles.number} style={{ 'color': infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].color }}>{infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].header}</h2>
          <Markdown className={styles.pre}>{infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].description}</Markdown>
        </div>
        {!isMobile && <div className={styles.pieChart}
          style={{ 'width': '20rem', 'height': '20rem', 'borderRadius': '50%', 'background': `conic-gradient(${infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[0].color} 0.00% ${percentOne}%, ${infographics.infographics_field && infographics.infographics_field[0] && infographics.infographics_field[1].color} ${percentOne}% ${percentOne + percentTwo}%, ${infographics.info_big[0] && infographics.info_big[0].color} ${percentOne + percentTwo}%)` }}
        />}
        <div className={styles.right}>
          <h2 className={styles.number} style={{ 'color': infographics.infographics_field && infographics.infographics_field[1] && infographics.infographics_field[1].color }}>{infographics.infographics_field && infographics.infographics_field[1] && infographics.infographics_field[1].header}</h2>
          <Markdown className={styles.pre}>{infographics.infographics_field && infographics.infographics_field[1] && infographics.infographics_field[1].description}</Markdown>
        </div>
      </div>
    </div>
  );
}
