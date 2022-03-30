import services, {createUser} from "../services/users-service";
import {render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";
import axios from "axios";
import {createTuit, deleteTuitsByUser, deleteUsersByUsername} from "../services/tuits-service";
import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit
} from "../services/dislikes-service";
import {
    findAllTuitsLikedByUser,
    findAllUsersThatLikedTuit,
    userLikesTuit
} from "../services/likes-service";

describe('user dislike and like actions', () => {
    let tuitId;
    let uId;
    let prevCount1;
    let prevCount1Like;
    let prevCount2;
    let prevCount2Like;

    beforeAll(async () => {
        await deleteUsersByUsername('test');
        //create user
        const newU = await createUser(
            {
                username: 'test',
                password: `test`,
                email: `test`
            }
        ).then(data => uId = data._id);
        //create tuit
        const newTuit = await createTuit(uId, {tuit: "test"})
            .then(data => tuitId = data._id);

        //dislike tuit
        await userDislikesTuit(uId, tuitId);
        await userLikesTuit(uId, tuitId);
    })
    afterAll(async () => {
        //delete tuit
        await deleteTuitsByUser(uId);
        //delete user
        await deleteUsersByUsername('test');
    })

    test('the tuit is disliked and liked by the user', async () => {
        let count = 0;
        let countlike = 0;
        const userLikes = await findAllUsersThatLikedTuit(tuitId);
        for (const u of userLikes) {
            if (u.likedBy.username === 'test') {
                countlike++;
            }
        }
        //check if the user likes the tuit
        expect(countlike).toBeGreaterThanOrEqual(1);
        prevCount1Like = countlike;
        countlike = 0;

        const users = await findAllUsersThatDislikedTuit(tuitId);
        for (const u of users) {
            if (u.dislikedBy.username === 'test') {
                count++;
            }
        }
        //check if the user unlike the tuit
        expect(count).toBeGreaterThanOrEqual(1);
        prevCount1 = count;
        count = 0;

        const tuitsLike = await findAllTuitsLikedByUser(uId);
        for (const t of tuitsLike) {
            if (t.tuit === 'test') {
                countlike++;
            }
        }
        //check if the tuit is liked by the user.
        expect(countlike).toBeGreaterThanOrEqual(1);
        prevCount2Like = countlike;

        const tuits = await findAllTuitsDislikedByUser(uId);
        for (const t of tuits) {
            if (t.tuit === 'test') {
                count++;
            }
        }
        //check if the tuit is unliked by the user.
        expect(count).toBeGreaterThanOrEqual(1);
        prevCount2 = count;
    })

    test('user undislike a tuit', async () => {
        const s = await userDislikesTuit(uId, tuitId);
        const ss = await userLikesTuit(uId, tuitId);

        let count = 0;
        const userLike = await findAllUsersThatLikedTuit(tuitId);
        for (const u of userLike) {
            if (u.likedBy.username === 'test') {
                count++;
            }
        }
        //check if user unlikes the tuit
        expect(count).toBeLessThan(prevCount1Like);
        count = 0;

        const users = await findAllUsersThatDislikedTuit(tuitId);
        for (const u of users) {
            if (u.dislikedBy.username === 'test') {
                count++;
            }
        }
        //check if the user undislike the tuit
        expect(count).toBeLessThan(prevCount1);
        count = 0;

        const tuitLike = await findAllTuitsLikedByUser(uId);
        for (const t of tuitLike) {
            if (t.tuit === 'test') {
                count++;
            }
        }
        //the tuit is unliked by the user
        expect(count).toBeLessThanOrEqual(prevCount2Like);
        count = 0;

        const tuits = await findAllTuitsDislikedByUser(uId);
        for (const t of tuits) {
            if (t.tuit === 'test') {
                count++;
            }
        }
        //the tuit is undisliked by the user;
        expect(count).toBeLessThanOrEqual(prevCount2);
    })
})