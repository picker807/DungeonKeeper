const express = require('express');
const router = express.Router();
//const middleware = require("../middleware/middleware")

const spellController = require('../controllers/spells');

router.post('/', spellController.createSpell);
router.get('/', spellController.getAllSpells);
router.get('/:id', //middleware.validateId,
    spellController.getOneSpell);
router.put('/:id', //middleware.validateId,
    spellController.updateSpell);
router.delete('/:id', //middleware.validateId,
    spellController.deleteSpell);

module.exports = router;