const submit = document.querySelector('#submit');
let heightConverted,
    lengthConverted,
    widthConverted,
    priceInput,
    woodCount;

submit.addEventListener('click', getHeight = () => {
    height = document.querySelector('#height').value;
    length = document.querySelector('#length').value;
    width = document.querySelector('#width').value;
    priceInput = document.querySelector('#price').value;
    woodCount = document.querySelector('#woodCount').value;

    const getSelectectUnitHeight = document.querySelector('#height-select');
    const selectedUnitHeight = getSelectectUnitHeight.options[getSelectectUnitHeight.selectedIndex].text;
    convertUnits(selectedUnitHeight, height, 'height');

    const getSelectectUnitlength = document.querySelector('#length-select');
    const selectedUnitlength = getSelectectUnitlength.options[getSelectectUnitlength.selectedIndex].text;
    convertUnits(selectedUnitlength, length, 'length');

    const getSelectectUnitwidth = document.querySelector('#width-select');
    const selectedUnitwidth = getSelectectUnitwidth.options[getSelectectUnitwidth.selectedIndex].text;
    convertUnits(selectedUnitwidth, width, 'width');
});

const convertUnits = (unit, dimension, parameter) => {
    if (unit === 'mm') {
        millimetersToMeters(dimension, parameter, unit);
    } 
    else if (unit === 'cm') {
        centimetersToMeters(dimension, parameter, unit);
    }
    else if (unit === 'inch') {
        inchesToMeters(dimension, parameter, unit);
    }
    else {
        assignConverted(dimension, parameter);
    }
}

const millimetersToMeters = (dimension, parameter) => {
    let unitConverted = dimension / 1000;
    assignConverted(unitConverted, parameter);
}

const centimetersToMeters = (dimension, parameter) => {
    let unitConverted = dimension / 100;
    assignConverted(unitConverted, parameter);
}

const inchesToMeters = (dimension, parameter) => {
    let unitConverted = dimension * 0.0254;
    assignConverted(unitConverted, parameter);
}

const assignConverted = (unitConverted, parameter) => {
    if (parameter === 'height') {
        heightConverted = unitConverted;
        return;
    } else if (parameter === 'length') {
        lengthConverted = unitConverted;
        return;
    } else if (parameter === 'width') {
        widthConverted = unitConverted;
    } 
    calculateVolume(heightConverted, lengthConverted, widthConverted);
}

const volume = document.querySelector('#volume');
const price = document.querySelector('#output--price');
const AllResults = document.querySelector('#results');
const totalOutput = document.querySelector('#total');
const totalPriceOutput = document.querySelector('#total--price');
let totalVolumeMMultiplied = 0;
let totalPrice = 0;

const calculateVolume = (heightConverted, lengthConverted, widthConverted) => {
    let volumeM = heightConverted * lengthConverted * widthConverted;
        
    volumeM = volumeM.toFixed(3);
    volumeMMultipliedNotFixed = volumeM * woodCount;

    let pricePerM = volumeMMultipliedNotFixed * priceInput;
    pricePerMNotFixed = pricePerM;
    pricePerM = pricePerM.toFixed(2);
    volumeMMultiplied = volumeMMultipliedNotFixed.toFixed(3);
    
    volume.innerHTML = `<span>${volumeMMultiplied} m³ </span> <br> <span class="grey">jedna deska: ${volumeM} m³</span>`;
    price.innerHTML = `cena: £${pricePerM}`;
}

document.querySelector('#reset').addEventListener('click', ()=> {
    volume.innerHTML = '';
    price.innerHTML = 'całkowita cena:'
});

document.querySelector('#add').addEventListener('click', ()=> {
    totalVolumeMMultiplied += volumeMMultipliedNotFixed;
    totalPrice += pricePerMNotFixed; 
    totalPriceOutput.innerHTML = `<p>cena: £${totalPrice.toFixed(2)}</p>`;
    AllResults.innerHTML += `<p>${volumeMMultiplied} m³ <span class="grey">${height} / ${width} / ${length} × ${woodCount}</span></p>`;
    totalOutput.innerHTML = `suma: ${totalVolumeMMultiplied.toFixed(3)} m³`;
});

document.querySelector('#clear').addEventListener('click', ()=> {
    AllResults.innerHTML = ``;
    totalOutput.innerHTML = `suma: 0`;
    totalVolumeMMultiplied = 0;
    totalPriceOutput.innerHTML = 'cena: £0';
});