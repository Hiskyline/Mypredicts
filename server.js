const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const { getPrediction, learnGame, stats } = require("./ai/engine")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"public","dashboard.html"))
})

app.get("/api/ext/predictions",(req,res)=>{

  const mode = req.query.mode || "AI_Mode"
  const count = parseInt(req.query.count || 5)

  const tiles = getPrediction(mode,count)

  res.json([
    {
      tile_array: tiles,
      games_analyzed: stats.totalGames
    }
  ])

})

app.post("/api/ext/game-result",(req,res)=>{

  const { mines, mode, time } = req.body

  learnGame({
    mines,
    mode,
    time
  })

  res.json({status:"learned"})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Monarch AI server running")
})
