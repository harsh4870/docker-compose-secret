const express = require('express')
const redis = require('redis')
const fs = require("fs");
const connection_string = fs.readFileSync(process.env.ConnectionStrings, 'utf8').trim();
const app = express()

console.log("connection_string",connection_string)
const client = redis.createClient(connection_string)
client.set('counts', 0);
app.get('/', (req, res) => {
    client.get('counts', (err, counts) => {
        res.send('Counts : ' + counts)
        client.set('counts', parseInt(counts) + 1)
    })
})

app.listen(8000, ()=>{
    console.log('Listening on port 8000')
})