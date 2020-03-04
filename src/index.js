function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let inputArr = expr.split('').filter(item => item == ' ' || item == '' ? false : true);
    for (let i = 0; i < inputArr.length-1; i++) {
      if ( /\d+/.test(inputArr[i]) && /\d+/.test(inputArr[i+1]) ){
        inputArr[i] += inputArr[i+1];
        inputArr.splice(i+1, 1);
        i--;
      }
    }
    let openBracket = 0;
    let closeBracket = 0;
    inputArr.forEach(el => {
      if (el === '(') openBracket++;
      if (el === ')') closeBracket++;
    });
    if (openBracket !== closeBracket) throw new Error('ExpressionError: Brackets must be paired.');
    for (let i = 0; i < inputArr.length-1; i++) {
      if( inputArr[i] == '/' && inputArr[i+1] == 0 ) throw new Error('TypeError: Division by zero.');
    }

    let priority = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '(': 0,
      ')': 0
    };
    let numbersStack = [];
    let operatorsStack = [];
    for (let i = 0; i < inputArr.length; i++) {
      if (/\d+/.test(inputArr[i])){
        numbersStack.push(+inputArr[i]);
        continue;
      }
      if (inputArr[i] == '('){
        operatorsStack.push(inputArr[i]);
        continue;
      }
      if (inputArr[i] == ')'){
        while (operatorsStack[operatorsStack.length-1] !== '('){
          calc();
        }
        operatorsStack.pop();
        continue;
      }
      if ( priority[inputArr[i]] > priority[operatorsStack[operatorsStack.length-1]]){
          operatorsStack.push(inputArr[i]);
          continue;
      }
      while(priority[inputArr[i]] <= priority[operatorsStack[operatorsStack.length-1]] ){
        calc();
      }
      operatorsStack.push(inputArr[i]);
    }
    while(operatorsStack.length > 0){
      calc();
    }

    function calc (){
      if (operatorsStack.length == 0) throw new Error ('Calc: not have operator!');
      let operator = operatorsStack.pop();
      let b = numbersStack.pop();
      let a = numbersStack.pop();
      let result;
      switch (operator){
        case '-':
        result = a - b;
        numbersStack.push(result);
        break;

        case '+':
        result = a + b;
        numbersStack.push(result);
        break;

        case '*':
        result = a * b;
        numbersStack.push(result);
        break;

        case '/':
        result = a / b;
        numbersStack.push(result);
        break;
      }
    }
    return numbersStack[0];
}

module.exports = {expressionCalculator}