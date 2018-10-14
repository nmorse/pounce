
const tutorials = ['introduction', 'hello world', 'calculate', 'rearrange the stack', 'your own words', 'some I/O'];
const examples = [
  ['', {summary:'start here', desc:`
  Pounce is a programming language, with the goal of letting anyone try out this rather 'different' style of programming. Everything you need is right here.
  A word about 'words': Words are the basic unit of programming Pounce. In Pounce, words can be data or functions, but we thought you should know that everything in the Pounce language is refered to as a word.
  ## The Page is layed out to help
  1. The Blue Box is for program code (to be run). As you go through the tutorial, code will be entered for you or you can type in your own 'words' at any time.
  2. The Gray Box to the left is the 'stack'. The working memory of the program will show up here. Also, just to the right, when running in debug mode, you will see the history of the program and the stack as it ran.
  3. The top area will show you the definition of words. When the cursor is on a word in the program code the definition of that word will pop up. 
  `, tutorial: 'introduction', level:1}],
  ['', {summary:'using this tutorial', desc:'', tutorial: 'introduction', level:2}],
  ['', {summary:'how to code differently', desc:'Its a "Noun then Verb" pattern', tutorial: 'introduction', level:3}],
  
['"hello " "world" str-append', {summary:'Working with strings', desc:'"hello world":0, In this iconic example, two strings are pushed on to a stack, then "str-append" is applied and the result is left on the stack.', tutorial: 'hello world', level:1}],
['`a` \'b\' "c" d str-append str-append str-append', {summary:'Strings can be quoted or words with no spaces can be strings as well.', desc:'Here is how concatenative programming works: Values are pushed on to a stack then verbs (the functions) act on the stack, you can see that two strings preceed "str-append", and the result is left on the stack.', tutorial: 'hello world', level:2}],
['2 3 +', {summary:'Sum of two numbers', desc:'Math is easy to do, the only difference is that the operator (+ for addition) comes after the two numbers being added.', tutorial: 'calculate', level:1}],
['2 3 *', {summary:'Simple Multiplication', desc:'For multiplication, the operator (* for the product or multiplication) is placed after the two numbers to be multiplied.', tutorial: 'calculate', level:2}],
['9 7 + 2.5 /', {summary:'Sum of two numbers', desc:'To add and then divide, say (9 + 7) / 2.4. Notice how no parenthases are needed when the operators are after the numbers. ', tutorial: 'calculate', level:3}],
['9 7 2.4 + /', {summary:'Sum of two numbers', desc:'To divide by a sum, say 9  / (7 + 2.4). Notice how no parenthases are needed when the operators are after the numbers. ', tutorial: 'calculate', level:4}],
['9 7 swap', {summary:'Sum of two numbers', desc:'To divide by a sum, say 9  / (7 + 2.4). Notice how  no parenthases are needed when the operators are after the numbers. ', level:1, tutorial:'rearrange the stack'}],
['1 2 3 dup', {summary:'Sum of two numbers', desc:'To divide by a sum, say 9  / (7 + 2.4). Notice how no parenthases are needed when the operators are after the numbers. ', level:2, tutorial:'rearrange the stack'}],
['9 7 swap dup',{summary:'Sum of two numbers', desc:'To divide by a sum, say 9  / (7 + 2.4). Notice how no parenthases are needed when the operators are after the numbers. ', level:3, tutorial:'rearrange the stack'}],
['10 20 30 40 2 bubble-up',{summary:'Sum of two numbers', desc:'To divide by a sum, say 9  / (7 + 2.4). Notice how no parenthases are needed when the operators are after the numbers. ', level:4, tutorial:'rearrange the stack'}],
[
`canvas cb-init cb-clear
4 7 30 112 cb-line
59 122 130 99 cb-line
{color:{r:64 g:0 b:255 a:0.5} x:30 y:40 w:60 h:40} cb-box
{color:{r:255 g:63 b:127 a:0.5} x:60 y:50 w:40 h:50} cb-box
drop
`,{summary:'Draw some shapes', desc:'Draws lines and rectangles on the canvas as a drawing demo', level:1, tutorial:'some I/O'}],
[
`canvas cb-init cb-clear
30 45 cb-begin-path
50 60 cb-line-to
100 10 cb-line-to
cb-end-path
drop
`, {summary:'Draw a check-mark', desc:'Draws a line on the canvas', level:2, tutorial:'some I/O'}],
[
`[[x set] dip y set] [pack] def
[y get [x get] dip] [unpack] def
canvas cb-init cb-clear
30 45 pack unpack cb-begin-path unpack [20 +] dip 20 + cb-line-to
100 10 cb-line-to cb-end-path
drop
`, {summary:'Turtle Graphics', desc:'Draws a line, relative to possition', level:3, tutorial:'some I/O'}],
[
`canvas cb-init cb-clear
images/pounce-cat1.png cb-load-image
`, {summary:'Image on the canvas', desc:'Draws an image on the canvas', level:4, tutorial:'some I/O'}],
[
`[ dup 0 > [1 - swap dup dip2 swap repeat] [drop drop] if-else ] [repeat] def
0 1 [] [[swap] dip [dup] dip2 [+] dip swap dup [push] dip swap] 8 repeat`, {summary:'define a word "repeat" and use it to fill an array', desc:'', level:1, tutorial:'your own words'}],
[`{local-words:{
p-n-get:[n get [p get] dip]
n-f-get:[n get [f get] dip]
n-inc:[n get 1 + n set]
prime-factor?:[p-n-get % 0 == [n-f-get push f set p-n-get / p set] [n-inc] if-else]
factorize:[p get 1 <= [f get] [prime-factor? factorize] if-else]
check-integer:[dup 0 > not [drop 1] if]
package:[{n:2 f:[]} swap check-integer p set]
clean-up:[swap drop]
}
expects: [{desc: 'a positive' ofType: 'integer'}]
effects: [0]
definition:[package factorize clean-up]
desc:'Prime factors of a number'
} [factor] define
210 factor
`, {summary:'find the prime factors of a number', desc:'', level:2, tutorial:'your own words'}],
[`[[dup] dip2 [dup] dip dup 4 bubble-up 3 bubble-up 2 bubble-up] [dup3] def
4 [15] 6 dup3 [4 push] dip`, {summary:'define dup3', desc:'dup3', level:3, tutorial:'your own words'}]
];

const sortBylevel = (e) => e.sort((a, b) => (level_order[a[1].tutorial]+(a[1].level*0.01) > level_order[b[1].tutorial]+(b[1].level*0.01))? 1: -1);
const level_order = {"introduction":-1, "hello world":0, "basic":1, "rearrange the stack":2, "canvas": 3, "advanced":4};
