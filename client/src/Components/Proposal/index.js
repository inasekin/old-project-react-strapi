import React from 'react';
import styles from './Proposal.module.scss';
import SupportButton from '../SupportButton';

export default function Proposal({ text, data, whoSupports }) {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div><p className={styles.text}>{text && text}</p></div>
        </div>
        <div className="col-lg-6 col-12 justify-content-center d-flex">
          <SupportButton data={data} pulsating={true} whoSupports={whoSupports} />
        </div>
      </div>
    </div >
  );
}
