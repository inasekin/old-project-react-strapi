import React, { useState, useEffect, useContext } from 'react';
import { Embed, Form, Checkbox } from 'semantic-ui-react';
import styles from './AboutAuthor.module.scss';
import { DataContext } from '../../Context';
import { Link } from 'react-router-dom';

export default function AboutAuthor({ about, textBullets, videoId, videoPlaceholder, videoText, lastBullet, authorImg }) {
  const [activeVideo, setActiveVideo] = useState(false);
  const width = window.screen.availWidth;
  const isMobile = width < 428 ? true : false;
  const { host } = useContext(DataContext);

  textBullets ? textBullets = [...textBullets, {
    id: 'item4', value: <img src={`${host}${lastBullet && lastBullet.url}`} className={styles.fifthBlock} placeholder='about_image' />
  }] :
    [];
  return (
    <div className={[styles.wrapper, 'container-fluid'].join(" ")}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">

          <div className={[styles.contentWrapper,"row"].join(" ")}>
            <div className="col-12 col-lg-6">

              <p className={styles.name}>Артем Метелев</p>
              <p className={styles.about}>{about}</p>
              {!isMobile && <CheckboxRadioGroup content={textBullets} />}

            </div>
            <div className="col-12 col-lg-6">
              <div className={styles.authorImageContainer}>
                <div className={styles.wrapperAuthorImg}>
                  <Link style={{ backgroundImage: `url(${host}${authorImg && authorImg.url})` }} placeholder='author_image' className={styles.authorImg} />
                </div>
                <div className={styles.blueCircle + " " + styles.blueCircleBig} />
                <div className={styles.blueCircle + " " + styles.blueCircleSmall} />
              </div>
              {isMobile && textBullets && textBullets.map(el => {
                if (el.id !== 'item5') {
                  return <p className={styles.text}>{el.value}</p>;
                } else {
                  return el.value;
                }
              })}
            </div>
          </div>

        </div>
        <div className="col-12 col-lg-9">
          {!isMobile &&
          <div className={styles.videoContainer}>
            <div className={styles.videoBox}>
              <Embed
                className={styles.video}
                placeholder={`${host}${videoPlaceholder && videoPlaceholder.url}`}
                id={videoId}
                source='youtube'
                aspectRatio='16:9'
                color='blue'
                icon=''
                active={activeVideo}
                onClick={() => setActiveVideo(true)}
              />
            </div>
            <div className={styles.textBox}>
              <h1 className={styles.actual}>{videoText}</h1>
              <div>
                <button className={styles.videoButton} onClick={() => setActiveVideo(true)}><img className={styles.videoImagePlay} src='video_button.png' alt='button' />
                  <span className={styles.videoButtonText}>
                    смотреть
                  </span>
                </button>
              </div>
            </div>
          </div>}
        </div>
      </div>
      {isMobile && <div className={styles.videoContainer}>
        <h1 className={styles.actual}>Актуально прямо сейчас</h1>
        <div className={styles.videoBox}>
          <Embed
            className={styles.video}
            placeholder={`${host}${videoPlaceholder && videoPlaceholder.url}`}
            id={videoId}
            source='youtube'
            aspectRatio='16:9'
            color='blue'
            icon=''
            active={activeVideo}
            onClick={() => setActiveVideo(true)}
          />
        </div>
        <div>
          <button className={styles.videoButton} onClick={() => setActiveVideo(true)}><img className={styles.videoImagePlay} src='video_button.png' alt='button' />
            <span className={styles.videoButtonText}>
              смотреть
            </span>
          </button>
        </div>
      </div>}
    </div>
  );
}

function CheckboxRadioGroup({ content }) {

  const [state, setState] = useState(content && content[0]);
  const [index, setIndex] = useState(0);
  const handleChange = (e, { value }) => {
    setState({ id: e.target.id, value: value });
    content.filter((el, i) => {
      if (el.id === e.target.id) {
        setIndex(i);
      }
    });
  };

  useEffect(() => {
    let interValId = setInterval(() => {
      if (index < 5) {
        setIndex((index) => index += 1);
      } else {
        setIndex(0);
      }
      if (content) {
        setState({ id: content[index] ? content[index].id : content && content[0].id, value: content[index] ? content[index].value : content && content[0].value });
      }
    }, 3000);
    return () => clearInterval(interValId);
  }, [index]);


  return (
    <>
      <Form className={styles.checkboxContainer}>
        <Form.Field >
          {content && content.map(info => {
            const { value } = info;
            return (
              <Checkbox
                radio
                className={styles.checkbox}
                name='checkboxRadioGroup'
                key={info.id}
                id={info.id}
                value={value}
                checked={state && state.id == info.id}
                onClick={handleChange}
              />
            );
          })}
        </Form.Field>
      </Form>
      <div className={styles.textField}>{state && state.value}</div>
    </>
  );
}
