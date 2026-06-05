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

app.get("/watch/:id", async (req, res) => {

    const id = req.params.id;
    const url = streams[id];

    if (!url) {
        return res.status(404).send("Stream not found");
    }

    try {
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });

        res.setHeader("Content-Type", "video/mp2t");

        response.data.pipe(res);

    } catch (err) {
        res.status(500).send("Error loading stream");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Proxy running on port " + PORT);
});
