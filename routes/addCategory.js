const express = require('express')
const router = express.Router();

router.post('/category', async (req, res) => {
    await req.app.locals.database.addCategory(req.body.category)
    res.redirect('/')
})

module.exports = router