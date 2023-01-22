import jsonData from './world.geo.json-master/countries.geo.json' assert { type: "json" }
var pays = new Array()
jsonData.features.forEach((item)=>{
    pays.push(item.properties.name)
})

const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());

var paths = document.querySelector('#map').querySelector("g").querySelectorAll('.country');
console.log(paths)
paths.forEach((path)=>{
    path.addEventListener("click",(e)=>{
        console.log(e.target.id)
        if (e.target.id == answer) {
            alert("win")
            score ++ 
            scoreDisplay.innerHTML = score
            generate()
        }
    })
})

var answer = ""
let prompt = document.getElementById("prompt")
let btn = document.getElementById('start')
let scoreDisplay = document.getElementById('score')
let skip = document.getElementById('skip')
let score = 0
btn.addEventListener('click',(e)=>{
    startGame()
    generate()
})

skip.addEventListener('click',(e)=>{
    generate()
})

function generate() {
    pays = shuffle(pays)
    answer = pays[0]
    prompt.innerHTML = answer
}

function startGame(){
    score = 0
    scoreDisplay.innerHTML = score
}










