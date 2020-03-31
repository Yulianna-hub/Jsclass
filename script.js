' use strict ';

//let money = 2000;
let money = prompt('Ваш месячный доход?');
console.log(typeof money);

let income = prompt('Ваш дополнительный доход?');
console.log(typeof income);

//let deposit = ((2500 * 60) == 735000);
let deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);

//let addExpenses = 'Интернет, Свет, Топливо';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
console.log(addExpenses.length);

//  - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(addExpenses.toLowerCase());
console.log((addExpenses.toLowerCase()).split(','));


let expenses1 = prompt('Введите обязательную статью расходов?');
console.log(expenses1);

let amount1 = prompt('Во сколько это обойдется?');
console.log(amount1);

let expenses2 = prompt('Введите обязательную статью расходов?');
console.log(expenses2);

let amount2 = prompt('Во сколько это обойдется?');
console.log(amount2);

/*6) Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth
и вывести результат в консоль*/
let budgetMonth = ((Number(money) + Number(income)) -(Number(amount2) + Number(amount1)));
console.log(budgetMonth);

/*7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, 
вывести в консоль, округляя в большую сторону (методы объекта Math в помощь) */
let mission = 735000;
console.log('Цель заработать ' + mission + ' евро.');
    if (mission/budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission/budgetMonth) + ' месяцев.');

let period = 60;
console.log('Период равен ' + period + ' месяцев.');

// - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
//- Вывести в консоль budgetDay
let days = 30;    
let budgetDay = budgetMonth / days;
console.log('Бюджен на день: ' + budgetDay + ' Є');

    if (budgetDay >= 170) {
        console.log('У вас высокий уровень дохода.');
    } else if (  budgetDay < 170 &&  budgetDay >= 85) {
        console.log('У вас средний уровень дохода.'); 
    } else if (85 < budgetDay) {
        console.log('К сожалению у вас уровень дохода ниже среднего.');
    } else if (budgetDay <= 0) {
        console.log('Что то пошло не так.');
    };
        
    



