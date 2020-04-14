' use strict ';

let startButt = document.getElementById('start'),
//canselButt = document.querySelector('#cancel'),
salaryAmount = document.querySelector('.salary-amount'),
incomePlus = document.getElementsByTagName('button')[0],

expensesPlus = document.getElementsByTagName('button')[1],
additionalIncomeItem = document.querySelector('.additional_income-item'),

additExpenItemm = document.querySelector('.additional_expenses-item'),
depositCheck = document.querySelector('#deposit-check'),

incomeTitle = document.querySelector('.income-title'),
expensesTitle = document.querySelector('.expenses-title'),

expensesItems = document.querySelectorAll('.expenses-items'),
incomeItemms = document.querySelectorAll('.income-items'),

targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
//part right
budgetMonthVallue = document.getElementsByClassName('.budget_month-value')[0],
budgetDayValue = document.getElementsByClassName('.budget_day-value')[0],
expensesMonthValue = document.getElementsByClassName('.expenses_month-value')[0],
accumulatedIncomeValue = document.getElementsByClassName('.accumulated_income-value')[0],
additionalIncomeValue = document.getElementsByClassName('.additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('.income_period-value')[0], 
targetMonthValue = document.getElementsByClassName('.target_month-value')[0];

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
    start: function() {
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должна быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value;
        
        //appData.getTargetMonth();
        appData.getStatusIncome();
        appData.getInfoDeposit();
        appData.calcSaveMoney();

        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudgetDay();
        appData.getBudgetMonth();
        appData.showResult();
    },

    showResult: function() {
        budgetMonthVallue.value = appData.budgetMonth;
        budgetDayValue.value =  Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSaveMoney();
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
    getAddExpenses: function() {
        let addExpenses = additExpenItemm.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    /*getIncome: function(){
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
        for (let key in appData.income){
            appData.incomeMonth += appData.income[key];
        }

    },*/
    addIncomeBlock: function() {
        let cloneIncomeItemms = incomeItemms[0].cloneNode(true);
        incomeItemms[0].parentNode.insertBefore(cloneIncomeItemms,incomePlus);
        incomeItemms = document.querySelectorAll('.income-items');

        if (incomeItemms.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItemms.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome!== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }          
        });
     },
     getAddIncome: function() {
        let addIncome = additionalIncomeItem.value.split(',');
        addIncome.forEach(function(item){
            item =  item.trim();
            if (item !== '') {
               appData.addIncome.push(item);
                console.log(item);
            }
        });
        console.log(addIncome);
     },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },    
    getBudgetMonth: function() {
        
      appData.budgetMonth = appData.budget + appData.income - appData.expensesMonth;
    },
    getBudgetDay: function() {
        let day = 30;
        appData.budgetDay = appData.budgetMonth / day;

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
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
        return appData.budgetMonth * periodSelect.value;
    }

};

startButt.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click',  appData.addIncomeBlock);
      
for (const key in appData) {
  //console.log('Наша программа включает в себя данные: ' +  key + ': ' + appData[key]);
}


/*if (appData.budgetMonth > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев.');
} else if (appData.budgetMonth <= 0) {
    console.log('Цель не будет достигнута.');  
}*/


//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());



 


