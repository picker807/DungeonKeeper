const request = require('supertest');
const app = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let id;




describe('User Routes', () => {

    beforeEach(async () => {
        mongod = new MongoMemoryServer();
        await mongod.start();
        const mongoUri = mongod.getUri();

        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        server = app.listen(); // Start the server

        // Perform setup tasks before each test
        const userData = {
            "githubId": "thisUsersID",
            "username": "ThisUSer",
            "email": "MyEmail@email.com"
        };
        const response = await request(server)
            .post('/user')
            .send(userData);

        expect(response.status).toBe(201);
        id = response.body._id;
    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongod.stop();
        server.close(); // Close the server
    });

    it('should create a new user', async () => {
        const userData = {
            "githubId": "thisUsersID",
            "username": "ThisUSer",
            "email": "MyEmail@email.com"
        };
        const response = await request(app)
            .post('/user')
            .send(userData);

        expect(response.status).toBe(201);
        id = response.body._id;
        
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/user');

        expect(response.status).toBe(200);
    });

    it('should get a specific user by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .get(`/user/${id}`);

        expect(response.status).toBe(200);
    });

    it('should update a user by ID', async () => {
        expect(id).toBeDefined();
        const updatedUserData = {
            "githubId": "thisUsersID",
            "username": "AnotherUserName",
            "email": "MyEmail@email.com"
};
        const response = await request(app)
            .put(`/user/${id}`)
            .send(updatedUserData);

        expect(response.status).toBe(204);
    });

    it('should delete a user by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .delete(`/user/${id}`);

        expect(response.status).toBe(200);
    });
});
