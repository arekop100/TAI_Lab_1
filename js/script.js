fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
.then(resp => {
    preQuestions = resp;


let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');

let index = 0;
let points = 0;

let answered = [];

function activateAnswers() {
    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener('click', doAction);
    }
}
activateAnswers()

function disableAnswers(){
    for (let i = 0; i < answers.length; i++) {
        answers[i].removeEventListener('click', doAction);
    }
}

function removeAnserws(){
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('correct');
        answers[i].classList.remove('incorrect')
    }
}

function setQuestion(index) {

    question.innerHTML = (index+1)+':'+preQuestions[index].question;

    answers[0].innerHTML = preQuestions[index].answers[0];
    answers[1].innerHTML = preQuestions[index].answers[1];
    answers[2].innerHTML = preQuestions[index].answers[2];
    answers[3].innerHTML = preQuestions[index].answers[3];
    if (preQuestions[index].answers.length === 2) {
        answers[2].style.display = 'none';
        answers[3].style.display = 'none';
    }
    else {
        answers[2].style.display = 'block';
        answers[3].style.display = 'block';

    }
}

setQuestion(0);

next.addEventListener('click', function (event) {
    index++;
    if (index >= preQuestions.length) {     //zabezpieczenie na wyjście z tablicy
        document.querySelector('.list').style.display = 'none';
        document.querySelector('.results').style.display = 'block';
        document.querySelector('.userScorePoint').innerHTML = points;
        let prev = localStorage.getItem('history');
        if(prev!=undefined){
            prevjson = JSON.parse(prev);
            let numplays = prevjson.numplays;
            let oldavg = prevjson.oldavg;
            document.querySelector('.average').innerHTML = oldavg;
            numplays++;
            oldavg += points;
            oldavg = oldavg / numplays;
            localStorage.setItem('history',JSON.stringify({numplays: numplays,oldavg: oldavg}))
        }
        else{
            document.querySelector('.average').innerHTML = points;
            localStorage.setItem('history',JSON.stringify({numplays: 1,oldavg: points}))
        }
    }
    else {
        setQuestion(index);
        if(!answered.includes(index)){
            activateAnswers();
        }
        else{
            disableAnswers();
        }
        removeAnserws();
    }
});

previous.addEventListener('click', function (event) {//zabezpieczenie, na wyjście z tablicy
    if(index>0){     //zabezpieczenie na wyjście z tablicy
        index--;
        setQuestion(index);
        if(!answered.includes(index)){
            activateAnswers();
        }
        else{
            disableAnswers();
        }
        removeAnserws();
    }

});

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
        disableAnswers()
    }
    else {
        markInCorrect(event.target);
        disableAnswers();
    }
    answered.push(index);
}


function markCorrect(elem) {
    elem.classList.add('correct');
}

function markInCorrect(elem){
    elem.classList.add('incorrect');
}

restart.addEventListener('click', function (event) {
    event.preventDefault();
    index = 0;
    points = 0;
    answered = [];
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.list').style.display = 'block';
    pointsElem.innerText = points;
    setQuestion(0);
    removeAnserws();
    activateAnswers();
});


});