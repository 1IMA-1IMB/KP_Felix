// Global Variables 

let avocados = 0
let ammountperclick = 1
let afs = 0

//Auto farm variables 

//Autofarm: 

let acfarms = 0
let acprice = 10
let afcs = 0

//Stores: 

let astores = 0
let asprice = 500
let assecond = 0

// twox Variables

let tenxbought = 0

// 3 times autofarms

let threxaf = 0


function addavocado(){
    avocados += ammountperclick
    document.getElementById('ammount').innerHTML = `Avocado's: ${avocados}`
}

setInterval(() => {

    // Global: 

    afs = assecond+afcs
    document.getElementById('apers').innerHTML = `Avocado's per second: ${afs}`
    document.title = `${avocados}`
    document.getElementById('ammount').innerHTML = `Avocado's: ${avocados}`

    //Auto farm: 

    document.getElementById('acfa').innerHTML = `${acfarms}`
    document.getElementById('acfprice').innerHTML = `Price: ${acprice}`

    // Avocado Stores: 

    document.getElementById('asprice').innerHTML = `Price: ${asprice}`
    document.getElementById('asa').innerHTML = `${astores}`
    // 10x:

    if(tenxbought == 1){
        document.getElementById('2xprice').innerHTML = `Sold out!`
    } if (threxaf == 1){
        document.getElementById('3xafprice').innerHTML = `Sold out!`
    }
}, 100)

setInterval(() => {
    avocados += afcs 
    avocados += assecond
}, 1000)


// autofarms:  

function autofarm(){
    if(avocados < acprice) {
        document.getElementById('acfnen').innerHTML = `Not enough avocado's`

        setTimeout(() => {
            document.getElementById('acfnen').innerHTML = ``
        }, 5000)
    } else if (avocados >= acprice){
        acfarms += 1
        document.getElementById('acfa').innerHTML = `${acfarms}`
        avocados -= acprice
        acprice *= 1.5
        let tempacprice = Math.floor(acprice)
        acprice = tempacprice
        document.getElementById('acfprice').innerHTML = `Price: ${acprice}`
        if(threxaf == 1){
            afcs += 3
        } else {
            afcs += 1
        }
    }
}

function avocadostore(){
    if (avocados < asprice){
        document.getElementById('asnen').innerHTML = `Not enough avocado's`
        setTimeout(() => {
            document.getElementById('asnen').innerHTML = ``
        }, 5000)
    } else if ( avocados >= asprice){
        astores += 1
        document.getElementById('asa').innerHTML = `${astores}`
        avocados -= asprice
        asprice *= 1.5
        let astoreprice = Math.floor(asprice)
        asprice = astoreprice
        assecond += 10
    }
}

// upgrades

function twox(){
    if(avocados < 1000 && tenxbought == false){
        document.getElementById('2xnen').innerHTML = `Not enough avocado's`

        setTimeout(() => {
            document.getElementById('2xnen').innerHTML = ``
        }, 5000)
    } else if (avocados >= 1000 && tenxbought == false){
        avocados -= 1000
        tenxbought = 1
        ammountperclick *= 10
    }
}

function autofarmx3(){
    if(avocados < 300 && threxaf == 0){
        document.getElementById('3xafnen').innerHTML = `Not enough avocado's`

        setTimeout(() => {
            document.getElementById('3xafnen').innerHTML = ``
        }, 5000)
    } else if(avocados > 300 && threxaf == 0){
        afcs *= 3
        threxaf = 1
        avocados -= 300
    }
}

// Saving/loading:

function loadGame(){
    var savedgame = JSON.parse (localStorage.getItem("gamesave"))

    // Global 

    if (typeof savedgame.avocados !== "undefined") avocados = savedgame.avocados;
    if (typeof savedgame.afs !== "undefined") afs = savedgame.afs;
    if (typeof savedgame.ammountperclick !== "undefined") ammountperclick = savedgame.ammountperclick


    // Autofarm

    if (typeof savedgame.acfarms !== "undefined") acfarms = savedgame.acfarms;
    if (typeof savedgame.acprice !== "undefined") acprice = savedgame.acprice;
    if (typeof savedgame.afcs !== "undefined") afcs = savedgame.afcs;

    // Avocado Stores

    if (typeof savedgame.astores !== "undefined") astores = savedgame.astores
    if (typeof savedgame.asprice !== "undefined") asprice = savedgame.asprice
    if (typeof savedgame.assecond !== "undefined") assecond = savedgame.assecond

    //10x

    if (typeof savedgame.tenxbought !== "undefined") tenxbought = savedgame.tenxbought

    // 3x auto harvesters

    if(typeof savedgame.threxaf !== "undefined") threxaf = savedgame.threxaf

}

function saveGame(){
    var gamesave = {

        // Global 

        avocados:avocados,
        afs:afs,
        ammountperclick:ammountperclick,

        // Autofarm 

        acfarms:acfarms,
        acprice:acprice,
        afcs:afcs,

        // Avocado Stores: 

        astores:astores,
        assecond:assecond,
        asprice:asprice,

        //10x

        tenxbought:tenxbought,

        //Three x autofarms

        threxaf:threxaf
    }
    localStorage.setItem("gamesave", JSON.stringify(gamesave))
}

window.onload = function () {
    loadGame()
}

setInterval(() => {
    saveGame()
}, 5000)