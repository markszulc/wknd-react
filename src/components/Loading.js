/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {Component} from 'react';

const { REACT_APP_PUBLIC_URL } = process.env;

class Loading extends Component {

    render() {
        return (<div className="loading">
              <img src={REACT_APP_PUBLIC_URL + '/icon-loading.svg'} alt="Loading..." />
          </div>);
    }
}

export default Loading;
