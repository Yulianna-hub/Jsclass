' use strict ';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 
let isstring = function(m) {
     return isNaN(m) || m !== '' || m === null;
};

let money;
let start = function() {
    do {
        money = prompt('Ваш месячный доход?', '5500');
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission:  735000,
    period: 24,
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = {};
            do{
           itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Трейдинг');
            } while(!isstring(itemIncome));
            let cashIncome =  0;
            do{
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '8000');
            }while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Путишуствие, Дом, Машина');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        console.log(appData.addExpenses);

        let strExp= {};
        for (let str of appData.addExpenses) {
            str = str.trim();
            strExp = ((str[0].toUpperCase() + str.slice(1))+ ', ');
        }
        console.log(strExp);

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log(typeof appData.deposit);
        appData.income = prompt('Ваш дополнительный вид дохода?', 'Девиденды');
        console.log(typeof appData.income);

            for (let i = 0; i < 2; i++) {
                let expens = {};
                do{
                expens  = prompt('Введите обязательную статью расходов?');
                } while(!isstring(expens));
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
        return appData.mission / appData.budgetMonth;    
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
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
            appData.percentDeposit = prompt('Какой годовой процент?', 1.75);
            } while(!isNumber(appData.percentDeposit));
            do { 
            appData.moneyDeposit = prompt('Какая сумма заложенна?' , 150000);
            } while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

start = document.getElementById('start');
appData.income = document.getElementsByTagName('button')[0];
appData.expenses = document.getElementsByTagName('button')[1];
appData.deposit = document.querySelector('#deposit-check');

appData.budgetDay = document.getElementsByClassName('.budget_day-value');
appData.expensesMonth = document.getElementsByClassName('.expenses_month-value');
appData.income = document.getElementsByClassName('.additional_income-value');
appData.addExpenses = document.getElementsByClassName('.additional_expenses-value');
    = document.getElementsByClassName('.income_period-value');   
appData.budgetMonth = document.getElementsByClassName('.target_month-value');


      
for (const key in appData) {
   //console.log('Наша программа включает в себя данные: ' +  key + ': ' + appData[key]);
}

appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();
console.log('Месячный бюджет: ' + appData.budgetMonth);
console.log('Бюджен на день: ' + appData.budgetDay + ' Є');

appData.getTargetMonth();
if (appData.budgetMonth > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев.');
} else if (appData.budgetMonth <= 0) {
    console.log('Цель не будет достигнута.');  
}

appData.getStatusIncome();
console.log(appData.getStatusIncome());

appData.getInfoDeposit();
appData.calcSaveMoney();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());


