const express = require('express');
const Item = require('../controller/itemcontroller');
const router = express.Router();

router.post('/item/addItem',Item.addItem)
router.post('/item/updateItem/:id',Item.updateItem)
router.get('/item/viewItem/:id',Item.viewItem)

module.exports = router;