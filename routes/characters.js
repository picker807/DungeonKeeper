const express = require('express');
const router = express.Router();


const charController = require('../controllers/characters');

router.post('/', charController.createCharacter);
router.get('/', charController.getAllCharacters);
router.get('/:id', charController.getOneCharacter);
router.put('/:id', charController.updateCharacter);
router.delete('/:id', charController.deleteCharacter);

module.exports = router;