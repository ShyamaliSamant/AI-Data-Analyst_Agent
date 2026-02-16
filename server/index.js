const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */

// Upload Route
const uploadRoute = require("./routes/upload");
app.use("/upload", uploadRoute);

// Test AI Route (GET for browser test)
app.get("/api/test-ai", async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/analyze",
            { question: "Tell me about sales" }
        );

        res.json(response.data);
    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({
            error: "AI service error",
            details: error.response?.data || error.message
        });
    }
});

// Real AI Route (for frontend)
app.post("/api/ask-ai", async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/analyze",
            { question: req.body.question }
        );

        res.json(response.data);
    } catch (error) {
        console.error("FULL ERROR:", error.response?.data || error.message);
        res.status(500).json({
            error: "AI service error",
            details: error.response?.data || error.message
        });
    }
});

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

/* ---------------- DATABASE + SERVER ---------------- */

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));

