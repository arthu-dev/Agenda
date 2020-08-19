import React from 'react';
import ReactDOM from 'react-dom';

import RightSide from './components/RightSide';
import Header from './components/Header';
import Screen1 from './components/Screen1';
import { Grid } from '@material-ui/core';



ReactDOM.render(
  <React.StrictMode>
    <Header />
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            <Screen1 />
            <RightSide />
        </Grid >
  </React.StrictMode>,
  document.getElementById('root')
);
