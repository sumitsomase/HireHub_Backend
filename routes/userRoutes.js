const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/user', getUser);
router.put('/user', updateUser);

module.exports = router;
