    var expForShowing = '';
    var exp = '';
    function addItem (item) {
        exp += item;
        if (item === '*') item = '&times';
        if (item === '/') item = '&divide';
        expForShowing += item;
        document.getElementsByClassName('culc-result')[0].innerHTML = expForShowing;
    }

    function clearAll () {
        expForShowing = '';
        exp = '';
        addItem('');
    }

    function removeItem() {
        if (expForShowing[expForShowing.length-1] === 's'){
            expForShowing = expForShowing.substr(0, expForShowing.length-6);
        } else if (expForShowing[expForShowing.length-1] === 'e'){
            expForShowing = expForShowing.substr(0, expForShowing.length-7);
        } else {
            expForShowing = expForShowing.substr(0, expForShowing.length-1);
        }
        exp = exp.substr(0, exp.length-1);
        document.getElementsByClassName('culc-result')[0].innerHTML = expForShowing;
    }
    var culc = function () {
        /testing for bracket/
        isBracket ();

        /do division/
        doOperations('/', exp);

        /do multiply and division/
        doOperations('*', exp);

        /do sum/
        doOperations('+', exp);

        /do diff/
        doOperations('-', exp);

        expForShowing = exp;
        document.getElementsByClassName('culc-result')[0].innerHTML = expForShowing;


        function isBracket () {
            var bracketOpen = exp.indexOf('(');
            var bracketClose = exp.indexOf(')');

            if (bracketOpen != -1 || bracketClose != -1){

                var bracket = '('+innerExp+')';

                doOperations('*', bracket);

                doOperations('/', bracket);

                doOperations('+', bracket);

                doOperations('-', bracket);
                exp = exp.replace(bracket, result);
            }
        }

        function doOperations(operation) {
            if (operation === '*'){
                for (var i = 0; i < exp.length; i++) {
                    var result = '';
                    if (exp[i] === operation) {
                        var partBeforeOperation = exp.substr(0, i);
                        var partAfterOperation = exp.substr(i + 1, exp.length - i - 1);
                        for (var j = partBeforeOperation.length; j >= 0; j--){
                            if (partBeforeOperation[j] === '/' || partBeforeOperation[j] === '+' ||
                                partBeforeOperation[j] === '-'){
                                var a = partBeforeOperation.substr(j + 1, partBeforeOperation.length - j - 1);
                                break
                            }
                        }
                        for (var j = 0; j < partAfterOperation.length; j++){
                            if (partAfterOperation[j] === '*' || partAfterOperation[j] === '/' ||
                                partAfterOperation[j] === '+' || partAfterOperation[j] === '-'){
                                var b = partAfterOperation.substr(0, j);
                                break
                            }
                        }
                        if (!a){
                            var a = partBeforeOperation;
                        }
                        if (!b){
                            var b = partAfterOperation;
                        }
                        var result = mult(a, b);
                        if (result || result === 0){
                            exp = exp.replace(exp.substr(i - a.length, a.length + b.length + 1), result);
                            i = 0;
                            a = '';
                            b = '';
                        }
                    }
                }
            } else if (operation === '/'){
                for (var i = 0; i < exp.length; i++) {
                    var result = '';
                    if (exp[i] === operation) {
                        var partBeforeOperation = exp.substr(0, i);
                        var partAfterOperation = exp.substr(i + 1, exp.length - i - 1);
                        for (var j = partBeforeOperation.length; j >= 0; j--){
                            if (partBeforeOperation[j] === '*' || partBeforeOperation[j] === '+' ||
                                partBeforeOperation[j] === '-'){
                                var a = partBeforeOperation.substr(j + 1, partBeforeOperation.length - j - 1);
                                break
                            }
                        }
                        for (var j = 0; j < partAfterOperation.length; j++){
                            if (partAfterOperation[j] === '*' || partAfterOperation[j] === '/' ||
                                partAfterOperation[j] === '+' || partAfterOperation[j] === '-'){
                                var b = partAfterOperation.substr(0, j);
                                break
                            }
                        }
                        if (!a){
                            var a = partBeforeOperation;
                        }
                        if (!b){
                            var b = partAfterOperation;
                            if (b === 0){
                                return document.getElementsByClassName('culc-result')[0].innerHTML =
                                    'ERROR, division by 0';
                            }
                        }
                        var result = division(a, b);
                        if (result){
                            exp = exp.replace(exp.substr(i - a.length, a.length + b.length + 1), result);
                            i = 0;
                            a = '';
                            b = '';
                        }
                    }
                }
            } else if (operation === '-'){
                for (var i = 0; i < exp.length; i++) {
                    var result = '';
                    if (exp[i] === operation) {
                        var partBeforeOperation = exp.substr(0, i);
                        var partAfterOperation = exp.substr(i + 1, exp.length - i - 1);
                        for (var j = partBeforeOperation.length; j >= 0; j--){
                            if (partBeforeOperation[j] === '/' || partBeforeOperation[j] === '+' ||
                                partBeforeOperation[j] === '*'){
                                var a = partBeforeOperation.substr(j + 1, partBeforeOperation.length - j - 1);
                                break
                            }
                        }
                        for (var j = 0; j < partAfterOperation.length; j++){
                            if (partAfterOperation[j] === '*' || partAfterOperation[j] === '/' ||
                                partAfterOperation[j] === '+' || partAfterOperation[j] === '-'){
                                var b = partAfterOperation.substr(0, j);
                                break
                            }
                        }
                        if (!a){
                            var a = partBeforeOperation;
                        }
                        if (!b){
                            var b = partAfterOperation;
                        }
                        var result = diff(a, b);
                        if (result || result === 0){
                            exp = exp.replace(exp.substr(i - a.length, a.length + b.length + 1), result);
                            i = 0;
                            a = '';
                            b = '';
                        }
                    }
                }
            } else if (operation === '+'){
                for (var i = 0; i < exp.length; i++) {
                    var result = '';
                    if (exp[i] === operation) {
                        var partBeforeOperation = exp.substr(0, i);
                        var partAfterOperation = exp.substr(i + 1, exp.length - i - 1);
                        for (var j = partBeforeOperation.length; j >= 0; j--){
                            if (partBeforeOperation[j] === '/' || partBeforeOperation[j] === '-' ||
                                partBeforeOperation[j] === '*'){
                                var a = partBeforeOperation.substr(j + 1, partBeforeOperation.length - j - 1);
                                break
                            }
                        }
                        for (var j = 0; j < partAfterOperation.length; j++){
                            if (partAfterOperation[j] === '*' || partAfterOperation[j] === '/' ||
                                partAfterOperation[j] === '+' || partAfterOperation[j] === '-'){
                                var b = partAfterOperation.substr(0, j);
                                break
                            }
                        }
                        if (!a){
                            var a = partBeforeOperation;
                        }
                        if (!b){
                            var b = partAfterOperation;
                        }
                        var result = sum(a, b);
                        if (result){
                            exp = exp.replace(exp.substr(i - a.length, a.length + b.length + 1), result);
                            i = 0;
                            a = '';
                            b = '';
                        }
                    }
                }
            }
        }
    };

    function mult(a,b) {
        return Number(a)*Number(b)
    }

    function division(a,b) {
        if (Number(b) === 0){
            return  document.getElementsByClassName('culc-result')[0].innerHTML =
                'ERROR, division by 0';
    }
        return Number(a)/Number(b)
    }

    function sum(a,b) {
        return Number(a)+Number(b)
    }

    function diff(a,b) {
        return Number(a)-Number(b)
    }

document.getElementsByClassName('btn equal-horizontal double-right')[0].addEventListener('mousedown',function (event) {
    document.getElementsByClassName('btn equal-vertical triple-right')[0].classList.toggle('equal-vertical-clicked');
});

document.getElementsByClassName('btn equal-horizontal double-right')[0].addEventListener('mouseup',function (event) {
    document.getElementsByClassName('btn equal-vertical triple-right')[0].classList.toggle('equal-vertical-clicked');
});

document.getElementsByClassName('btn equal-vertical triple-right')[0].addEventListener('mousedown',function (event) {
    document.getElementsByClassName('btn equal-horizontal double-right')[0].classList.toggle('equal-horizontal-clicked');
});

document.getElementsByClassName('btn equal-vertical triple-right')[0].addEventListener('mouseup',function (event) {
    document.getElementsByClassName('btn equal-horizontal double-right')[0].classList.toggle('equal-horizontal-clicked');
});
