(function () {
    'use strict';

    var extend = function (destination, source) {
        if (!destination || !source) return destination;
        for (var key in source) {
            if (destination[key] !== source[key])
                destination[key] = source[key];
        }
        return destination;
    };
    let runtime_tests = [
        ['9 7 + 2.5 *', [40]],
        ['9 7 + 2.5 /', [6.4]],
        ['9 7 2.4 +', [9, 9.4]],
        ['a 7 2.4 -', ['a', 4.6]],
        ['9 7 swap', [7, 9]],
        ['1 2 3 swap', [1, 3, 2]],
        ['1 2 3 dup', [1, 2, 3, 3]],
        ['9 7 swap dup', [7, 9, 9]],
        ['1 {1:one 2:two} case', ['one']],
        ['alpha {beta:b alpha:a} case', ['a']],
        ['0 {0:[wow] +:[555]} case', [['wow']]],
        ['[+] {0:[wow] +:[555]} case', [[555]]],
        [`list_module import
        t {j:9 d:8 t:{s:" " g:[1 2 {a:3 b:4}]}} case g swap case pop a swap case`, [[1, 2], 3]],
        ['c {a:A b:B} case', [false]],
        ['2 6 dup2', [2, 6, 2, 6]],
        ['abc str-last', ['ab', 'c']],
        ["'abc ' str-last", ["'abc'", " "]],
        ["'abc ' str-first", ["'bc '", "a"]],
        ['abcdef str-length', [6]],
        ['"1a1" str-length', [3]],
        ['false false and', [false]],
        ['false true and', [false]],
        ['true false and', [false]],
        ['true true and', [true]],
        ['false false or', [false]],
        ['false true or', [true]],
        ['true false or', [true]],
        ['true true or', [true]],
        ['list_module import [a 1] 3 push', [['a', 1, 3]]],
        ['list_module import [a 1] dup 3 push', [['a', 1], ['a', 1, 3]]],
        ['list_module import [a 1 3] pop', [['a', 1], 3]],
        ['list_module import [] list-length', [0]],
        ['list_module import [[]] list-length', [1]],
        ['7 [dup +] apply', [14]],
        ['[B] [A] dip', ['A', ['B']]],
        ['[C] [B] [A] dip2', ['A', ['C'], ['B']]],
        ['3 [A] [B] [2 +] dip2', [5, ['A'], ['B']]],
        ['[A] apply', ['A']],
        ['2 3 [+] apply', [5]],
        ['1 1 [dup2 +] dup dip dup dip', [1, 1, 2, 3, ['dup2', '+']]],
        ['1 1 15 [dup2 +] dup dip2 swap 1 - swap dup dip2', [1, 1, 2, 3, 14, ['dup2', '+']]],
        ['[ dup 0 > [1 - swap dup dip2 swap repeat] [drop drop] if-else ] [repeat] def', []],
        ['1 [3 +] 6 repeat', [19]],
        ['10 20 30 40 2 bubble-up', [10, 30, 40, 20]],
        ['rec_module import {a:5 b:3} b get', [{ 'a': 5, 'b': 3 }, 3]],
        ['rec_module import {a:5 b:3} b get 8 + a set', [{ 'a': 11, 'b': 3 }]],
        ['rec_module import {a:5 b:3} dup b get 8 + a set', [{ 'a': 5, 'b': 3 }, { 'a': 11, 'b': 3 }]],
        ['list_module import rec_module import {a:{b:[1 2 3]}} dup a get b get 4 push b set a set', [{ 'a': { 'b': [1, 2, 3] } }, { 'a': { 'b': [1, 2, 3, 4] } }]],
        ['list_module import rec_module import {a:{b:[1 2 3]}} dup a get b get 4 push', [{ 'a': { 'b': [1, 2, 3] } }, { 'a': { 'b': [1, 2, 3] } }, { 'b': [1, 2, 3] }, [1, 2, 3, 4]]],
        [`list_module import rec_module import
        [ dup 0 > [1 - swap dup dip2 swap repeat] [drop drop] if-else ] [repeat] def
         [ rel-x get [ rel-y get] dip [] swap push swap push] [get-rel-vec] def
         [{rel-x:12 rel-y:-2}] [mouse-move-sim] def
         [[pop swap] [dup list-length] dip swap repeat drop] [pop-all] def
         mouse-move-sim get-rel-vec pop-all`, [{ 'rel-x': 12, 'rel-y': -2 }, -2, 12]],
        ['list_module import 0 1 [] [[swap] dip [dup] dip2 [+] dip swap dup [push] dip swap] apply', [1, 1, [1]]],
        ['[true] [true] [false] ifte', ["true"]],
        [`list_module import [1 2 3 4 5 6 7 8 9 10 11 12 13 14 15] [dup 2 % 0 == [-1 *] if] map`, [[1, -2, 3, -4, 5, -6, 7, -8, 9, -10, 11, -12, 13, -14, 15]]],
        ['list_module import [5 4 3] [dup 2 / 2 - 0 > [] cons cons] map', [[[5, true], [4, false], [3, false]]]],
        ['list_module import [1 2 3] [2 *] map [3 >] filter 0 [+] reduce', [10]],
        ['list_module import [[1 2] [2 3] [3 4]] [[-1 *] map] map', [[[-1, -2], [-2, -3], [-3, -4]]]],
        ['list_module import [true true false true] true [and] reduce # all', [false]],
        ['list_module import [true true true true] true [and] reduce # all', [true]],
        ['list_module import [false false false false] false [or] reduce # any', [false]],
        ['list_module import [false true false true] false [or] reduce # any', [true]],
        ['[1 2 3 4 5 6] [3 >] filter', [[4, 5, 6]]],
        [
            `list_module import
{
 named-args:[a b]
 local-words:{}
 definition:[a b /]
} [test-named_args] define
# test of named_args
3 4 test-named_args`, [0.75]],
        [`list_module import
str_module import
{named-args:[a b]
 local-words:{see-arg:[dup apply swap pop swap drop ' is ' str-append swap str-append]}
 definition:[[a] see-arg [b] see-arg]
} [test-named_args] define
# test of named_args
[4 5] {a:x} test-named_args
`, ['a is [4 5]', 'b is {a:x}']],
        [`list_module import
{
 named-args:[c q]
 local-words:{
    init-a:[[[ ]] [a] local-def]
    update-a: [a cons [] cons [a] local-def]
    destructive-first:[c pop swap [] cons [c] local-def]
    maponto:[c list-length 0 > 
        [destructive-first q apply update-a maponto ]
   [] if-else]
 }
 definition: [init-a maponto a]
} [maptest] define
10 10 10 10 10 [0 1 2 3] [*] maptest 
[0 1 2 3] [9 +] maptest`, [10, [0, 10, 20, 30], [9, 10, 11, 12]]],
        [`
list_module import
[7 1] [5 +] map
10 10 10 10 [0 1 2 3] [swap /] map-under
[dup 3 + swap -1 * 7 + [] cons cons] [myword] def
[1 2 3] [myword] map-under
`
            , [[12, 6],
            [0, 0.1, 0.2, 0.3],
            [[4, 6], [5, 5], [6, 4]]]
        ]];

    var runtime_test = function (Pounce_ast, parser_actions) {
        console.log('Starting runtime tests:');
        let RTtestCount = 0;
        let RTtestsFailed = 0;
        runtime_tests.forEach((test, i) => {
            const ps = test[0];
            const expected_stack = test[1];

            //console.log('starting parse test for: ', ps);
            const [remainder_pl, result_pl] = pounce.run(Pounce_ast.parse(ps + ' ', { actions: parser_actions }), [], [pounce.words]);
            RTtestCount += 1;
            if (!deepCompare(result_pl, expected_stack)) {
                RTtestsFailed += 1;
                console.log(result_pl, ' expected:', expected_stack);
                console.log('---- Failed run test for: ', ps);
                runtime_tests[i][2] = false;
                runtime_tests[i][3] = result_pl;
            }
            else {
                runtime_tests[i][2] = true;
            }
        });

        if (RTtestsFailed === 0) {
            console.log('All', RTtestCount, 'tests passed.');
        }
    }

    function deepCompare() {
        var i, l, leftChain, rightChain;

        function compare2Objects(x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on the step where we compare prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good as we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object being a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (i = 1, l = arguments.length; i < l; i++) {

            leftChain = []; //Todo: this can be cached
            rightChain = [];

            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

    var exported = { runtime_test: runtime_test, runtime_tests: runtime_tests };

    if (typeof require === 'function' && typeof exports === 'object') {
        extend(exports, exported);
    } else {
        var namespace = typeof this !== 'undefined' ? this : window;
        namespace.runtime_test = exported;
    }
})();
