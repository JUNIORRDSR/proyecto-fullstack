const router = require('express').Router();
const { traducir } = require('../controllers/traducir.controller');


router.get('/traducir', traducir);

module.exports = router;