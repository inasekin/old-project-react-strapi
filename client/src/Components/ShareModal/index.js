import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import {
  VKShareButton,
  FacebookShareButton,
  VKIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  OKShareButton,
  OKIcon
} from 'react-share';
import styles from './ShareModal.module.scss';


export default function ShareModal({ dispatch, state }) {
  const url = 'https://odobreno.team';
  const title = 'Проект "Одобрено" - окажите влияние на будущее страны!';
  const { open, dimmer } = state;
  return (
    <Modal
      dimmer={dimmer}
      open={open}
      onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      id={styles.modal}
    >
      <Modal.Header id={styles.modal}>Разместите информацию о проекте &ldquo;Одобрено&ldquo; в Ваших социальных сетях</Modal.Header>
      <Modal.Content id={styles.contentContainer}>
        <VKShareButton
          url={url}
          quote={title}
          id={styles.content}
        >
          <VKIcon round={true} />
        </VKShareButton>
        <FacebookShareButton
          url={url}
          quote={title}
          id={styles.content}
        >
          <FacebookIcon round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          quote={title}
          id={styles.content}
        >
          <TwitterIcon round={true} />
        </TwitterShareButton>
        <OKShareButton
          url={url}
          quote={title}
          id={styles.content}
        >
          <OKIcon round={true} />
        </OKShareButton>
      </Modal.Content>
      <Modal.Actions id={styles.modal}>
        <Button id={styles.modal} color='blue' onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          Готово
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
