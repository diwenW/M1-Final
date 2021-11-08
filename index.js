let data = [
    {
        question:"33 + 2 = ?",
        options:[34,35,36,37],
        answer:'35'
    },
    {
        question:"1 + 1= ?",
        options: ['2', '3', '1','0'],
        answer:'2'
    },
    {
        question:"1 + 0= ?",
        options: ['2', '3', '1','0'],
        answer:'1'
    },
    {
        question:"20 - 10 = ?",
        options: ['10', '20', '2', '0'],
        answer:'10'
    },
    {
        question:"50 + 7 = 57?",
        options: ['True', 'False'],
        answer:'True'
    },

]



let startBtn = document.querySelector('.preview button');
let preview = document.querySelector('.preview');
let singleSheet = document.querySelector('.single-sheet');
startBtn.addEventListener('click', () => {
    preview.style.display='none';
    singleSheet.style.display='block';

})

let questionNum = document.querySelector('.title');
let question = document.querySelector('.question');
let optionContainer = document.querySelector('.option-container');
let nextBtn = document.querySelector('.single-sheet button');
let totalQuestion;
let counter =0;
let correctCounter=0, wrongCounter = 0;
let availableData = [];
let availableOptions = [];
let currentQuestion;
const setAvailableData = () => {
    const totalQuestion = data.length;
    for(let i=0; i<totalQuestion; i++){
        availableData.push(data[i])
    }
}

const getNewData = () => {
    numResult.innerHTML = data.length;

    const availableDataNum = availableData.length;
    totalQuestion = 'Question '+ (counter + 1) + ' of ' + data.length;
    questionNum.innerHTML = totalQuestion;
    let randomQuestion = availableData[Math.floor(Math.random()*availableDataNum)];
    currentQuestion = randomQuestion;

    let currentQuestionTitle = currentQuestion.question;
    question.innerHTML= currentQuestionTitle;

    let currentQuestionNum = availableData.indexOf(currentQuestion);

    availableData.splice(currentQuestionNum,1)
    counter++




    let currentQuestionOptions = currentQuestion.options;
    for(let i=0; i<currentQuestionOptions.length; i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML='';

    let animation = 0.2;
    for(let i=0; i<currentQuestionOptions.length; i++){
        let randomOption = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        let optionIndex = availableOptions.indexOf(randomOption);
        availableOptions.splice(optionIndex,1);


        let optionLi = document.createElement('li');
        optionLi.innerHTML=currentQuestionOptions[randomOption];
        optionLi.className='option';

        let animationTime = animation + 's';
        optionLi.style.animationDelay=animationTime;
        animation = animation +0.1;
        optionContainer.appendChild(optionLi);
        optionLi.setAttribute('onclick', 'getResult(this)')
    }

}

const getResult = (e) => {

    let value = e.innerHTML;

    if(value===currentQuestion.answer){

        e.classList.add('right');
        correctCounter++;
    }
    else{

        e.classList.add('wrong');
        wrongCounter++;
        for(let i=0; i<optionContainer.children.length; i++){
            if(optionContainer.children[i].innerHTML==currentQuestion.answer){
                optionContainer.children[i].classList.add('right')

            }
        }
    }

    unpointed();

}

const unpointed = () =>{
    const options = optionContainer.children.length;
    for(let i=0; i<options; i++){
        optionContainer.children[i].classList.add('cant-click')

    }

}

const next = () => {
    if(counter===data.length){

        counter=0;
        setAvailableData();
        singleSheet.style.display='none';
        resultSection.style.display='block';
        testResult();
    }
    else{
        getNewData();
    }
}


nextBtn.addEventListener('click', () => {
        next();
})


window.onload = () => {
    setAvailableData();
    getNewData();
}


let resultSection = document.querySelector('.test-result');
let tryAgainBtn = document.querySelector('.againBtn');
let numResult = document.querySelector('.totalQuestion-num');
let correctNum = document.querySelector('.correct-num');
let wrongNum = document.querySelector('.wrong-num');
let percentageNum = document.querySelector('.percentage-num');
let scoreNum = document.querySelector('.score-num');
let IntNumResult, totalScore, percentCalculate;
tryAgainBtn.addEventListener('click', () => {
    resultSection.style.display='none';
    preview.style.display='block';
    IntNumResult=0, correctCounter=0, wrongCounter=0,
    getNewData();

})


const calculateTubeSize = () => {
    let selectAllProgressBar = document.querySelectorAll('.result-section>div>div');
    selectAllProgressBar.forEach(x =>{

        if(x.classList.contains('color-block1')){
            let progressBarForBlock1 = ((IntNumResult)/(data.length))*170 + 'px';
            console.log(progressBarForBlock1);
            x.style.width = progressBarForBlock1;
        }
        else if(x.classList.contains('color-block2')){
            let progressBarForBlock2 = ((correctCounter)/(data.length))*170 + 'px';
            console.log(progressBarForBlock2);
            x.style.width = progressBarForBlock2;
        }
        else if(x.classList.contains('color-block3')){
            let progressBarForBlock3 = ((wrongCounter)/(data.length))*170 + 'px';
            console.log(progressBarForBlock3);
            x.style.width = progressBarForBlock3;
        }
        else if(x.classList.contains('color-block4')){
            let percentCalculate = (correctCounter / IntNumResult)*100;
            let progressBarForBlock4 = ((percentCalculate)/100)*170 + 'px';
            console.log(progressBarForBlock4);
            x.style.width = progressBarForBlock4;
        }
        else{
            let progressBarForBlock5 = ((correctCounter)/(data.length))*170 + 'px';
            console.log(progressBarForBlock5);
            x.style.width = progressBarForBlock5;
        }

    })


}



const testResult = () => {
    IntNumResult = parseInt(numResult.innerHTML);
    let totalScore = correctCounter + '/' + data.length;
    scoreNum.innerHTML = totalScore;
    correctNum.innerHTML = correctCounter;
    wrongNum.innerHTML = wrongCounter;
    percentCalculate = ((correctCounter / IntNumResult)*100).toFixed(2);
    percentCalculate = percentCalculate + '%';
    percentageNum.innerHTML = percentCalculate;

    calculateTubeSize();
}




