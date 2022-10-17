import React from 'react';
import { Switch, Route } from 'react-router';

export default (
  <Switch>
    <Route path='/about' />
    <Route path='/initiatives' />
    <Route path='/news' />
    <Route path='/contacts' />
    <Route path='/author' />
    <Route path='/' />
  </Switch>
);