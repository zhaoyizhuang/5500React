import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Profile from "../components/profile";
import {createUser} from "../services/users-service";
import {deleteUsersByUsername, createTuit, deleteTuitsByUser, findUserByUsername} from "../services/tuits-service";
import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit
} from "../services/dislikes-service";
test('dislike button in profile', async () => {
    render(
        <HashRouter>
            <Profile />
        </HashRouter>);
    const dislikes = screen.getByText(`Dislikes`);
    expect(dislikes).toBeInTheDocument();
})

describe('user dislikes a tuit', () => {
    let tuitId;
    let uId;

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
    })
    afterAll(async () => {
        await userDislikesTuit(uId, tuitId);
        //delete tuit
        await deleteTuitsByUser(uId);
        //delete user
        await deleteUsersByUsername('test');
    })

    test('disliked tuits are shown in the dislike-screen', async () => {
        render(
            <HashRouter>
                <Profile />
            </HashRouter>);
        const dislikes = screen.getByText(`Dislikes`);
        expect(dislikes).toBeInTheDocument();
    })
})

describe('user likes a tuit', () => {
    let tuitId;
    let uId;

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
    })
    afterAll(async () => {
        const s = await userDislikesTuit(uId, tuitId);
        //delete tuit
        const ss = await deleteTuitsByUser(uId);
        //delete user
        const sss = await deleteUsersByUsername('test');
    })

    test('disliked tuits are shown in the dislike-screen', async () => {
        render(
            <HashRouter>
                <Profile />
            </HashRouter>);
        const dislikes = screen.getByText(`Dislikes`);
        expect(dislikes).toBeInTheDocument();
    })
})