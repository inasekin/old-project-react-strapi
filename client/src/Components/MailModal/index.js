import React from 'react';
import styles from './MailModal.module.css';
import { Modal, Button } from 'semantic-ui-react';

export default function MailModal({ dispatch, state, content }) {
  const { open, dimmer } = state;
  return (
    <Modal
      dimmer={dimmer}
      open={open}
      onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      id={styles.modal}
    >
      <Modal.Header id={styles.modal}>{content.title}</Modal.Header>
      <Modal.Content id={styles.contentContainer}>
        <p className={styles.content}>{content.text}</p>
      </Modal.Content>
      <Modal.Actions id={styles.modal}>
        <Button id={styles.modal} color='blue' onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          Закрыть
        </Button>
      </Modal.Actions>
    </Modal>
  );
}