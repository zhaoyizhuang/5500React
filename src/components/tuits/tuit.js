import React, {useEffect, useState} from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import {useNavigate, Link} from "react-router-dom";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

const Tuit = ({tuit = {}, deleteTuit, likeTuit, dislikeTuit}) => {
    const navigate = useNavigate();
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis/1000.0;
        const minutesOld = secondsOld/60.0;
        const hoursOld = minutesOld/60.0;
        const daysOld = hoursOld/24.0;
        if(daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if(hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if(minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if(secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        }
        return old;
    }

    const [Ilike,setIlike] = useState(false);
    const [Idislike,setIdislike] = useState(false);
    useEffect(() => {
        findAllTuitsLikedByUser("me").then(result => {
            for (let i = 0; i < result.length; i++) {
                if (result[i]._id === tuit._id) {
                    setIlike(true)
                }
            }
        })
    },[]);
    useEffect(() => {
        findAllTuitsDislikedByUser("me").then(result => {
            for (let i = 0; i < result.length; i++) {
                if (result[i]._id === tuit._id) {
                    setIdislike(true)
                }
            }
        })
    },[]);
    return(
        // <li onClick={() => navigate(`/tuit/${tuit._id}`)}
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    tuit.postBy &&
                    <img src={`../images/${tuit.postBy.username}.jpg`}
                         className="ttr-tuit-avatar-logo rounded-circle"/>
                }
            </div>
            <div className="w-100">
                <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
                <Link to={`/tuit/${tuit._id}`}>
                    <i className="float-end fas fa-circle-ellipsis me-1"></i>
                </Link>
                <h2
                    className="fs-5">
                    {tuit.postBy && tuit.postBy.username}
                    @{tuit.postBy && tuit.postBy.username} -
                    <span className="ms-1">{daysOld(tuit)}</span></h2>
                {tuit.tuit}
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
                <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit}
                           Ilike={Ilike} Idislike={Idislike}
                           setIdislike={setIdislike} setIlike={setIlike}/>
            </div>
        </li>
    );
}
export default Tuit;