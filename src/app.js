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

app.post("/tweets", (req, res) => {
    let user = req.body.username;
    if(users.find((profile) => profile.username === user)){
        const tweet = req.body;
        tweetList.push(tweet);
        res.status(201).send("OK");    
    }else{
        res.status(401).send("UNAUTHORIZED");
    }
})

app.get("/tweets", (req, res) => {
    if(tweetList.length <= 10){
        res.status(200).send(tweetList);
    }else{
        const lastedTweets = [];
        for (let i = tweetList.length - 10; i < tweetList.length; i++) {
            lastedTweets.push(tweetList[i]);
        }
        res.status(200).send(lastedTweets);
    }
})