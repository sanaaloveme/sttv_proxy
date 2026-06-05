const express = require("express");
const axios = require("axios");
const SECRET_TOKEN = "MY_SECRET_123";

const app = express();

// مثال روابط (سنغيرها لاحقًا)
const streams = {
    "123": "http://clubsmartlive.com:80/live/rYTCg4asp/twJ15X9a/44392.ts"
};

app.get("/", (req, res) => {
    res.send("Proxy Server is Running 🚀");
});

app.get("/watch/:id", (req, res) => {

    const id = req.params.id;
    const url = streams[id];

    if (!url) {
        return res.status(404).send("Not found");
    }

    // نرسل المستخدم مباشرة للمصدر
    res.redirect(url);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Proxy running on port " + PORT);
});
