/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
const { AuthoringUtils } = require('@adobe/aem-spa-page-model-manager');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {REACT_APP_HOST_URI, REACT_APP_HOST_PUBLISH_URI, REACT_APP_AUTHORIZATION } = process.env;

const REAC_APP_HOST = AuthoringUtils.isInEditor() ? REACT_APP_HOST_URI : REACT_APP_HOST_PUBLISH_URI;

/*
    Set up a proxy with AEM for local development
    In a production enviroment this proxy should be set up at the webserver level or absolute URLs should be used.
*/

module.exports = function(app) {
  app.use(
    '/content',
    createProxyMiddleware({
      target: REAC_APP_HOST,
      changeOrigin: true,
      //pass in credentials when developing against an Author environment
      auth: REACT_APP_AUTHORIZATION,
    })
  );
  app.use(
    '/etc.clientlibs',
    createProxyMiddleware({
      target: REAC_APP_HOST,
      changeOrigin: true,
      //pass in credentials when developing against an Author environment
      auth: REACT_APP_AUTHORIZATION,
    })
  );
  app.use(
    '/etc/clientlibs',
    createProxyMiddleware({
      target: REAC_APP_HOST,
      changeOrigin: true,
      //pass in credentials when developing against an Author environment
      auth: REACT_APP_AUTHORIZATION,
    })
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};
