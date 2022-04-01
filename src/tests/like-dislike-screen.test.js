import {render, screen} from "@testing-library/react";
import {HashRouter, Route} from "react-router-dom";
import Profile from "../components/profile";
import {createUser} from "../services/users-service";
import {deleteUsersByUsername, createTuit, deleteTuitsByUser, findUserByUsername} from "../services/tuits-service";
import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit
} from "../services/dislikes-service";
import TuitStats from "../components/tuits/tuit-stats";
import MyTuits from "../components/profile/my-tuits";
import React from "react";
import {act, create} from "react-test-renderer";
import Tuits from "../components/tuits";
test('dislike button in profile', async () => {
    render(
        <HashRouter>
            <Profile />
        </HashRouter>);
    const dislikes = screen.getByText(`Dislikes`);
    expect(dislikes).toBeInTheDocument();
    const likes = screen.getByText(`Likes`);
    expect(likes).toBeInTheDocument();
})

describe('like-dislike screen', () => {
    let tuitsData = [{"_id": "123", "postBy": {"username": "NASA"}, "stats": {"dislikes": 123456}},
        {"_id": "234", "postBy": {"username": "345"}, "stats": {"likes": 45645}}]
    test('disliked tuits are shown in the dislike-screen', async () => {
        let tuits

        act(() => {
            tuits = create(
                <HashRouter>
                    <Tuits
                        tuits={tuitsData}
                        refreshTuits={() => {}}
                    />
                </HashRouter>
            )
        })
        const root = tuits.root;
        const tuitItems = root.findAllByProps({className: 'the-tuit'})
        expect(tuitItems.length).toBe(tuitsData.length)
        const likes = root.findAllByProps({className: 'ttr-stats-likes'})
        const dislikes = root.findAllByProps({className: 'ttr-stats-dislikes'})

        //every like or dislike tuit should only occur once.
        let count = 0;
        for (const l of likes) {
            if (l.children[0] === '45645') {
                count++;
            }
        }
        expect(count).toBe(1);

        count = 0;
        for (const l of dislikes) {
            if (l.children[0] === '123456') {
                count++;
            }
        }
        expect(count).toBe(1);

        const tuitLis = root.findAllByProps({className: 'list-group-item'})
    })
})


