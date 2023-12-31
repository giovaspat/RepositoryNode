import express from 'express';
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
    {
        id: 3,
        name: "Jupiter",
    },
    {
        id: 4,
        name: "Venus",
    },
    {
        id: 5,
        name: "Mercury",
    },
    {
        id: 6,
        name: "Uranus",
    },
    {
        id: 7,
        name: "Neptune",
    },
    {
        id: 8,
        name: "Saturn",
    },
];
app.get('/planets', (req, res) => {
    res.send(planets);
});
app.use(morgan("dev"));
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
