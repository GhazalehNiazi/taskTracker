'use strict';
// accpunts

const account1 = {
  owner: 'Ghazale Niazi',
  duties: [
    'going to the gym -',
    'writing homeworks +',
    'cleaning the room -',
    'calling sarah -',
    'MEETING +',
  ],
  pin: 1111,
};

const account2 = {
  owner: 'Pooria Niazi',
  duties: [
    'going to the gym -',
    'writing homeworks +',
    'cleaning the room -',
    'calling sarah -',
    'MEETING +',
  ],
  pin: 2222,
};
const account3 = {
  owner: 'Saba Emadzadeh',
  duties: [
    'going to the gym -',
    'writing homeworks +',
    'cleaning the room -',
    'calling sarah -',
    'MEETING +',
  ],
  pin: 3333,
};
const account4 = {
  owner: 'Jessica Roberts',
  duties: [
    'going to the gym -',
    'writing homeworks +',
    'cleaning the room -',
    'calling sarah -',
    'MEETING +',
  ],
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

// selecting elements

const welcomeLabel = document.querySelector('.welcome');
const dutiesLabel = document.querySelector('.duties__label');
const dutiesdateLabel = document.querySelector('.duties__date');
const dutiesValue = document.querySelector('.duties__value');

const todosDate = document.querySelector('.todos__date');
const todosValue = document.querySelector('.todos__value');
const todosType = document.querySelector('.todos__type');
const containerApp = document.querySelector('.app');
const containerTodos = document.querySelector('.todos');

const inputUser = document.querySelector('.login__input--user');
const inputPin = document.querySelector('.login__input--pin');
const inputNewDuty = document.querySelector('.form__input--duty');
const inputTransDuty = document.querySelector('.form__input--transDuty');
const inputTransTo = document.querySelector('.form__input--to');
const inputCheckUrgent = document.querySelector('.form__input--urgent');
const inputCheckNormal = document.querySelector('.form__input--normal');
const inputCheckTransNormal = document.querySelector(
  '.form__input--transnormal'
);
const inputCheckTransUrgent = document.querySelector(
  '.form__input--transurgent'
);

const btnLogin = document.querySelector('.login__btn');
const btnAddTodo = document.querySelector('.form__btn--addTodo');
const btnTransfer = document.querySelector('.form__btn--transfer');

console.log(containerTodos);
// functions

const displayDuty = function (acc) {
  containerTodos.innerHTML = '';

  acc.duties.forEach((duty, i) => {
    const type = duty.split('').find(e => e == '+') ? 'urgent' : 'normal';

    const dutyNew = duty.substring(0, duty.length - 1);
    console.log(dutyNew);

    const html = `
        <div class="todos__row">
        <div class="todos__type todos__type--${type}">${i + 1} ${type}</div>
        <div class="todos__date">3 days ago</div>
        <div class="todos__value">${dutyNew}</div>
        </div>`;
    containerTodos.insertAdjacentHTML('afterbegin', html);
  });
};

const updateUi = function (acc) {
  displayDuty(acc);
};

// creating usernames
accounts.forEach(function (acc) {
  acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(e => e[0])
    .join('');
});

// event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(e => e.username === inputUser.value);
  if (currentAccount.pin == Number(inputPin.value)) {
    containerApp.style.opacity = 100;
    displayDuty(currentAccount);

    welcomeLabel.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputPin.value = inputUser.value = '';
    inputPin.blur();
  }
});

btnAddTodo.addEventListener('click', e => {
  e.preventDefault();
  const type = inputCheckUrgent.checked ? '+' : '-';
  const newDuty = inputNewDuty.value + type;
  currentAccount.duties.push(newDuty);
  updateUi(currentAccount);
  inputCheckNormal.checked = inputCheckUrgent.checked = false;
  inputNewDuty.value = '';
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const type = inputCheckTransUrgent.checked ? '+' : '-';
  const newDuty = inputTransDuty.value;
  const receiver = accounts.find(e => inputTransTo.value == e.username);

  receiver.duties.push(newDuty + type);
  inputTransDuty.value = inputTransTo.value = '';
  inputCheckTransNormal.checked = inputCheckTransUrgent.checked = false;
});
