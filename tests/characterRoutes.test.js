const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const router = require('../routes');
const app = express();

app.use(express.json());
app.use('/', router);


let id;
let mongo;
beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, { dbName: "testDb" });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }

    const charData = {
        name: "Evil Walrus",
        class: "Paladin",
        level: 5,
        spellbook: ""
    };

    const response = await request(app)
        .post('/character')
        .expect("Content-Type", /json/)
        .send(charData);

    console.log("beforeEach POST response: ", response.body);

    id = response.body._id;
  
});

afterAll(async () => {
    jest.setTimeout(20000)
    await mongo.stop();
    await mongoose.connection.close();
});

describe('Character Routes', () => {

    test('it should create a new character', async () => {
        const charData = {
            name: "Evil Walrus",
            class: "Paladin",
            level: 5,
            spellbook: ""
        };

        const response = await request(app)
            .post('/character')
            .send(charData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.status).toBe(201);
        id = response.body._id;
        expect(response.body.name).toBe(charData.name);
        expect(response.body.level).toBe(charData.level);

    });

    test('it should get all characters', async () => {
        const response = await request(app)
            .get('/character');

        expect(response.status).toBe(200);
    });

    test('it should get a specific character by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .get(`/character/${id}`);

        expect(response.status).toBe(200);
    });

    test('it should update a character by ID', async () => {
        expect(id).toBeDefined();
        const charData = {
            name: "Evil Walrus",
            class: "Pollywog",
            level: 5,
            spellbook: ""
        };
        const response = await request(app)
            .put(`/character/${id}`)
            .send(charData);
        expect(response.status).toBe(204);

        checkUpdate = await request(app).get(`/character/${id}`);
        //console.log("checkUpdate: ", checkUpdate);
        expect(checkUpdate.body[0].class.toLowerCase()).toBe(charData.class.toLowerCase())

    });

    test('it should delete a character by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .delete(`/character/${id}`);

        expect(response.status).toBe(200);
    });
});