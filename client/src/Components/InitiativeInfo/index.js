import React, { useContext } from 'react';
import styles from './InitiativeInfo.module.scss';
import SupportButtonSmall from '../SupportButtonSmall';
import { DataContext } from '../../Context';

export default function InitiativeInfo({ currentInitiative, data, whoSupports }) {

  const { host } = useContext(DataContext);

  const usersNumber = currentInitiative && currentInitiative.users && currentInitiative.users.length;
  const startNumber = currentInitiative && currentInitiative.start_number_of_supporting;
  let counter = '';
  if (startNumber) {
    counter = usersNumber + startNumber;
  } else {
    counter = usersNumber;
  }

  return (
    <div className={[styles.wrapper, "container-fluid mt-0 mb-0"].join(" ")}>
      <div className={[styles.container, "row justify-content-center"].join(" ")}>
        <div className="col-lg-4 col-12 order-lg-1 order-2">
          <h1 className={styles.title}>{currentInitiative && currentInitiative.title}</h1>
          <p className={styles.shortDescription}>{currentInitiative && currentInitiative.short_description}</p>
          <div className={styles.counterContainer}>
            <p className={styles.counter}>{counter}</p><p className={styles.support}>Одобрили инициативу</p>
          </div>
          <SupportButtonSmall data={data} whoSupports={whoSupports} />
        </div>
        <div className="col-lg-4 col-12 order-lg-2 order-1">
          <img className={styles.image} src={`${host}${currentInitiative && currentInitiative.image && currentInitiative.image.url}`} alt='initiative_image' />
        </div>
      </div>
    </div>
  );
}
