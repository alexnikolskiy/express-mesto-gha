const router = require('express').Router();
const { errorRouteController } = require('../controllers/errors');

router.all('/', errorRouteController);

module.exports = router;
