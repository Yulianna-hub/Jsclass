'use strict';

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
periodAmount = document.querySelector('.period-amount'),
//part right
budgetMonthVallue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
accumulatedIncomeValue = document.querySelector('.accumulated_income-value'),
additionalIncomeValue = document.querySelector('.additional_income-value'),
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'), 
targetMonthValue = document.querySelector('.target_month-value');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 
const isstring = function(m) {
     return isNaN(m) || m !== '' || m === null;
};

class AppData {
    constructor() {   
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.expensesMonth = 0,
    this.incomeMonth = 0,
    this.budget = 0,
    this.income = {},
    this.addIncome = [],
    this.expenses = {},
    this.addExpenses = [],
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0
} 
start() {
        startButt.style.display = 'none';
        canselButt.style.display = 'block';
        document.querySelectorAll('.data input[type=text]').forEach(function(elem){elem.disabled = true});
        
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getAddIncome();
        this.getAddExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.showResult(); 
}
showResult() { 
    budgetMonthVallue.value = this.budgetMonth;
    budgetDayValue.value =  Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSaveMoney();
    periodAmount.value = periodSelect.value;
    periodSelect.addEventListener('change', this.chengeSaveMoney.bind(this));
}
chengeSaveMoney() {
    incomePeriodValue.value = this.calcSaveMoney();
}
addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3){
        expensesPlus.style.display = 'none';

    }
}
addIncomeBlock() {
    let cloneIncomeItemms = incomeItemms[0].cloneNode(true);
    incomeItemms[0].parentNode.insertBefore(cloneIncomeItemms,incomePlus);
    incomeItemms = document.querySelectorAll('.income-items');

    if (incomeItemms.length === 3){
        incomePlus.style.display = 'none';
    }
}
getExpInc() {
    const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitel = item.querySelector(`.${startStr}-title`).value;
        const itemAmaunt = item.querySelector(`.${startStr}-amount`).value;
        if(itemTitel !== '' && itemAmaunt !== '') {
            this[startStr][itemTitel] = itemAmaunt;
        }         
    };
    incomeItemms.forEach(count);
    expensesItems.forEach(count); 
    
   for (const key in this.income) {
        this.incomeMonth += +this.income[key];
    }

}
getAddExpenses() {
        this.addExpenses = [];
    const addExpenses = additExpenItemm.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
}
getAddIncome() {
    this.addIncome = [];
    additionalIncomeItem.forEach(item =>{
        const itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
 }
getExpensesMonth() { 
    
    for (const key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
}   
getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;

}
getTargetMonth() { 

    return targetAmount.value / this.budgetMonth;
        
}
getStatusIncome() {

    if (this.budgetDay >= 170) {
        return ('У вас высокий уровень дохода.');
    } else if (this.budgetDay < 170 && this.budgetDay > 85) {
        return ('У вас средний уровень дохода.'); 
    } else if (this.budgetDay <= 85 && this.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего.');
    } else if (this.budgetDay <= 0) {
        return ('Что то пошло не так.');
    } 
}
getInfoDeposit() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        do {
        this.percentDeposit = prompt('Какой годовой процент?', 1.75);
        } while(!isNumber(this.percentDeposit));
        do { 
        this.moneyDeposit = prompt('Какая сумма заложенна?' , 150000);
        } while(!isNumber(this.moneyDeposit));
    }
}
calcSaveMoney() {
    return this.budgetMonth * periodSelect.value;
}
inputTypeRange (event) {
document.querySelector('.period-amount').textContent = (event.target.value);

}
cancelCalckRes() {
    canselButt.style.display = 'none';
    startButt.style.display = 'block';
    Object.assign(this, new AppData());
    document.querySelectorAll('input, button').forEach(elem=>elem.value = '');
    document.querySelectorAll('input, button').forEach(elem=>elem.disabled = false);
    document.querySelector('.period-amount').textContent  = 1;
    startButt.disabled = true;

    const i = 0;
    expensesItems.forEach((el, i) => {
        if (i !== 0) {
          el.remove();
        }
      });
      expensesPlus.style.display = "";
      incomeItemms.forEach((el, i) => {
        if (i !== 0) {
          el.remove();
        }
      });
      incomePlus.style.display = "";   
}
eventListeners() {
    startButt.addEventListener('click', this.start.bind(this));      
    canselButt.addEventListener('click', this.cancelCalckRes.bind(this)); 
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('change', this.inputTypeRange);
    salaryAmount.addEventListener('input', function() {
    startButt.disabled = !salaryAmount.value.trim();
    });
}
}

const appData = new AppData();
console.log(appData);
appData.eventListeners();

 


   
    
 













 


