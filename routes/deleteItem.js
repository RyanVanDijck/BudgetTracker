const express = require('express')
const router = express.Router();

router.delete('/item/:id', async (req, res) => {
    await req.app.locals.database.deleteItem(req.params.id); 
    res.redirect('/'); 
})

module.exports = router; 