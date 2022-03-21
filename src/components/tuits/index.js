import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits)

    // console.log("tuit");
    // console.log(tuits[0].doesUserLikeTheTuit);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit =>
                                               <Tuit key={tuit._id}
                                                     deleteTuit={deleteTuit}
                                                     likeTuit={likeTuit}
                                                     tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}

export default Tuits;