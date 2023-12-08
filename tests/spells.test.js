const request = require("supertest");
const app = require("../server");
const { mockSpells, newSpell } = require("./mockData");
const Spell = require("../models/spell");

describe("GET /spells", () => {
  test("should return all spells", async () => {
    jest.spyOn(Spell, "find").mockResolvedValue(mockSpells);

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
    // ... (other expectations)
  }, 20000);
});

describe("GET /spells/:id", () => {
  test("GET spell by Id", async () => {
    const validSpellId = "65556d69a6267eddc64bb67d";

    jest.spyOn(Spell, "findById").mockResolvedValue(mockSpells[0]);

    const response = await request(app).get(`/spells/${validSpellId}`);

    expect(response.status).toBe(200);
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

    const checkUpdate = await Spell.findById(validSpellId);
    expect(checkUpdate.name.toLowerCase()).toBe(
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
