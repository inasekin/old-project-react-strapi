import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthorInitiatives.module.scss';
import { DataContext } from '../../Context';
import Ellipse from '../../assets/Ellipse.png';

export default function AuthorInitiatives() {

  const { initiatives, aboutAuthorPage } = useContext(DataContext);
  const darkBubble = initiatives && initiatives.filter(el => el.bubbleColor === 'dark')[0];
  const violetBubble = initiatives && initiatives.filter(el => el.bubbleColor === 'violet')[0];
  const orangeBubble = initiatives && initiatives.filter(el => el.bubbleColor === 'orange')[0];
  const blueBubble = initiatives && initiatives.filter(el => el.bubbleColor === 'blue')[0];
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bubbleContainer}>
          <div className={styles.darkBubble}>
            <p className={styles.darkText}>{darkBubble && darkBubble.bubble_text}</p>
            {darkBubble && darkBubble.readyToShow && <Link to={`/initiatives/${darkBubble && darkBubble.name}`}><button className={styles.solveButton}>Решить</button></Link>}
          </div>
          <div className={styles.violetBubble}>
            <p className={styles.violetText}>{violetBubble && violetBubble.bubble_text}</p>
            {violetBubble && violetBubble.readyToShow && <Link to={`/initiatives/${violetBubble && violetBubble.name}`}><button className={styles.solveButton}>Решить</button></Link>}
          </div>
          <div className={styles.orangeBubble}>
            <p className={styles.orangeText}>{orangeBubble && orangeBubble.bubble_text}</p>
            {orangeBubble && orangeBubble.readyToShow && <Link to={`/initiatives/${orangeBubble && orangeBubble.name}`}><button className={styles.solveButtonBig}>Решить</button></Link>}
          </div>
          <div className={styles.blueBubble}>
            <p className={styles.blueText}>{blueBubble && blueBubble.bubble_text}</p>
            {blueBubble && blueBubble.readyToShow && <Link to={`/initiatives/${blueBubble && blueBubble.name}`}><button className={styles.solveButton}>Решить</button></Link>}
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-10" style={{position: 'relative'}}>
            <img className={styles.ellipse} src={Ellipse} alt='ellipse' />
            <h1 className={styles.header}>{aboutAuthorPage && aboutAuthorPage.under_bubbles_text_header}</h1>
            <Link to='/initiatives' className={styles.link}>Перейти к инициативам</Link>
          </div>
        </div>
      </div>
    </>
  );
}
