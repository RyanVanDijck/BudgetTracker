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

    async addItem(name, cost){
        const query = "INSERT INTO ITEMS(name,cost) VALUES ($1, $2)"
        const values = [name, cost]
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
}

module.exports = Database