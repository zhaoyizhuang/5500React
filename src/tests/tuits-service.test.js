import {
    createTuit, deleteTuit, findTuitById, findAllTuits
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername, findAllUsers,
    findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const testUser = {
        username: 'test',
        password: 'testWord',
        email: 'test@test.com'
    };

    beforeAll(() => {

    })

    afterAll(() => {
        const p1 = deleteUsersByUsername(testUser.username);
    })


});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});