' use strict ';

//let money = 2000;
let money = prompt('Ваш месячный доход?');
let income = prompt('Ваш дополнительный вид дохода?');
let deposit = confirm('Есть ли у вас депозит в банке?');

//let addExpenses = 'Интернет, Свет, Топливо';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
console.log(addExpenses.split(','));

let showTypeOf = function (data) {
    console.log(data, typeof(data));
};
showTypeOf(income);
showTypeOf(money);
showTypeOf(deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

function getExpensesMonth (){
    return Number(amount2) + Number(amount1);
}
let expensesMonth = getExpensesMonth();
console.log(getExpensesMonth());

/*6) Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth
и вывести результат в консоль*/
function getAccumulatedMonth() {
   return Number(money) - expensesMonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

/*7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, 
вывести в консоль, округляя в большую сторону (методы объекта Math в помощь) */
let mission = 735000;
console.log('Цель заработать ' + mission + ' евро.');

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}
// 1 вариант const targetMonth = getTargetMonth();
// 2 вариант:
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев.');

// - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
//- Вывести в консоль budgetDay
let days = 30;    
let budgetDay = accumulatedMonth / days;
console.log('Бюджен на день: ' + budgetDay + ' Є');
let getStatusIncome = function name(params) {
    
    if (budgetDay >= 170) {
        return ('У вас высокий уровень дохода.');
    } else if (budgetDay < 170 && budgetDay >= 85) {
        return ('У вас средний уровень дохода.'); 
    } else if (budgetDay < 85) {
        return ('К сожалению у вас уровень дохода ниже среднего.');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так.');
    } 
};
console.log(getStatusIncome());

