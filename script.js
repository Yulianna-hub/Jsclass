' use strict ';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 

let mission = 735000;
let days = 30;
let money;
let income = prompt('Ваш дополнительный вид дохода?');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money));
};
start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
console.log(addExpenses.split(','));

let showTypeOf = function (data) {
    console.log(data, typeof(data));
};
showTypeOf(income);
showTypeOf(money);
showTypeOf(deposit);

let getExpensesMonth = function(){
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        let expensesMoney = 0;
        do {  
            expensesMoney = prompt('Во сколько это нам обойдется?'); 
        }while (!isNumber(expensesMoney));
        sum += +expensesMoney;
    }
        console.log(expenses);
        return sum;
};

let expensesAmonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmonth);

function getAccumulatedMonth() {
   return +money - expensesAmonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

console.log('Цель заработать ' + mission + ' евро.');

let targetMonth = Math.ceil(mission / accumulatedMonth);
function getTargetMonth() {  
    if (targetMonth > 0) {
        return ('Цель будет достигнута за ' + targetMonth + ' месяцев.');
    } else if (targetMonth <= 0) {
        return ('Цель не будет достигнута.');  
    }      
}
console.log(getTargetMonth());
  
let budgetDay = accumulatedMonth / days;
console.log('Бюджен на день: ' + budgetDay + ' Є');
let getStatusIncome = function() {

    if (budgetDay >= 170) {
        return ('У вас высокий уровень дохода.');
    } else if (budgetDay < 170 && budgetDay > 85) {
        return ('У вас средний уровень дохода.'); 
    } else if (budgetDay <= 85 && budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего.');
    } else if (budgetDay <= 0) {
        return ('Что то пошло не так.');
    } 
};
console.log(getStatusIncome());








