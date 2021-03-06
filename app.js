const methodOverride = require('method-override')
const express = require('express')
const app = express()
const port = 3000

const addItemRouter = require('./routes/addItem.js')
const deleteItemRouter = require('./routes/deleteItem.js')
const addCategoryRouter = require('./routes/addCategory.js')

const Database = require('./src/database.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use('/',addItemRouter); 
app.use('/', deleteItemRouter);
app.use('/', addCategoryRouter); 


app.listen(port, () => {
    app.locals.database = new Database(); 
    console.log(`App listening at http://localhost:${port}`)
})

app.get('/', async (req,res) => {
    const data = await app.locals.database.getItems()
    const categories = await app.locals.database.getCategories(); 
    const totals = await app.locals.database.getCategoryTotals();
    const total = await app.locals.database.getTotal(); 
    res.render('index', {
        items: data.rows,
        categories: categories.rows,
        categoryTotals: totals,
        total: total 
    }); 
})


  