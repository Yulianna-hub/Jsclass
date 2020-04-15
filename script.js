' use strict ';

let startButt = document.getElementById('start'),
canselButt = document.querySelector('#cancel'),
salaryAmount = document.querySelector('.salary-amount'),
incomePlus = document.getElementsByTagName('button')[0],

expensesPlus = document.getElementsByTagName('button')[1],
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

additExpenItemm = document.querySelector('.additional_expenses-item'),
depositCheck = document.querySelector('#deposit-check'),

incomeTitle = document.querySelector('.income-title'),
expensesTitle = document.querySelector('.expenses-title'),

expensesItems = document.querySelectorAll('.expenses-items'),
incomeItemms = document.querySelectorAll('.income-items'),

targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount');
//part right
budgetMonthVallue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
accumulatedIncomeValue = document.querySelector('.accumulated_income-value'),
additionalIncomeValue = document.querySelector('.additional_income-value'),
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'), 
targetMonthValue = document.querySelector('.target_month-value');

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
    incomeMonth: 0,
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
      
        appData.budget = +salaryAmount.value;
    
        appData.getIncome();
        appData.getIncomeMonth();
        appData.getAddIncome();

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        
        appData.getBudget();
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
        periodAmount.value = periodSelect.value;

        periodSelect.addEventListener('change', appData.chengeSaveMoney);  
    },
    chengeSaveMoney: function() {
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
                appData.expenses[itemExpenses] = + cashExpenses;
            }
        });
    },
    getAddExpenses: function() {
            appData.addExpenses = [];
        let addExpenses = additExpenItemm.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
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
                    appData.income[itemIncome] = + cashIncome;
                }          
        });
     },
     getAddIncome: function() {
        appData.addIncome = [];
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
     },
     getIncomeMonth: function() { 
        
        for (let key in appData.income) {
            appData.incomeMonth += + appData.income[key];
        }
    },    
    getExpensesMonth: function() { 
        
        for (let key in appData.expenses) {
            appData.expensesMonth += + appData.expenses[key];
        }
    },    
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;

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
    },
    inputTypeRange: function(event) {
    document.querySelector('.period-amount').textContent = (event.target.value);
    console.log(event.target.value);

    }

};

startButt.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click',  appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.inputTypeRange);

salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value === ''){
        startButt.disabled = true;
     } else {
         startButt.disabled = false;
     }
});
//версия 2, чуть короче
/*salaryAmount.addEventListener('input', function() {
startButt.disabled = salaryAmount.value === '';
});
 */


 


