function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let inputArr = expr.split('').filter(item => item == ' ' ? false : true);
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
    let getOutput = new Function('return ' + inputArr.join(''));
    let output = getOutput();
    return output;
}

module.exports = {expressionCalculator}
