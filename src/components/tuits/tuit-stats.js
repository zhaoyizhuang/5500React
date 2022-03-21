import React, {useState} from "react";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const clickLike = () => {
        likeTuit(tuit);
        if (dislike) dislikeTuit(tuit);
    }
    const clickDislike = () => {
        dislikeTuit(tuit);
        if (like) likeTuit(tuit);
    }
    findAllTuitsLikedByUser("me").then(result => {
        for (let i = 0; i < result.length; i++) {
            if(result[i]._id === tuit._id) {
                // console.log(like);
                setLike(true);
                return;
            }
        }
        setLike(false);
    });
    findAllTuitsDislikedByUser("me").then(result => {
        for (let i = 0; i < result.length; i++) {
            if(result[i]._id === tuit._id) {
                // console.log(like);
                setDislike(true);
                return;
            }
        }
        setDislike(false);
    });

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
          <span onClick={() => clickLike()}>
              {<i className="fas fa-heart me-1" style={{color: like? 'red':'gray'}}></i>}
              {tuit.stats && tuit.stats.likes}
          </span>
            </div>
            <div className="col">
                <span onClick={() => clickDislike()}>
                    {<i className="fas fa-heart me-1" style={{color: dislike? 'black':'gray'}}></i>}
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;