const express = require("express");
const axios = require("axios");

const app = express();

// مثال روابط (سنغيرها لاحقًا)
const streams = {
    "123": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
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
