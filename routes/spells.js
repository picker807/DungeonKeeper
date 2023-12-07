const express = require("express");
const router = express.Router();

const spellController = require("../controllers/spells");

router.post("/", spellController.createSpell);
router.get('/', spellController.getAllSpells);
router.get("/:id", spellController.getOneSpell);
router.put("/:id", spellController.updateSpell);
router.delete("/:id", spellController.deleteSpell);

module.exports = router;
