const express = require('express');
const router = express.Router();

const spellbookController = require('../controllers/spellbooks');

router.post('/', spellbookController.createSpellbook);
router.get('/', spellbookController.getAllSpellbooks);
router.get('/:id', spellbookController.getOneSpellbook);
router.put('/:id', spellbookController.updateSpellbook);
router.delete('/:id', spellbookController.deleteSpellbook);

module.exports = router;