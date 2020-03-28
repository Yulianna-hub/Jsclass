'use ctrict';

let money = 2000;
    console.log(typeof money);

let income = '500';
    console.log(typeof income);

let addExpenses = 'Интернет, Свет, Топливо';
    console.log(addExpenses.length);
    //  - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
    console.log(addExpenses.toLowerCase());
    console.log((addExpenses.toLowerCase()).split(','));


let deposit = ((2500*60)==735000);
    console.log(typeof deposit);


let mission = 735000 ;
    console.log('Цель заработать ' + mission +' евро.')

let period = 60;
    console.log('Период равен '+ period +' месяцев.');

// - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
//- Вывести в консоль budgetDay
let days = 30;    
let budgetDay = (money+Number(income))/days;
    
    console.log(budgetDay);




 



