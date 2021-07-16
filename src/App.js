/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthoringUtils, PathUtils } from '@adobe/aem-spa-page-model-manager';

import AdventureDetail from './components/AdventureDetail';
import Home from './components/Home';

import './App.scss';

const {
    REACT_APP_HOST_URI, REACT_APP_HOST_PUBLISH_URI, REACT_APP_AEM_PROJECT_ROOT, REACT_APP_PUBLIC_URL
} = process.env;

function App() {

  const REAC_APP_HOST = AuthoringUtils.isInEditor() ? REACT_APP_HOST_URI : REACT_APP_HOST_PUBLISH_URI; 

  console.log(AuthoringUtils.isInEditor());

  // Transform routing path to accomodate for AEM specific paths
  // path updated only when opened within AEM editor
  const transformRoute = (path) => {
    const aemPathRegex = PathUtils.toAEMPath(path, REAC_APP_HOST, REACT_APP_AEM_PROJECT_ROOT);
    return aemPathRegex;
  };

  return (
    <Router>
    <div className="App">
      <header>
        <img src={REACT_APP_PUBLIC_URL + '/wknd-logo-dk.svg'} className="logo" alt="WKND Logo"/>
        <hr />
      </header>
     <Switch>
        <Route path={transformRoute('/adventures/:path')}>
          <AdventureDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
