const express = require('express')
const router = express.Router();

router.post('/addItem', (req, res) => {
    req.app.locals.database.addItem(req.body.name, req.body.cost);
    res.redirect('/');
})


module.exports = router; 