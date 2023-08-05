var CodeSelectTags = document.querySelectorAll('.ChooseCode-opt');
var DiffSelectTags = document.querySelectorAll('.chooseDiff-opt');
var Difficulity = 'Normal'
var CodeToShow = 'Rgb'
var ColorsToShow = 6


var ColorsListRgb = []
var ColorsListHex = []
var rightAnwserIndex
var interval
var timerTime = 10;

function StartUp(){
    let score = localStorage.getItem('score');
    if(score==null || score == undefined){
        score = 0;
        localStorage.setItem('score',0)
    }
    document.getElementById('ScoreShower').textContent = "score : " + score
    ChangeCode('Rgb')
    ChangeDiff('Normal')
}
StartUp()


function ChangeCode(code){
    CodeToShow = code
    CodeSelectTags.forEach(item=>{
        item.classList.remove('active')
    })
    document.getElementById('Code-'+code).classList.add('active')
    document.getElementById('CodeShow').textContent = "Code : " + code
}

function ChangeDiff(diff){
    Difficulity = diff
    DiffSelectTags.forEach(item=>{
        item.classList.remove('active')
    })
    document.getElementById('Diff-'+diff).classList.add('active')
    document.getElementById('DiffShow').textContent = "Difficulity : " + diff

    switch(diff){
        case 'Easy':
            document.getElementById('CustomDiff').innerHTML = ""
            document.getElementById('CustomDiff').style.display = "none"
            ColorsToShow = 3;
            break;
        case 'Normal':
            document.getElementById('CustomDiff').innerHTML = ""
            document.getElementById('CustomDiff').style.display = "none"
            ColorsToShow = 6;
            break;
        case 'Hard':
            document.getElementById('CustomDiff').innerHTML = ""
            document.getElementById('CustomDiff').style.display = "none"
            ColorsToShow = 9;
            break;
        case 'Custom':
            ColorsToShow = 10;
            CustomDiff()
            break;
    }
    document.getElementById('ColorShow').textContent = "Colors : " + ColorsToShow
}

function CustomDiff(){
    document.getElementById('CustomDiff').innerHTML = `
        <span>Colors to choose from(the higher the harder) : </span>
        <input oninput="CheckForRange(this)" type="number" min="1" max="100" value="10" id="NumberColorsToShow" />
    `
    document.getElementById('CustomDiff').style.display = "block"
}

function CheckForRange(element){
    let value = element.value;
    if(value<1){
        element.value = 1;
    }else if(value > 100){
        element.value = 100;
    }
    document.getElementById('ColorShow').textContent = "Colors : " + element.value;
}

function Play(){
    ColorsListRgb = []
    ColorsListHex = []

    let ColorsHtml = ""

    let i = 0;
    while(i<ColorsToShow){
        let red = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        let green = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        let blue = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        let RgbCode = `rgb(${red},${green},${blue})`;
        let HexCode = rgbToHex(red,green,blue);
        ColorsListRgb.push(RgbCode);
        ColorsListHex.push(HexCode);
        ColorsHtml = ColorsHtml + `
            <div class="ColorShower" onclick="Clicked(${i})" style="background-color:${RgbCode}">
                <span style="color:${getTextColorForBackground([red,green,blue])}">
                    ${RgbCode}
                </span>
                <span style="color:${getTextColorForBackground([red,green,blue])}">
                    ${HexCode}
                </span>
            </div>
        `
        i++;
    }
    rightAnwserIndex = getRandomItemFromArray(ColorsListRgb)[1];
    
    let TextToShow;
    if(CodeToShow == "Rgb"){
        TextToShow = ColorsListRgb[rightAnwserIndex]
    }else if(CodeToShow == "Hex"){
        TextToShow = ColorsListHex[rightAnwserIndex]
    }else{
        TextToShow = ColorsListRgb[rightAnwserIndex] + "," + ColorsListHex[rightAnwserIndex]
    }



    document.getElementById('PlayContainer').innerHTML = `
        <span class="PlayTitle" >which color is this code showing:</span>
        <span class="PlayTitle" >${TextToShow} : </span>
        <div class="ColorsContainer">
            ${ColorsHtml}
        </div> 
    `
}

function Clicked(n){
    document.querySelectorAll('.ColorShower span').forEach(item=>{
        item.style.display = "block"
    })

    if(n == rightAnwserIndex){
        console.log('win')
    }else{
        console.log('lose')
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function getRandomItemFromArray(array) {
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    return [array[randomIndex],randomIndex];
  }





  function getTextColorForBackground(background) {
    Y = 0.2126*background[0] + 0.7152*background[1] + 0.0722*background[2]
    var color = Y > 128 ? 'black' : 'white'
    return color
  }
