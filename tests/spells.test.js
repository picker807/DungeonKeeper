// spells.test.js
const request = require("supertest");
const app = require("../server");
const spells = require("../models/spell");
const { mockSpells, newSpell } = require("./mockData");

describe("GET /spells", () => {
  test("should return all spells", async () => {
    jest.spyOn(spells, "find").mockResolvedValue(mockSpells);

    const response = await request(app).get("/spells");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSpells);
  });
});

describe("POST /spells", () => {
  test("Creates new spell", async () => {
    const response = await request(app)
      .post("/spells")
      .send(newSpell)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newSpell.name);
    expect(response.body.school).toBe(newSpell.school);
    expect(response.body.components).toEqual(newSpell.components);
    expect(response.body.level).toBe(newSpell.level);
    expect(response.body.range).toBe(newSpell.range);
    expect(response.body.areaOfEffect).toBe(newSpell.areaOfEffect);
    expect(response.body.save).toBe(newSpell.save);
    expect(Number(response.body.castingTime)).toBe(newSpell.castingTime);
    expect(response.body.duration).toBe(newSpell.duration);
    expect(response.body.description).toBe(newSpell.description);
  }, 20000);
});

describe("GET /spells/:id", () => {
  test("GET spell by Id", async () => {
    const validSpellId = "65556d69a6267eddc64bb67d";

    jest.spyOn(spells, "find").mockResolvedValue(mockSpells);

    const response = await request(app).get(`/spells/${validSpellId}`);

    expect(response.status).toBe(200);
    expect(spells.find).toHaveBeenCalledWith({ _id: validSpellId });
  });
});

describe("PUT /spells/:id", () => {
  test("it should update a spell by ID", async () => {
    const validSpellId = "65556d69a6267eddc64bb67d";

    const updatedSpellData = {
      name: "Blindness",
    };

    const response = await request(app)
      .put(`/spells/${validSpellId}`)
      .send(updatedSpellData);

    expect(response.status).toBe(204);

    const checkUpdate = await request(app).get(`/spells/${validSpellId}`);
    expect(checkUpdate.body[0].name.toLowerCase()).toBe(
      updatedSpellData.name.toLowerCase()
    );
  });
});

describe("DELETE /spells/:id", () => {
  test("it should delete a spell by ID", async () => {
    const validSpellId = "65556d69a6267eddc64bb67d";

    const response = await request(app).delete(`/spells/${validSpellId}`);

    expect(response.status).toBe(200);
  });
});
