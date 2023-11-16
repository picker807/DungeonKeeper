var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const middleware = require("../middleware/middleware");


router
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    //.use('/users', require('./routes/users' ))
    //.use('/characters', require('./routes/characters'))
    .use('/spells', require('./spells'))
    //.use('/spellbooks', require('./routes/spellbooks'))

module.exports = router;
