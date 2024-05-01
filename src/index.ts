import express from "express";

const app = express();

app.use(express.json());

app.all("/player", async (req, res) => {});

app.listen(8080, () => {
    console.log("server started");
});
