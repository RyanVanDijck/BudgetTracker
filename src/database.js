const { query } = require('express')
const {Pool}  = require('pg')
require('dotenv').config()

class Database{
    constructor(){
        this.pool = new Pool({
            database: process.env.DATABASE, 
            user: process.env.DATABASE_USER, 
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
            host: 'localhost'
        })
    }

    async addItem(name, cost, categoryID){
        const query = "INSERT INTO items(name,cost, categoryID) VALUES ($1, $2, $3)"
        const values = [name, cost, categoryID]
        try {
            const res = await this.pool.query(query, values)
          } catch (err) {
            console.log(err.stack)
          } 
    }
    async getItems(){
        return await this.pool.query("select items.id,items.name,items.cost,categories.name as cname from items inner join categories on categoryid = categories.id"); 
    }

    async deleteItem(id){
        await this.pool.query(`DELETE FROM items WHERE id=${id}`) 
    }

    async getCatagoryNameByID(id){
        return await(this.pool.query(`SELECT name FROM category WHERE id=${id}`))
    }

    async getCategories(){
        return await(this.pool.query("SELECT * FROM categories")); 
    }

    async addCategory(category){
        const query = "INSERT INTO categories(name) VALUES ($1)"
        category = [category]
        try {
            const res = await this.pool.query(query, category)
          } catch (err) {
            console.log(err.stack)
          } 
    }

    async getCategoryTotals(){
        const data =  await this.pool.query("select * from categories left join(select categoryid, sum(cost) from items group by categoryid) as test on categoryid = categories.id")
        return data.rows
    }

    async getTotal(){
        const data = await this.pool.query("SELECT sum(cost) from items");
        return data.rows[0].sum;
    }
}

module.exports = Database