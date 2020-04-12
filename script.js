' use strict ';

let startButt = document.getElementById('start'),
canselButt = document.querySelector('#cancel'),
salaryAmount = document.querySelector('.salary-amount'),
incomePlus = document.getElementsByTagName('button')[0],

expensesPlus = document.getElementsByTagName('button')[1],
incomeItem = document.querySelectorAll('.additional_income-item'),

additExpenItemm = document.querySelector('.additional_expenses-item'),
depositCheck = document.querySelector('#deposit-check'),

//incomeTitle = document.querySelector('.income-title'),!!
incomeAmount = document.querySelector('.income-amount'),
expensesTitle = document.querySelector('.expenses-title'),

expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items'),

targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
//part right
budgetMonthValue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
additionalIncomeValue = document.querySelector('.additional_income-value'),
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'), 
targetMonthValue = document.querySelector('.target_month-value');
/*console.log(startButt);
console.log(canselButt);
console.log(salaryAmount);
console.log(incomePlus);

console.log(expensesPlus);*/
console.log(incomeItems);
/*console.log(expenItemm);
console.log(depositCheck);*/

//console.log(incomeTitle);!!
//console.log(incomeAmount);
/*console.log(expensesTitle);
console.log(expensesAmount);

console.log(targetAmount);
console.log(periodSelect);

console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);*/

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 
let isstring = function(m) {
     return isNaN(m) || m !== '' || m === null;
};

let appData = {
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission:  735000,
    period: 24,
    start: function() {
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должна быть заполнено!');
            return;
        }
        appData.budget = salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value =  Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additExpenItemm.value = appData.addExpenses.join(', ');
        incomeItem.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());

    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';

        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.expenses[itemIncome] = +cashIncome;
                }        
        });
     },
    getAddExpenses: function() {
         let addExpenses = additExpenItemm.value.split(',');
         addExpenses.forEach(function(item) {
             item = item.trim();
             if (item !== '') {
                 appData.addExpenses.push(item);
             }
         });
     },
     getAddIncome: function() {
        incomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
     },

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

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'путишуствие, Дом, машина, квартира');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        console.log(appData.addExpenses);

        let strExp= '';
        for (let str of appData.addExpenses) {
            str = str.trim();
            strExp += ((str[0].toUpperCase() + str.slice(1))+ ', ');
        }
        console.log(strExp);
         
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log(typeof appData.deposit);
        appData.income = prompt('Ваш дополнительный вид дохода?', 'Девиденды');
        console.log(typeof appData.income);   
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
        return targetAmount.value / appData.budgetMonth;
            
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

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click',  appData.addIncomeBlock);
      
for (const key in appData) {
  //console.log('Наша программа включает в себя данные: ' +  key + ': ' + appData[key]);
}
console.log('Расходы за месяц: ' + appData.expensesMonth);
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



 


