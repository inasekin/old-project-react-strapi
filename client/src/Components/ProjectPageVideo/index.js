import React, { useContext, useState } from 'react';
import { DataContext } from '../../Context';
import styles from './ProjectPageVideo.module.css';
import { Embed } from 'semantic-ui-react';

export default function ProjectPageVideo({ videoId, videoText, videoBackground }) {

  const [active, setActive] = useState(false);
  const { host } = useContext(DataContext);
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!isMobile && <div className={styles.lowerRow}>
          <div className={styles.videoContainer}>
            <div className={styles.videoBox}>
              <Embed
                className={styles.video}
                placeholder={`${host}${videoBackground && videoBackground.url}`}
                id={videoId}
                source='youtube'
                aspectRatio='16:9'
                icon='play circle'
              />
            </div>
            <div className={styles.textBox}>
              <h1 className={styles.actual}>О проекте</h1>
              <p className={styles.videoText}>{videoText}</p>
            </div>
          </div>
        </div>}
        {isMobile && <div className={styles.videoContainer}>
          <h1 className={styles.actual}>О проекте</h1>
          <div className={styles.videoBox}>
            <Embed
              className={styles.video}
              placeholder={`${host}${videoBackground && videoBackground.url}`}
              id={videoId}
              source='youtube'
              aspectRatio='16:9'
              icon='play circle'
              active={active}
            />
          </div>
          <p className={styles.videoText}>{videoText}</p>
          <button className={styles.videoButton} onClick={() => setActive(true)}><img className={styles.videoImagePlay} src='/video_button.png' alt='button' />смотреть</button>
        </div>}
      </div>
    </div>
  );
}