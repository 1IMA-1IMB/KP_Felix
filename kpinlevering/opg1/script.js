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