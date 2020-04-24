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

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}; 
let isstring = function(m) {
     return isNaN(m) || m !== '' || m === null;
};

class AppData {
    constructor(budgetDay = 0,
        budgetMonth = 0,
        expensesMonth = 0,
        incomeMonth = 0,
        budget = 0,
        income = {},
        cashCount = [],
        //addIncome = [],
        expenses = {},
        //addExpenses = [],
        deposit = false,
        percentDeposit = 0,
        moneyDeposit = 0
    ) {
    
    this.budgetDay = budgetDay;
    this.budgetMonth = budgetMonth;
    this.expensesMonth = expensesMonth;
    this.incomeMonth = incomeMonth;
    this.cashCount = cashCount;
    this.budget = budget;
    this.income = income;
    //this.addIncome = addIncome;
    this.expenses = expenses;
    //this.addExpenses = addExpenses;
    this.deposit = deposit;
    this.percentDeposit = percentDeposit;
    this.moneyDeposit =moneyDeposit;
    }
   
start() {
        startButt.style.display = 'none';
        canselButt.style.display = 'block';
        document.querySelectorAll('.data input[type=text]').forEach(function(elem){elem.disabled = true});
        
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getAddIncomExpens();
        
        //this.getAddIncome();
        //this.getAddExpenses();
        //this.getExpensesMonth();
        
        
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
/*addExpensesBlock() {
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

}*/
addIncomExpensBlock() {

    const blokStr = (Itemms[0].cloneNode(true)).className.split('-')[1]; 
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
    incomeItemms[0].parentNode.insertBefore(cloneIncomeItemms,incomePlus);
    const expensesItemms = document.querySelectorAll(`.expenses-${blokStr}`);
    const incomeItemms = document.querySelectorAll(`.income-${blokStr}`);
    console.log(incomeItemms);
    
    if (incomeItemms.length === 3 && expensesItemms.length === 3){
        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';

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

/*getAddExpenses() {
        this.addExpenses = [];
    let addExpenses = additExpenItemm.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
}
getAddIncome() {
    this.addIncome = [];
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    }, this);
 }*/
 getAddIncomExpens() {
    this.cashCount = [];
    const addExpenses = additExpenItemm.value.split(',');
    const cashItem = item => {
    item = item.trim();
    if (item !== '') {
        this.cashCount.push(item);
    }
    let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.cashCount.push(itemValue);
        }
    }; 

addExpenses.forEach(cashItem);
additionalIncomeItem.forEach(cashItem);

for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
}

}
 
/*getExpensesMonth() { 
    
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
} */   
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

    let i = 0;
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

 


   
    
 













 


