import React, {useState} from "react";

/**
 * Stats of a tuit
 *
 * @param tuit tuit instance.
 * @param likeTuit likeTuit function
 * @param dislikeTuit dislikeTuit function
 * @param Ilike if the user likes this tuit
 * @param Idislike if the user dislikes this tuit
 * @param setIlike set if the user likes the tuit
 * @param setIdislike set if the user dislikes the tuit
 */
const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {},
                       Ilike, Idislike, setIlike, setIdislike}) => {

    // toggle likes button
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
                <span className="ttr-stats-replies">{tuit.stats && tuit.stats.replies}</span>
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                <span className="ttr-stats-retuits">{tuit.stats && tuit.stats.retuits}</span>
            </div>
            <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => clickLike()}>
              {<i className="fa-solid fa-thumbs-up" style={{color: Ilike? 'red':'#D3D6F1'}}></i>}
              <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
          </span>
            </div>
            <div className="col">
                <span className="ttr-dislike-tuit-click" onClick={() => clickDislike()}>
                    {<i className="fa-solid fa-thumbs-down" style={{color: Idislike? 'black':'#D3D6F1'}}></i>}
                    <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;