' use strict ';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 

let money;
let income = prompt('Ваш дополнительный вид дохода?');
let deposit = confirm('Есть ли у вас депозит в банке?');

let start = function() {
   // money = prompt('Ваш месячный доход?');

    /*while (isNaN(money) || money.trim() === '' || money === null) {
        money = prompt('Ваш месячный доход?');
    }*/
    /*while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?');
    }*/
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
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

/*let expenses1 = prompt('Введите обязательную статью расходов?', "Ипотека");
let amount1 = prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?', "Топливо" );
let amount2 = prompt('Во сколько это обойдется?');*/

let expenses = [];
let getExpensesMonth = function(){
    //return Number(amount2) + Number(amount1);
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
       do {  
                sum += +prompt(!isNumber('Во сколько это нам обойдется?')); 
        }
        while (!isNumber(sum));
    }
  /*  for (let i = 0; i < 2; i++) {
                expenses[i] = prompt('Введите обязательную статью расходов?');
            if (!isNumber(sum)) {
                sum += +prompt('Во сколько это нам обойдется?'); 
            }
        }*/
        console.log(expenses);
        return sum;
};



let expensesAmonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmonth);

function getAccumulatedMonth() {
   return Number(money) - expensesAmonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

let mission = 735000;
console.log('Цель заработать ' + mission + ' евро.');

let targetMonth;
function getTargetMonth() {
    return targetMonth = Math.ceil(mission / accumulatedMonth);
        if (targetMonth > 0){
                return ('Цель будет достигнута за ' + targetMonth + ' месяцев.');
        } else if (targetMonth <= 0) {
             return ('Цель не будет достигнута.');
           
       } 
       
}
console.log(targetMonth);

/*function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
// 1 вариант const targetMonth = getTargetMonth();
// 2 вариант:
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев.');*/

let days = 30;    
let budgetDay = accumulatedMonth / days;
console.log('Бюджен на день: ' + budgetDay + ' Є');
let getStatusIncome = function() {

    if (budgetDay >= 170) {
        return ('У вас высокий уровень дохода.');
    } else if (budgetDay < 170 && budgetDay > 85) {
        return ('У вас средний уровень дохода.'); 
    } else if (85 <= budgetDay) {
        return ('К сожалению у вас уровень дохода ниже среднего.');
    } else if (0 >= budgetDay) {
        return ('Что то пошло не так.');
    } 
};
console.log(getStatusIncome());








