
# Introducing the Pounce Programming Language
Pounce is a concatenative programming language that works in the Browser, Server and IoT.
The aim of Pounce is to encourage programmers to try conatenative programming. Since Pounce works in your browser, so you can try it out easily. If you like this style of programming, you can also try out other Pounce interpreters written in Python and C. Pounce interpreters are being developed in parallel, to be as consistent as possible across various platforms.
Pounce is currently in an Alpha development phase, so it's not production ready, but the core is fairly stable. Look for updates on development posted here.

## Concatenative Programming is... 
It's a different approach to programming, that is for sure. Concatenative programming (CP) is all about the __composition__ of functions, by concatenation.

The magic sauce is the use of __post-fix__ notation to make the composition of functions natural, so natural in fact, that there is no syntax needed to compose two functions together. Simply by placing one function after another (concatenate them) you have indicated that you want the two functions composed into a single (new) function.

There's a lot more to say about this concatenative style, also known as __stack-based__ programming. One thing worth mentioning is this: there are __no named variables__ in CP. This lack of variables is a shock to most programmers, but it is the philosophy of CP to "Name the code, not the Data." Along with, the slightly derogatory quote, "Variables are 'GOTO' for data!"  these mottos differentiate CP from other programming paradigms. Sure CP deals with data, but data is not referenced by named variables, instead it's stored in a single uniform data-structure (usually a stack). All functions take this stack as an argument and return a modified copy, now that is what we call consistency.

Also, most CP language are pure functional languages, so that is cool for the 'functional programming' (FP) folks out there, but again, it comes as a shock to those FP aficionados, just how different the CP style of problem solving is.
The FP vs. CP comparison goes like this:
 * FP involves the __application__ of functions to data, passing variables in, and gathering data returned by functions is natural and effective in FP. 
 * In CP the __composition__ of functions is central. The programmer composes functions to form (essentailly) one function that takes a stack of data as input and returns a stack as output. CP can do this because every function (consistantly) takes and returns a stack, making composition across all functions possible.

This just scratches the surface what CP is, so for more definitions and discussions, you should jump to some of these links: ... {links TBD}

There have been many CP languages, but the particular brand of CP that Pounce delivers, has these goals: 
 * To be simple and consistent; 
 * To provide IDEs and help in learning and debugging; 
 * To be portable to the major programming destinations.

## Portable to...
To be portable, Pounce has JavaScript and Python interpreters for client and server side coding, as well as "C" (or Python) for IoT platforms. 
Future development will include assemblers and compilers, that will improve efficiency over interpretation.
 
## Getting started...
First try Pounce in your browser to get a feel for the concatenative style of programming. The examples will let you start off small and move into making our own larger applications.