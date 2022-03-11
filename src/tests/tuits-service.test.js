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
        username: 'test1',
        password: 'testWord1',
        email: 'test1@test.com'
    };

    const testTuit = {
        "tuit": "test1 tuit"
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

    test('can create tuit with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
    const testUser = {
        username: 'test2',
        password: 'testWord2',
        email: 'test2@test.com'
    };

    const testTuit = {
        "tuit": "test2 tuit"
    }

    afterAll(async () => {
        return deleteUsersByUsername(testUser.username);
    })

    test('can delete tuit wtih REST API', async () => {
        // delete a tuit by tuit id.
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);
        const status = await deleteTuit(newTuit._id);

        // verify inserted tuit's properties match parameter tuit
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const testUser = {
        username: 'test3',
        password: 'testWord3',
        email: 'test3@test.com'
    };

    const testTuit = {
        "tuit": "test3 tuit"
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

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // insert new tuit in the database
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(testTuit.tuit);

        const existingTuit = await findTuitById(newTuit._id);

        expect(newTuit._id).toEqual(existingTuit._id);
        expect(existingTuit.tuit).toEqual(testTuit.tuit);
    });

});

describe('can retrieve all tuits with REST API', () => {

    // sample users we'll insert to then retrieve
    const usernames = [
        "t1", "t2", "t3"
    ];

    const tuits = [
        "tuit1", "tuit2"
    ];

    beforeAll(async () => {
        for (const u of usernames) {
            const newU = await createUser(
                {
                    username: u,
                    password: `${u}456`,
                    email: `${u}@test.com`
                }
            );
            for (const t of tuits) {
                await createTuit(newU._id, {tuit: t});
            }
        }
    }
    );

    afterAll(async () => {
        const users = await findAllUsers();
        const usersWeInserted = users.filter(
            user => usernames.indexOf(user.username) >= 0);
        for (const u of usersWeInserted) {
            await deleteTuitsByUser(u._id);
            await deleteUsersByUsername(u.username);
        }
    })

    test('can retrieve all tuits with REST API', async () => {
        const allTuits = await findAllTuits();

        expect(allTuits.length).toBeGreaterThanOrEqual(usernames.length * tuits.length);

        const newUsers = await Promise.all(usernames.map(
            async name => await findUserByUsername(name)
        ))

        let count = 0;
        newUsers.forEach(u => {
            tuits.forEach( t =>
                {
                    if (allTuits.find(
                        t1 => ((t1.postBy._id === u._id) && (t1.tuit === t))
                    )) count++;
                }
            )
        }
        )
        expect(count).toBeGreaterThanOrEqual(usernames.length * tuits.length);

    })

});