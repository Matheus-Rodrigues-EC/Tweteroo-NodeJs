import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
let user = {};
let users = [];
let tweetList = [];

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

app.post("/sign-up", (req, res) => {
    user = req.body;
    if(!users.find((profile) => profile.username === user.username)) users.push(user);
    res.status(201).send("OK");
})
