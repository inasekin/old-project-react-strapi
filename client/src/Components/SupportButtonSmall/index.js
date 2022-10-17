import React, { useReducer, useContext } from 'react';
import { useParams } from 'react-router';
import styles from './SupportButtonSmall.module.scss';
import SupportModal from '../SupportModal';
import modalReducer from '../../helpers/modalReducer';
import { DataContext } from '../../Context';

export default function SupportButtonSmall({ whoSupports, pulsating }) {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    dimmer: undefined,
  });
  const { initiatives } = useContext(DataContext);

  const { name } = useParams();

  const currentInitiative = initiatives && initiatives.filter(el => el.name === name)[0];
  const id = currentInitiative && currentInitiative.id;

  async function openSupportModal() {
    dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' });
  }

  const style = pulsating ? styles.pulse : styles.support;

  return (
    <>
      <button onClick={() => openSupportModal()} className={style}>
        <div className={styles.buttonText}>
            Одобрить
        </div>
      </button>
      <SupportModal state={state} dispatch={dispatch} whoSupports={whoSupports} id={id}/>
    </>
  );
}
