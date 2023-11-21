const express = require('express');
const router = express.Router();
//const middleware = require("../middleware/middleware");

const spellbookController = require('../controllers/spellbooks');

router.post('/', spellbookController.createSpellbook);
router.get('/', spellbookController.getAllSpellbooks);
router.get('/:id', /*middleware.validateId,*/ spellbookController.getOneSpellbook);
router.put('/:id', /*middleware.validateId,*/ spellbookController.updateSpellbook);
router.delete('/:id', /*middleware.validateId,*/ spellbookController.deleteSpellbook);

module.exports = router;