/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React, {PureComponent, useState, createRef, memo, useEffect} from 'react';
import $ from 'jquery';
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';

require('./AEMForm.css');

const { REACT_APP_HOST_URI, REACT_APP_HOST_PUBLISH_URI, REACT_APP_AUTHORIZATION } = process.env;

const AEMFormIsEmptyFn = function(props) {
    console.log("test");
    return !props || !props.formPath || props.formPath.trim().length < 1;
};

/**
 * React Component for AEM Form to use in AEM SPA Editor.
 *
 * Component props -
 *  formPath : String : form path
 *  guidePath : String : actual form path if it is a valid form
 *  formType : String : "adaptiveForm" or "adaptiveDocument"
 *  themeRef : String  : path to theme
 *  isValidForm : Boolean : true if the path points to a valid form
 *  icChannel : String : "webChannel" or "printChannel"
 *  wcmMode : String : wcmmode to use to render the form
 */
export const AEMForm = ({ formPath, guidePath, formType, themeRef, isValidForm, icChannel, wcmMode }) => {
   const [form, setForm] = useState("");
   useEffect(() => {
    async function fetchData() {
        const data = await fillFormContainer();
        if($(".aemformcontainer")) {
            $(".aemformcontainer").html(data);
        }
    }
    fetchData();
    }, []);

    const REAC_APP_HOST = AuthoringUtils.isInEditor() ? REACT_APP_HOST_URI : REACT_APP_HOST_PUBLISH_URI;

    const fillFormContainer = async () => {
        if (formPath) {
            if (isValidForm) {
                let url = guidePath;

                let params = {
                    'wcmmode' : 'disabled',
                };
                if (themeRef) {
                    params['themeOverride'] = themeRef;
                }
                const dataRef = (new URL(window.parent.location)).searchParams.get("dataRef");
                if (dataRef) {
                    params["dataRef"] = dataRef;
                }
                if (formType === 'adaptiveDocument' && icChannel === 'printChannel') {
                    params['channel'] = 'print';
                    params['mode'] = 'disabled';
                }

                let query = Object.keys(params)
                                .map(k => k + "=" + params[k])
                                .join('&');
                url = url + '?' + query;

                let httpHeaders = new Headers();
                if(REACT_APP_AUTHORIZATION) {
                    httpHeaders.append('Authorization', 'Basic ' + btoa(REACT_APP_AUTHORIZATION))
                }
                

                if (formType === 'adaptiveDocument' && icChannel === 'printChannel') {
                    console.log("Wrong");
                    return <object class="adaptiveDocument" type="application/pdf" width="100%" height="1000px" data="' + url + '"></object>;
                } else {
                    console.log("URL: " + url);
                    const response = await fetch(REAC_APP_HOST+url, {headers: httpHeaders });
                    const data = await response.text();
                    // return data;
                    return data;
                }
            } else {
                if (window.Granite && window.Granite.I18n) {
                    return <p>window.Granite.I18n.get("You need to select a valid form")</p>;
                } else {
                    return <p>You need to select a valid form</p>;
                }
            }
        } else {
            return '';
        }
    }
    return (
        <>
            <div className="aemformcontainer"></div>
        </>
    );
};