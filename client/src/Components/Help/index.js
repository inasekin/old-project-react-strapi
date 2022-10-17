import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import styles from './Help.module.scss';
import modalReducer from '../../helpers/modalReducer';
import ShareModal from '../ShareModal';
import SupportButton from '../SupportButton';

export default function Help({ style, whoSupports }) {

  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    dimmer: undefined,
  });

  const wrapper = style === 'dark' ? styles.wrapperDark : styles.wrapper;
  const theme = style === 'dark' ? styles.containerDark : styles.containerLight;
  const header = style === 'dark' ? styles.headerDark : styles.headerLight;
  const buttons = style === 'dark' ? styles.buttonDark : styles.buttonLight;
  const showButton = style === 'dark' ? true : false;

  return (
    <div className={style === 'dark' ? ['container-fluid mt-0 m-0 mb-0', styles.wrapperDark].join(" ") : 'container'}>
      <div id={theme} className="">
        <div className="col-12">
          <a name='support'><p className={header}>Как помочь проекту</p></a>
          <div className={styles.buttonContainer}>
            <a href='https://dobro.ru/project/10023947' traget='_blanck'><button className={buttons}><p className={styles.buttonText}>Стать волонтером</p></button></a>
            <Link to='/contacts'><button className={buttons}><p className={styles.buttonText}>Стать партнером</p></button></Link>
            {showButton && <SupportButton whoSupports={whoSupports} />}
            <button className={buttons} onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}><p className={styles.buttonText}>Поделиться с друзьями</p></button>
          </div>
        </div>
      </div>
      <ShareModal dispatch={dispatch} state={state} />
    </div>

  );
}
