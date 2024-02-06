const calculator = (x, y, z) => {

    console.log(x, y, z)

    x *= y

    const converted = x / z

    return converted
}

function something() {
    let tall1 = document.getElementById('number1')

    let convertFrom = document.getElementById('cfrom')

    let convertTo = document.getElementById('cto')

    const convertert = calculator(tall1.value, convertFrom.value, convertTo.value).toFixed(3)

    document.getElementById('result').innerHTML = `${convertert}`
}

function checkpalindrom() {
    const tall2 = document.getElementById('number1').value

    const listeReversed = tall2.split('').reverse()

    const tall_liste2 = tall2.split('')


    const checkArray = []

    console.log(listeReversed)
    console.log(tall_liste2)

    for(let i = 0; i < tall_liste2.length; i++) {

        if(listeReversed[i] == tall_liste2[i]){
            checkArray.push(listeReversed[i])
        }
    }   

    if (checkArray.length == tall_liste2.length) {
        document.getElementById('presultat').innerHTML = `This is a palindrome`
    } else {
        document.getElementById('presultat').innerHTML = `This is not a palindrome`
    }
}