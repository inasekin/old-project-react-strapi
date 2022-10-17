import React from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

export default async function supportAction(data, setThanksGiving) {
  const { name, surname, email, phone, region, initiativeId } = data;

  const headers = {
    'Content-Type': 'application/json'
  };
  const body = {
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    region: region,
    initiativeId: initiativeId
  };
  const host = window.location.hostname === 'localhost' ? 'http://127.0.0.1:1337' : `https://${window.location.hostname}`;
  const url = `${host}/api/initiatives/${initiativeId}/support`;

  const response = await axios.post(url, body, {
    headers: headers
  });

  const changeOverlay = () => {
    const dimmer = document.querySelector('.dimmer');
    setTimeout(() => {
      dimmer.classList.add('well-response-dimmer');
    }, 2000);
  };

  if (response.status >= 200 && response.status < 300) {
    setThanksGiving(<div style={{ height: '15rem', padding: "3rem 0", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Icon name='thumbs up' size='huge' color='green' /> Спасибо, Ваш голос принят!</div>);
    changeOverlay();
    setTimeout(() => {
      document.location.reload();
    }, 3000);
  }
}
