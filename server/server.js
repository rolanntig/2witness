// express server
const express = require('express');
const app = express();

//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get("/handelser", (req, res) => {
    prisma.handelser.findMany().then((data) => {
        res.json(data);
    });
});

//server listen
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);