import {act, create} from 'react-test-renderer';
import services, {createUser} from "../services/users-service";
import {queryAllByText, render, screen} from "@testing-library/react";
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
import Tuit from "../components/tuits/tuit";
import TuitStats from "../components/tuits/tuit-stats";
import Profile from "../components/profile";
import React from "react";

describe('user dislike and like API endpoints', () => {
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

describe('user dislike and like UI', () => {
    const MockTuit = {_id: "123", postBy: {username: "alice"}, tuit: "alice's tuit",
        stats: { replies: 0, retuits: 0, likes: 13123, dislikes: 21123 }};

    test('UI of a liked tuit', async () => {
        render(
            <HashRouter>
                <TuitStats tuit={MockTuit}
                           Ilike={true} Idislike={false}/>
            </HashRouter>);
        let dislikes = screen.getByText(`21123`);
        expect(dislikes).toHaveClass("ttr-stats-dislikes");
        expect(dislikes.parentElement.firstChild).toHaveStyle("color: #D3D6F1");
        let likes = screen.getByText('13123');
        expect(likes).toHaveClass("ttr-stats-likes");
        expect(likes.parentElement.firstChild).toHaveStyle("color: red");
    });

    test('UI of a disliked tuit', async () => {
        render(
            <HashRouter>
                <TuitStats tuit={MockTuit}
                           Ilike={false} Idislike={true}/>
            </HashRouter>);
        let dislikes = screen.getByText(`21123`);
        expect(dislikes).toHaveClass("ttr-stats-dislikes");
        expect(dislikes.parentElement.firstChild).toHaveStyle("color: black");
        let likes = screen.getByText('13123');
        expect(likes).toHaveClass("ttr-stats-likes");
        expect(likes.parentElement.firstChild).toHaveStyle("color: #D3D6F1");
    });

    test('User clicks the like button', async () => {
        let stats = {
            likes: 123
        }

        const likeTuit = () => {
            act(() => {
                stats.likes++;
                tuitStats.update(
                    <TuitStats
                        tuit={{stats: stats}}
                        Ilike={true}
                        Idislike={false}
                        setIlike={() => {}}
                        setIdislike={() => {}}
                        likeTuit={() => {}}
                    />)
            })
        }

        let tuitStats
        act(() => {
            tuitStats = create(
                <TuitStats
                    likeTuit={likeTuit}
                    Ilike={false}
                    Idislike={false}
                    setIlike={() => {}}
                    setIdislike={() => {}}
                    tuit={{stats: stats}}/>
            );
        })

        const root = tuitStats.root;
        const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
        const likeTuitButton = root.findByProps(
            {className: 'ttr-like-tuit-click'})
        const thumb = root.findByProps({className: "fa-solid fa-thumbs-up"})

        expect(thumb.props.style.color).toBe('#D3D6F1' )
        let likesText = likesCounter.children[0];
        expect(likesText).toBe('123');

        act(() => {likeTuitButton.props.onClick()})
        likesText = likesCounter.children[0];
        expect(likesText).toBe('124');
        expect(thumb.props.style.color).toBe('red' )
    });

    test('User clicks the dislike button', async () => {
        let stats = {
            dislikes: 123
        }

        const dislikeTuit = () => {
            act(() => {
                stats.dislikes++;
                tuitStats.update(
                    <TuitStats
                        tuit={{stats: stats}}
                        Ilike={false}
                        Idislike={true}
                        setIlike={() => {}}
                        setIdislike={() => {}}
                        likeTuit={() => {}}
                    />)
            })
        }

        let tuitStats
        act(() => {
            tuitStats = create(
                <TuitStats
                    likeTuit={() => {}}
                    dislikeTuit={dislikeTuit}
                    Ilike={false}
                    Idislike={false}
                    setIlike={() => {}}
                    setIdislike={() => {}}
                    tuit={{stats: stats}}/>
            );
        })

        const root = tuitStats.root;
        const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
        const dislikeTuitButton = root.findByProps(
            {className: 'ttr-dislike-tuit-click'})
        const thumb = root.findByProps({className: "fa-solid fa-thumbs-down"})

        expect(thumb.props.style.color).toBe('#D3D6F1' )
        let dislikesText = dislikesCounter.children[0];
        expect(dislikesText).toBe('123');

        act(() => {dislikeTuitButton.props.onClick()})
        dislikesText = dislikesCounter.children[0];
        expect(dislikesText).toBe('124');
        expect(thumb.props.style.color).toBe('black' )
    });
})