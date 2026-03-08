const GRID_SIZE = 25
const MAX_HISTORY = 10000

let history = []

const stats = {
  totalGames: 0
}

function learnGame(game){

  history.push(game)

  if(history.length > MAX_HISTORY){
    history.shift()
  }

  stats.totalGames = history.length
}

function calculateScores(){

  let scores = new Array(GRID_SIZE).fill(0)

  history.forEach(game=>{

    game.mines.forEach(tile=>{
      scores[tile] += 3
    })

    // cluster detection
    game.mines.forEach(tile=>{

      const neighbors = [
        tile-1,
        tile+1,
        tile-5,
        tile+5
      ]

      neighbors.forEach(n=>{
        if(n >= 0 && n < GRID_SIZE){
          scores[n] += 1
        }
      })

    })

  })

  return scores
}

function getPrediction(mode,count){

  let scores = calculateScores()

  let tiles = scores
  .map((v,i)=>({tile:i,score:v}))
  .sort((a,b)=>a.score-b.score)
  .map(t=>t.tile)

  if(mode === "Neural"){
    tiles = tiles.slice(2)
  }

  if(mode === "Quantum"){
    tiles = tiles.sort(()=>Math.random()-0.5)
  }

  return tiles.slice(0,count)
}

module.exports = {
  getPrediction,
  learnGame,
  stats
}
