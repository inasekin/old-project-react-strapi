import React, { useContext } from 'react';
import styles from './Documents.module.scss';
import { DataContext } from '../../Context';

export default function Documents({ documents, header }) {
  const { host } = useContext(DataContext);
  return (
    <div className={["container-fluid mt-0 mb-0 py-5", styles.wrapper].join(" ")}>
      <div className={["row justify-content-center"].join(" ")}>
        <div className="col-lg-10 col-12">
          <p className={styles.hashtag}>{header}</p>
        </div>
        <div className="col-lg-10 col-12 mt-3">
          {documents && documents.map(document => {
            const link = (document.document && document.document.url) ?
              `${host}${document.document.url}` :
              document.linkToBigFile;
            return (
              <div key={document.id} className={styles.linkContainer}>
                <a className={styles.linkTag} href={`${host}${document.document && document.document.url}`} download target='blank'><div className={styles.tag}>{document.file_format}</div></a>
                <a className={styles.link} href={link} download target='blank'>{document.name}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
