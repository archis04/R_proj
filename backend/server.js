require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());


const upload = multer({ storage: multer.memoryStorage() });

app.post("/get-price", upload.single("file"), async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;
        const apiUrl = "YOUR_API_URL_HERE";

        
        const response = await axios.post(apiUrl, imageBuffer, {
            headers: { "Content-Type": "image/jpeg" }
        });

        res.json({ price: response.data.price });
    } catch (error) {
        res.status(500).json({ error: "Error fetching price" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
