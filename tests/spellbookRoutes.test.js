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

    const sbData = {
        name: "ThisSpellBook",
    };

    const response = await request(app)
        .post('/spellbook')
        .expect("Content-Type", /json/)
        .send(sbData)
    id = response.body._id;
    
});

afterAll(async () => {
    jest.setTimeout(20000)
    await mongo.stop();
    await mongoose.connection.close();
});

describe('Spellbook Routes', () => {

    test('it should create a new spellbook', async () => {
        const sbData = {
            name: "Gilbert's Spellbook"
        };

        const response = await request(app)
            .post('/spellbook')
            .send(sbData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.status).toBe(201);
        id = response.body._id;
        expect(response.body.name).toBe(sbData.name);
        

    });

    test('it should get all spellbooks', async () => {
        const response = await request(app)
            .get('/spellbook');

        expect(response.status).toBe(200);
    });

    test('it should get a specific spellbook by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .get(`/spellbook/${id}`);

        expect(response.status).toBe(200);
    });

    test('it should update a spellbook by ID', async () => {
        expect(id).toBeDefined();
        const updatedSbData = {
            name: "BlackMagic"
        };
        const response = await request(app)
            .put(`/spellbook/${id}`)
            .send(updatedSbData);
        expect(response.status).toBe(204);

        const checkUpdate = await request(app).get(`/spellbook/${id}`);
        expect(checkUpdate.body[0].name.toLowerCase()).toBe(updatedSbData.name.toLowerCase())

    });

    test('it should delete a spellbook by ID', async () => {
        expect(id).toBeDefined();
        const response = await request(app)
            .delete(`/spellbook/${id}`);

        expect(response.status).toBe(200);
    });
});
