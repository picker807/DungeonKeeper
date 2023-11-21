const express = require('express');
const router = express.Router();
//const middleware = require("../middleware/middleware");

const charController = require('../controllers/characters');

router.post('/', charController.createCharacter);
router.get('/', charController.getAllCharacters);
router.get('/:id', /*middleware.validateId,*/ charController.getOneCharacter);
router.put('/:id', /*middleware.validateId,*/ charController.updateCharacter);
router.delete('/:id', /*middleware.validateId,*/ charController.deleteCharacter);

module.exports = router;