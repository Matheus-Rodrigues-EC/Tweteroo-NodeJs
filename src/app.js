import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
let users = [];
let tweetList = [];

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if(((typeof(username) !== 'string') || username.length === 0) || ((typeof(avatar) !== 'string') || avatar.length === 0)){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }
    if(!users.find((profile) => profile.username === username)) users.push({username, avatar});
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const  {username, tweet} = req.body;
    if(((typeof(username) !== 'string') || username.length === 0) || ((typeof(tweet) !== 'string') || tweet.length === 0)){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }
    if(users.find((profile) => profile.username === username)){
        tweetList.push({username, tweet});
        res.status(201).send("OK");    
    }else{
        res.status(401).send("UNAUTHORIZED");
    }
})

app.get("/tweets", (req, res) => {
    if(tweetList.length <= 10){
        const lastedTweets = [];
        for (let i = 0; i < tweetList.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if(tweetList[i].username === users[j].username){
                    const username = tweetList[i].username;
                    const avatar = users[j].avatar;
                    const tweet = tweetList[i].tweet;
                    lastedTweets.push({username, avatar, tweet});
                }
            }
        }
        res.status(200).send(lastedTweets);
    }else{
        const lastedTweets = [];
        for (let i = tweetList.length - 10; i < tweetList.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if(tweetList[i].username === users[j].username){
                    const username = tweetList[i].username;
                    const avatar = users[j].avatar;
                    const tweet = tweetList[i].tweet;
                    lastedTweets.push({username, avatar, tweet});
                }
            }
        }
        res.status(200).send(lastedTweets);
    }
})