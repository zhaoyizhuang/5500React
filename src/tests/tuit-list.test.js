import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import Tuit from "../components/tuits/tuit";

import {createUser} from "../services/users-service";
import * as service from "../services/tuits-service";

const MOCKED_USERS = [
    'alice', 'bob', 'charlie'
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const deleteTuit = (tid) => {}

describe('tuit list renders static tuit array',  () => {
    const MockedTuits = [
        {_id: "123", postBy: {username: "alice"}, tuit: "alice's tuit"},
        {_id: "456", postBy: {username: "bob"}, tuit: "bob's tuit"},
        {_id: "789", postBy: {username: "charlie"}, tuit: "charlie's tuit"}
    ]

    test('tuit list renders static tuit array', () => {
        // TODO: implement this
        render(
            <HashRouter>
                <Tuits tuits={MockedTuits} deleteTuit={deleteTuit}/>
            </HashRouter>);

        MOCKED_TUITS.forEach(t => {
            const e = screen.getByText(`${t}`);
            expect(e).toBeInTheDocument();
        })

    });
});



test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>);

    const tuit = screen.getByText("xx@xx -");
    expect(tuit).toBeInTheDocument();
    const user = screen.getByText("xxxxx");
    expect(user).toBeInTheDocument();
})

//jest.mock('axios');
test('tuit list renders mocked', async () => {
  // TODO: implement this
});
