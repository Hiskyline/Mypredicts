const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { getPrediction, learnGame, stats } = require("./ai/engine");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Extension fetches predictions
app.get("/api/ext/predictions", (req, res) => {
  const mode = req.query.mode || "AI_Mode";
  const count = parseInt(req.query.count || 5);

  const tiles = getPrediction(mode, count);

  res.json([{
    tile_array: tiles,
    games_analyzed: stats.totalGames
  }]);
});

// Extension sends finished game
app.post("/api/ext/game-result", (req, res) => {
  const { mines, mode, time } = req.body;

  if(!mines){
    return res.status(400).json({error:"Missing mines"});
  }

  learnGame({
    mines,
    mode: mode || "AI_Mode",
    time: time || Date.now()
  });

  res.json({status:"learned"});
});

// Simple health check
app.get("/api/health",(req,res)=>{
  res.json({status:"online", games:stats.totalGames});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Monarch AI Server running on port " + PORT);
});