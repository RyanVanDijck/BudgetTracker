const express = require('express')
const router = express.Router();

router.post('/addItem', async (req, res) => {
    await req.app.locals.database.addItem(req.body.name, req.body.cost,req.body.categories);
    res.redirect('/');
})


module.exports = router; 