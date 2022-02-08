const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

/** ROUTES */

// get all items
app.get("/item", async (req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM item_table");
        res.json(allItems.rows);
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
})

// get all IDs items
app.get("/item/idList", async (req, res) => {
    try {
        const allItems = await pool.query("SELECT id FROM item_table");
        res.json(allItems.rows);
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
})

// get item
app.get("/item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const retrievedItem = await pool.query("SELECT * FROM item_table WHERE id = $1", [id]);
        res.json(retrievedItem.rows);
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
})

// create item
app.post("/item", async (req, res) => {
    try {
        const { item, rate, quantity } = req.body;
        const newItem = await pool.query("INSERT INTO item_table (item, rate, quantity) VALUES ($1 ,$2 , $3) RETURNING *", [item, rate, quantity])
        res.json(newItem.rows);
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
});

// update item
app.put("/item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { item, rate, quantity } = req.body;
        let set = []
        let count = 0;
        let body = [];

        if (item) {
            count++;
            set.push(' item = $' + count);
            body.push(item)
        }
        if (rate) {
            count++;
            set.push(' rate = $' + count);
            body.push(rate)
        }
        if (quantity) {
            count++;
            set.push(' quantity = $'+ count);
            body.push(quantity)
        }

        count++;
        body.push(id)

        const url = "UPDATE item_table SET" + set.join(',') + " WHERE id = $" + count;
        await pool.query(url, body);
        res.json({ 'status': 200, 'message': 'Item has been updated' });
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
})

// delete item
app.delete("/item/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const retrievedItem = await pool.query("DELETE FROM item_table WHERE id = $1", [id]);
        res.json({ 'status': 200, 'message': 'Item has been deleted' });
    } catch (error) {
        res.json({ 'status': 500, 'message': error.message })
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log('server is listening on port 5000');
});