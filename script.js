' use strict ';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 

let money;
let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money));
};
start();

let days = 30;
let appData = {
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission:  735000,
    period: 60,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        console.log(appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log(typeof appData.deposit);
        appData.income = prompt('Ваш дополнительный вид дохода?');
        console.log(typeof appData.income);
    
        
            for (let i = 0; i < 2; i++) {
                appData.expenses[i]  = prompt('Введите обязательную статью расходов?');
                appData.expensesMoney = 0;
                appData.expensesMoney = prompt('Во сколько это вам обойдется?');
                appData.string = appData.expenses[i] + ' : ' + appData.expensesMoney;
                appData.expenses[appData.string] = +i;   
                
            }
            console.log(appData.expenses);

            for (let key in appData){
                appData.sum = 0;
                appData.sum += +appData.expensesMoney;
            }
        console.log(appData.sum);
        
         console.log('Расходы за месяц: ' + appData.sum);

          appData.getAccumulatedMonth = function() {
            return +money - appData.expensesAmonth;
         };
         appData.accumulatedMonth = appData.getAccumulatedMonth();
         console.log(appData.accumulatedMonth);
         console.log('Цель заработать ' +appData.mission + ' евро.');

         
         appData.targetMonth = Math.ceil(appData.mission / appData.accumulatedMonth);
         appData.getTargetMonth = function() {  
            if (appData.targetMonth > 0) {
                return ('Цель будет достигнута за ' + appData.targetMonth + ' месяцев.');
            } else if (appData.targetMonth <= 0) {
                return ('Цель не будет достигнута.');  
            }      
        };
        console.log(appData.getTargetMonth());

        appData.budgetDay = appData.accumulatedMonth / days;
        console.log('Бюджен на день: ' + appData.budgetDay + ' Є');
        appData.getStatusIncome = function() {

            if (appData.budgetDay >= 170) {
                return ('У вас высокий уровень дохода.');
            } else if (appData.budgetDay < 170 && appData.budgetDay > 85) {
                return ('У вас средний уровень дохода.'); 
            } else if (appData.budgetDay <= 85 && appData.budgetDay > 0) {
                return ('К сожалению у вас уровень дохода ниже среднего.');
            } else if (appData.budgetDay <= 0) {
                return ('Что то пошло не так.');
            } 
        };
        console.log(appData.getStatusIncome());

        
    }
    
};
appData.asking();


//let days = 30;

//let appData.income = prompt('Ваш дополнительный вид дохода?');
//let deposit = confirm('Есть ли у вас депозит в банке?');
//let appData.expenses = [];

//let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
//console.log(addExpenses.split(','));

/*let showTypeOf = function (data) {
    console.log(data, typeof(data));
};
showTypeOf(appData.income);
showTypeOf(money);
showTypeOf(appData.deposit);*/

/*let getExpensesMonth = function(){
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
};*/

/*let expensesAmonth = appData.getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmonth);*/

/*function getAccumulatedMonth() {
   return +money - expensesAmonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);*/

//console.log('Цель заработать ' +appData.mission + ' евро.');

//let targetMonth = Math.ceil(appData.mission / accumulatedMonth);
/*function getTargetMonth() {  
    if (targetMonth > 0) {
        return ('Цель будет достигнута за ' + targetMonth + ' месяцев.');
    } else if (targetMonth <= 0) {
        return ('Цель не будет достигнута.');  
    }      
}
console.log(getTargetMonth());*/
  
/*let budgetDay = accumulatedMonth / days;
console.log('Бюджен на день: ' + budgetDay + ' Є');*/
/*let getStatusIncome = function() {

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
console.log(getStatusIncome());*/

