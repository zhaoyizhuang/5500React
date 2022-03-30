import React, {useState} from "react";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {},
                       Ilike, Idislike, setIlike, setIdislike, likeNum, dislikeNum}) => {

    const clickLike = async () => {
        await likeTuit(tuit);
        setIlike(!Ilike);
    }
    const clickDislike = async () => {
        await dislikeTuit(tuit);
        setIdislike(!Idislike);
    }

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
              {<i className="fa-solid fa-thumbs-up" style={{color: Ilike? 'red':'#D3D6F1'}}></i>}
              {tuit.stats && tuit.stats.likes}
          </span>
            </div>
            <div className="col">
                <span onClick={() => clickDislike()}>
                    {<i className="fa-solid fa-thumbs-down" style={{color: Idislike? 'black':'#D3D6F1'}}></i>}
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