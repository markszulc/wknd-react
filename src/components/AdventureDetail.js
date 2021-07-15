/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useState, useEffect } from 'react';
import { withRouter, Link} from "react-router-dom";
import useGraphQL from '../api/useGraphQL';
import Error from './Error';
import Loading from './Loading';
import Image from './Image';
import './AdventureDetail.scss';

import AEMPage from './AEMPage';
import { AEMImage, AEMText } from './core-components/AEMComponents';

const { REACT_APP_PUBLIC_URL } = process.env;

function AdventureDetail(props) {
    const [adventurePath, setAdventurePath] = useState(props.location?.data);

    // if path is unavailable, fetch all adventures list and retrieve detail path
    const { data: adventures } = useGraphQL(adventurePathsQuery, adventurePath);

    useEffect(() => {
        if(adventures) {
            const pathArray = adventures.adventureList?.items?.map((item) => item._path);
            let pathname = window.location.pathname;
            pathname = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
            pathname = pathname.replace(/(.html)/, '');
            pathArray.forEach(path => path.indexOf(pathname) >= 0 && setAdventurePath(path));
        }
    }, [adventures]);

    //parse the content fragment from the url
    //Use a custom React Hook to execute the GraphQL query
    // execute the query only when the path is available
    const { data, errorMessage } = useGraphQL(adventureDetailQuery(adventurePath), !adventurePath);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading icon...
    if(!data) return <Loading />;

    //Set adventureData variable based on graphQL response
    let adventureData = data.adventureByPath.item;
    let pathname = adventurePath.substring(adventurePath.lastIndexOf("/") + 1, adventurePath.length);

    return (
        <div className="adventure-detail">
          <Link className="adventure-detail-close-button" to={"/home"}>
            <img className="Backbutton-icon" src={REACT_APP_PUBLIC_URL + '/icon-close.svg'} alt="Return" />
          </Link>
          <h1 className="adventure-detail-title">{adventureData.adventureTitle}</h1>
          
          <div className="adventure-detail-info">
            <div className="adventure-detail-info-label">Activity</div>
            <div className="adventure-detail-info-description">{adventureData.adventureActivity}</div>
            <div className="adventure-detail-info-label">Type</div>
            <div className="adventure-detail-info-description">{adventureData.adventureType}</div>
            <div className="adventure-detail-info-label">Trip Length</div>
            <div className="adventure-detail-info-description">{adventureData.adventureTripLength}</div>
            <div className="adventure-detail-info-label">Group Size</div>
            <div className="adventure-detail-info-description">{adventureData.adventureGroupSize}</div>
            <div className="adventure-detail-info-label">Difficulty</div>
            <div className="adventure-detail-info-description">{adventureData.adventureDifficulty}</div>
            <div className="adventure-detail-info-label">Price</div>
            <div className="adventure-detail-info-description">{adventureData.adventurePrice}</div>
            <AEMText pagePath={`/content/wknd-spa/adventures/${pathname}`}
            itemPath='root/responsivegrid/text' />
          </div>
          <div className="adventure-detail-content">
            <Image className="adventure-detail-primaryimage" alt={adventureData.adventureTitle}
                   {... adventureData.adventurePrimaryImage} />
            <div dangerouslySetInnerHTML={{__html: adventureData.adventureDescription.html}}></div>

            
            <h2>Itinerary</h2>
            <hr />
            <div className="adventure-detail-itinerary"
                 dangerouslySetInnerHTML={{__html: adventureData.adventureItinerary.html}}></div>
            <AEMImage pagePath={`/content/wknd-spa/adventures/${pathname}`} 
              itemPath={'/root/responsivegrid/image'}/>
            <Contributer {...adventureData.adventureContributor} />
          </div>

        </div>
    );
}

function adventureDetailQuery(_path) {
  return _path && `{
    adventureByPath (_path: "${_path}") {
      item {
        _path
          adventureTitle
          adventureActivity
          adventureType
          adventurePrice
          adventureTripLength
          adventureGroupSize
          adventureDifficulty
          adventurePrice
          adventurePrimaryImage {
            ... on ImageRef {
              _path
              _authorUrl
              _publishUrl
              mimeType
              width
              height
            }
          }
          adventureDescription {
            html
          }
          adventureItinerary {
            html
          }
      }
    }
  }
  `;
}

/**
 * Query for all Adventures
 */
const adventurePathsQuery = `
  {
    adventureList {
      items {
        _path
      }
    }
  }
`;

function Contributer(props) {

  if(!props) {
    return null;
  }
  let pictureReference = null;
  if(props.pictureReference) {
     pictureReference =  <img className="contributor-image" src={props.pictureReference._path} alt={props.fullName} />
  }

  return (
    <div className="contributor">
      <hr className="contributor-separator" />
      {pictureReference}
      <h3 className="contributor-name">{props.fullName}</h3>
      <h4 className="contributor-occupation">{props.occupation}</h4>
    </div>);
}


export default withRouter(AdventureDetail);
