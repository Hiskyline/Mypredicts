const GRID = 25;
const MAX_HISTORY = 10000;

let history = [];

const stats = {
  totalGames: 0
};

function learnGame(game){
  history.push(game);

  if(history.length > MAX_HISTORY){
    history.shift();
  }

  stats.totalGames = history.length;
}

function getPrediction(mode, count){

  let bombCount = new Array(GRID).fill(0);

  history.forEach(g=>{
    g.mines.forEach(tile=>{
      bombCount[tile]++;
    });
  });

  let ranked = bombCount
    .map((v,i)=>({tile:i, score:v}))
    .sort((a,b)=>a.score-b.score)
    .map(x=>x.tile);

  if(mode === "Neural"){
    ranked = ranked.slice(2);
  }

  if(mode === "Quantum"){
    ranked = ranked.sort(()=>Math.random()-0.5);
  }

  return ranked.slice(0,count);
}

module.exports = { getPrediction, learnGame, stats };