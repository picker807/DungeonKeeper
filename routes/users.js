const express = require('express');
const router = express.Router();
//const middleware = require("../middleware/middleware")

const userController = require('../controllers/users');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', //middleware.validateId,
    userController.getOneUser);
router.put('/:id', //middleware.validateId,
    userController.updateUser);
router.delete('/:id', //middleware.validateId,
    userController.deleteUser);

module.exports = router;