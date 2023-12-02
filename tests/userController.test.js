const request = require('supertest');
const app = require('../server'); // Path to your server entry point
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const db = require("../models");
const User = db.user;
const userController = require("../controllers/users");

let mongoServer; // Instance of MongoDB memory server
let server; // Express server instance
let id; // Variable to store the user ID for subsequent tests



describe('User Controller', () => {

    beforeEach(async () => {
        const mongod = new MongoMemoryServer();
        await mongod.start();
        const mongoUri = mongod.getUri();

        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        server = app.listen(); // Start the server

        // Create a user before each test
        const userData = {
            "githubId": "thisUsersID",
            "username": "ThisUSer",
            "email": "MyEmail@email.com"
        };
        const response = await request(server)
            .post('/user')
            .send(userData);

        expect(response.status).toBe(201);
        id = response.body._id; // Extracting the user ID from the response
    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        server.close(); // Close the server
    });

    it('should create a new user', async () => {

        const req = {
            body: {
                "githubId": "thisUsersID",
                "username": "ThisUSer",
                "email": "MyEmail@email.com"
            }
        };
        const res = { status: jest.fn(), send: jest.fn() };

        await userController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.body.githubId).toBe(newUser.githubId);
        expect(res.body.username).toBe(newUser.username);
        expect(res.body.email).toBe(newUser.email);
        
    });

    it('should get all users', async () => {

        const req = {};
        const res = { send: jest.fn() };
        //jest.spyOn(userController.User, 'find').mockResolvedValue([mockUser]);

        await userController.getAllUsers(req, res);

        expect(res.send).toHaveBeenCalledWith([]);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });

    it('should get a specific user by ID', async () => {

        const req = { params: { id: id } };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        //jest.spyOn(userController.User, 'findOne').mockResolvedValue(mockUser);

        await userController.getOneUser(req, res);

        expect(response.status).toBe(200);
        expect(response.body._id).toEqual(id.toString());
    });

    it('should update a user by ID', async () => {
        const updatedUserData = {
            githubId: "thisUsersID",
            username: "AnotherUser",
            email: "MyEmail@email.com"
        };
        const req = { params: { id: id }, body: updatedUserData };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        // Validate the updated user in the database
        const updatedUser = await User.findById(id);
        expect(updatedUser.username).toBe(updatedUserData.username);
    });

    it('should delete a user', async () => {
        const req = { params: { id: id } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        // Check that the user is not found in the database after deletion
        const deletedUser = await User.findById(id);
        expect(deletedUser).toBeNull(); 
        
    });

});
