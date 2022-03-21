import React, {useState} from "react";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {},
                       Ilike, Idislike, setIlike, setIdislike}) => {

    const clickLike = async () => {
        await likeTuit(tuit);
        setIlike(!Ilike)
        if (Idislike) {
            await dislikeTuit(tuit);
            setIdislike(false);
        }
    }
    const clickDislike = async () => {
        await dislikeTuit(tuit);
        setIdislike(!Idislike)
        if (Ilike) {
            await likeTuit(tuit);
            setIlike(false);
        }
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
              {<i className="fas fa-heart me-1" style={{color: Ilike? 'red':'#D3D6F1'}}></i>}
              {tuit.stats && tuit.stats.likes}
          </span>
            </div>
            <div className="col">
                <span onClick={() => clickDislike()}>
                    {<i className="fas fa-heart me-1" style={{color: Idislike? 'black':'#D3D6F1'}}></i>}
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