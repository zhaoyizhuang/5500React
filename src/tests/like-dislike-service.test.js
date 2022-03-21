import services, {createUser, deleteUsersByUsername} from "./services";
import {render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";
import axios from "axios";

describe('user dislike actions', () => {
    beforeAll(async () => {})
    afterAll(async () => {
        // await deleteUsersByUsername('test');
    })

    test('user dislikes new tuit', async () => {})
    test('user undislike a tuit', async () => {})
    test('user dislike a liked tuit', async () => {})

})