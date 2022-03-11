import {
    createTuit, deleteTuit, findTuitById,
    findAllTuits, findUserByUsername,
    deleteTuitsByUser
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

    const testTuit = {
        "tuit": "test tuit"
    }

    beforeAll(async () => {
        //find all user called test
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testUser.username === user.username);
        //delete all tuits by their uid
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(async () => {
        const users = await findAllUsers();
        const testUsers = users.filter(
            user => testUser.username === user.username);
        for (const u of testUsers) {
            await deleteTuitsByUser(u._id);
        }
        return deleteUsersByUsername(testUser.username);
    })

    test('can insert new tuit with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
    const testUser = {
        username: 'test',
        password: 'testWord',
        email: 'test@test.com'
    };

    const testTuit = {
        "tuit": "test tuit"
    }

    afterAll(async () => {
        return deleteUsersByUsername(testUser.username);
    })

    test('can insert new tuit with REST API', async () => {
        // delete a tuit by tuit id.
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);
        const status = await deleteTuit(newTuit._id);

        // verify inserted tuit's properties match parameter tuit
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});