import { indexOf } from 'lodash';
import './style.css';

let data = {};
const id = 'dLQGiu9bKl2Xwh0Docr4';
// const froms = document.querySelector('.form-score');
const allscore = document.querySelector('.list-score');
const refresh = document.querySelector('.btn-refresh');
const addscore = document.querySelector('.addbtn');
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;

const errors = document.querySelector('.errorscore');
const erroru = document.querySelector('.erroruser');
const sucess = document.querySelector('.success');
const erroMsgs = () => {
  const escore = document.createElement('strong');
  escore.className = 'escore';
  errors.style.color = 'red';
  escore.innerHTML = ' Score is reqired!';
  errors.appendChild(escore);
  setTimeout(() => {
    document.querySelector('.escore').remove();
  }, 2000);
};
const erroMsgu = () => {
  const span = document.createElement('strong');
  span.className = 'errorus';
  erroru.style.color = 'red';
  span.innerHTML = 'Name is reqired!';
  erroru.appendChild(span);
  setTimeout(() => {
    document.querySelector('.errorus').remove();
  }, 2000);
};
const Sucess = () => {
  const s = document.createElement('p');
  s.className = 'sucessmsg';
  sucess.style.display = 'block';
  s.textContent = 'Data Added sucessfully!';
  sucess.style.color = 'white';
  sucess.appendChild(s);
  setTimeout(() => {
    document.querySelector('.sucessmsg').remove();
  }, 2000);
};

const fetchData = async () => {
  const gamescore = await fetch(url);
  const gamedata = await gamescore.json();
  allscore.innerHTML = '';
  gamedata.result.forEach((element) => {
    allscore.innerHTML += `<tr id="${gamedata.result.indexOf(element)}"><td>${element.user}</td><td>${element.score}</td></tr>`;
    if (gamedata.result.indexOf(element) % 2 === 0) {
      const c = document.getElementById(`${gamedata.result.indexOf(element)}`);
      c.style.background = 'grey';
    }
  });
};

const sendData = async () => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

refresh.addEventListener('click', (element) => {
  element.preventDefault();
  fetchData();
});

addscore.addEventListener('click', (e) => {
  const usern = document.querySelector('#user');
  const scoreg = document.querySelector('#score');
  e.preventDefault();
  if (!usern.value) {
    erroMsgu();
  } else if (!scoreg.value) {
    erroMsgs();
  } else {
    const data1 = {
      user: usern.value,
      score: scoreg.value,
    };
    data = data1;
    sendData();
    usern.value = '';
    scoreg.value = '';
    Sucess();
  }
});
