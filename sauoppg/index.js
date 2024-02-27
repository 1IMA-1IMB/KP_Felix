let sauer = 100

let klippaSauer = 0

const ptall = document.getElementById('asfms')

const klippet = document.getElementById('klippet')

const klippasauerp = document.getElementById('sauerKlippet1')

function tellEnSau() {

    if(sauer > 0) {
        sauer -= 1

        document.getElementById('asfms').innerHTML = `Du har ${sauer} igjenn`
    } else {
        document.getElementById('asfms').innerHTML = `ZZZ ZZZ ZZZ`
    }



}


function tellNoenSauer(i) {

    if(sauer > 0) {
    sauer -= i

    document.getElementById('asfms').innerHTML = `Du har ${sauer} igjenn`
    
    } else {
        document.getElementById('asfms').innerHTML = `ZZZ ZZZ ZZZ`
    }
}


function mistetTellingen() {
    sauer = 100
    klippaSauer = 0

    document.getElementById('asfms').innerHTML = `Du har ${sauer} igjenn`;
    document.getElementById('sauerKlippet1').innerHTML = `Du har klippet ${klippaSauer} sauer`;
    document.getElementById('klippet').innerHTML = `Du har ikke klippet noen sauer`;

}

function klippSauer(i) {

    if(klippaSauer == 100 || klippaSauer > 100) {
        document.getElementById('klippet').innerHTML = 'ZZZ ZZZ ZZZ'
    } else if(i > 80 ) {
        document.getElementById('klippet').innerHTML = 'Du fikk nok ull til et ull-hoppeslott!'
        klippaSauer += i
    } else if (i > 50) {
        document.getElementById('klippet').innerHTML = 'Du fikk nok ull til å lage en saue-klone!'
        klippaSauer += i
    } else if (i > 30) {
        document.getElementById('klippet').innerHTML = 'Du fikk nok ull til kjeledress og sengetøy!'
        klippaSauer += i
    } else if (i > 10) {
        document.getElementById('klippet').innerHTML = 'Du fikk nok ull til en stor genser!'
        klippaSauer += i
    } else if(i > 0) {
        document.getElementById('klippet').innerHTML = 'Du fikk nok ull til et par sokker!' 
        klippaSauer += i
    } 

}


function tellfleresauer() {

    const tall = document.getElementById('tall')

    tellNoenSauer(tall.value)
}

function klippSauer1() {
    const tall = document.getElementById('tall')

    const tallverdi = tall.value


    const tallverdi2 = parseInt(tallverdi, 10)

    console.log(tallverdi)

    klippSauer(tallverdi2)

    document.getElementById('sauerKlippet1').innerHTML = `Du har klippet ${klippaSauer} sauer`
}