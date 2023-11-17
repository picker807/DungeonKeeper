const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

router.get("/api-docs", swaggerUi.setup(swaggerDoc));
router.use("/api-docs", swaggerUi.serve);

module.exports = router;
