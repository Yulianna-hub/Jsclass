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
    period: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        console.log(appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log(typeof appData.deposit);
        appData.income = prompt('Ваш дополнительный вид дохода?');
        console.log(typeof appData.income);

            for (let i = 0; i < 2; i++) {
                const expens  = prompt('Введите обязательную статью расходов?');
                let expensesMoney = 0;
                do{
                expensesMoney = prompt('Во сколько это вам обойдется?');
                } while(!isNumber(expensesMoney));
                appData.expenses[expens] = + expensesMoney;   
            }
            console.log(appData.expenses);   
    }, 
    getExpensesMonth: function() {
        for (const key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },    
    getBudget: function() {
        const days = 30;
        appData.budgetMonth = + appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / days;

    },
    getTargetMonth: function() {  
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
        if (appData.budgetMonth > 0) {
            return ('Цель будет достигнута за ' + appData.period + ' месяцев.');
        } else if (appData.targetMonth <= 0) {
            return ('Цель не будет достигнута.');  
        }      
    },
    getStatusIncome: function() {

        if (appData.budgetDay >= 170) {
            return ('У вас высокий уровень дохода.');
        } else if (appData.budgetDay < 170 && appData.budgetDay > 85) {
            return ('У вас средний уровень дохода.'); 
        } else if (appData.budgetDay <= 85 && appData.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего.');
        } else if (appData.budgetDay <= 0) {
            return ('Что то пошло не так.');
        } 
    }
};
for (const key in appData) {
    console.log('Наша программа включает в себя данные: ' +  key + ': ' + appData[key]);
}

appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();
console.log('Месячный бюджет: ' + appData.budgetMonth);
console.log('Бюджен на день: ' + appData.budgetDay + ' Є');

appData.getTargetMonth();
console.log(appData.getTargetMonth());

appData.getStatusIncome();
console.log(appData.getStatusIncome());



