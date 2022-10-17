import React, { useContext, useState } from 'react';
import { Embed } from 'semantic-ui-react';
import styles from './InitiativeVideo.module.scss';
import { DataContext } from '../../Context';

export default function InitiativeVideo({ currentInitiative }) {
  const { host } = useContext(DataContext);
  const [activeVideo, setActiveVideo] = useState(false);
  return (
    <div className={[styles.wrapper, 'container-fluid mt-0 mb-0'].join(" ")}>
      <div className={[styles.container, 'row justify-content-center'].join(" ")}>
        <div className={['col-lg-12 col-12'].join(" ")}>
          <div className={styles.videoContainer}>
            <div className={styles.videoBox}>
              <Embed
                className={styles.video}
                placeholder={`${host}${currentInitiative && currentInitiative.videoBackground && currentInitiative.videoBackground.url}`}
                id={currentInitiative && currentInitiative.videoId}
                source='youtube'
                aspectRatio='16:9'
                icon=''
                active={activeVideo}
              />
            </div>
            <div className={styles.textBox}>
              <h2 className={styles.actual}>Смотреть подробности</h2>
              <button className={styles.videoButton} onClick={() => setActiveVideo(true)}><img className={styles.videoImagePlay} src='/video_button.png' alt='button' />смотреть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
