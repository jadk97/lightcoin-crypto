class Account {
  constructor(username) {
    //this.username = username;
    // this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let index of this.transactions){
      balance += index.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()){
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    //this.account.balance += this.value;
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed(){
    return true;
  }

}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed(){
    return (this.account.balance - this.amount > 0);
  }
}



const myAccount = new Account();

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);

console.log("Transactions", myAccount.transactions);
