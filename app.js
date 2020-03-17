const express = require('express');
const app = express();
const cors = require('cors');
const connection= require('./db/connect');

app.use(express.json());
app.use(cors());


app.post("/insert", async (req, res) => {
    try {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let age = req.body.age;
        const pool = await connection.pool.connect();
        let result = await pool.query('insert into student values($1,$2,$3,$4)', [id, name, email, age]);
        if (result.rowCount) {
            res.json({
                success: 1,
                message: 'inserted successfully..'
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            success:0,
            message:error.message
        });
    }
});

app.get("/getAllDetails", async (req, res) => {
    try {
        let pool = await connection.pool.connect();
        let result = await pool.query('select * from student order by id');
                
        if (result) {
            res.send(result["rows"]);
        }
    } catch (error) {
        console.log(error);
        res.send({
            success:0,
            message:error.message
        });
    }
});

app.get("/get/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let pool = await connection.pool.connect();
        let result = await pool.query('select * from student where id = $1',[id]);
        if (result) {
            res.send(result.rows[0]);
        }
    } catch (error) {``
        console.log(error);
        res.send({
            success:0,
            message:error.message
        });
    }
});

app.put("/update", async (req, res) => {
    try {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let age = req.body.age;
        let pool = await connection.pool.connect();
        if(name!==undefined){
            await pool.query('update student set name = $1 where id = $2',[name,id]);
        } 
        if(email!==undefined){
            await pool.query('update student set email = $1 where id = $2',[email,id]);
        } 
        if(age!==undefined){
            await pool.query('update student set age = $1 where id = $2',[age,id]);
        } 
        res.send({
            success:1,
            message:"updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.send({
            success:0,
            message:error.message
        });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let pool = await connection.pool.connect();
        await pool.query("delete from student where id = $1",[id]); 
        res.send({
            success:1,
            message:"deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.send({
            success:0,
            message:error.message
        });
    }
});

idCounter = 1;
userLsit = []
app.get('/user', (req, res)=>{
    res.send(userLsit);
})

app.get('/user/:id', )

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = idCounter++;
    userLsit.push(req.body);
    res.send()
})

app.put('/user/:id', (req, res) => {
    let id = userLsit.indexOf((x) => x.id === req.params.id);
    userLsit[id] = req.body;
    res.send('successfull');
})

app.delete('/user/:id', (req, res)=> {
    let id = userLsit.indexOf((x) => x.id === req.params.id);
    delete userLsit[id]
    res.send();
})

app.listen(5000, () => {
    console.log("Server running successfully at 5000");
});