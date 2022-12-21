import './style.css';

let data = {};
const id = 'dLQGiu9bKl2Xwh0Docr4';
const allscore = document.querySelector('.list-score');
const refresh = document.querySelector('.btn-refresh');
const addscore = document.querySelector('.addbtn');
const user = document.querySelector('#user');
const score = document.querySelector('#score');
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
const fetchData = async () => {
  const gamescore = await fetch(url);
  const gamedata = await gamescore.json();
  allscore.innerHTML = '';
  gamedata.result.forEach((element) => {
    allscore.innerHTML += `<tr><td>${element.user}</td><td>${element.score}</td></tr>`;
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
  e.preventDefault();
  if (user.value === '' && score.value === '') {
    // eslint-disable-next-line no-alert
    alert('Required fields!');
  } else {
    const data1 = {
      user: user.value,
      score: score.value,
    };
    data = data1;
    sendData();
    user.value = '';
    score.value = '';
  }
});
