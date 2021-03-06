tests = [
    [[2, 3, '+'], [5]],
    [[5, 2, '*'], [10]],
    [[6, 'dup', '*'], [36]],
    [[0, [6, 2, '*'], 42, 'if-else'], [42]],
    [[1, [6, 2, '*'], 42, 'if-else'], [12]],
    [[1, [2, 0, [3, 3, '*'], [2, 1, '+'], 'if-else', 7, '*', '+'], 'if'], [23]],
    [[1, [2.5, 0, [3, 2.999, '*'], [2, 1, '+'], 'if-else', 7.01, '*', '+'], 'if'], [23.53]],
    [[[1, 3, 2], [1, 3, 2], '=='], [True]],
    [[[1, 3, 2], [1, 3, 2], '==', 'true', 'false', 'if-else'], [True]],
    [[1, 1, 'if'], [1]],
    [['true', 5, 'if'], [5]],
    [['true', 'true', 'if'], [True]],
    [[0, 0, 'if'], []],
    [[10, 'count-down'], [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    [[3, 'count-down'], [3, 2, 1]],
    [[1, 'count-down'], [1]],
    [[5, 'fact'], [120]],
    [['a', 1, 2, 3, 4, 'n*'], ['a', 24]],
    [['hello world', 1, 2, 3, 4, 'n*'], ['hello world', 24]],
    [["hello world 5 o'clock", 1, 2, 3, 4, 'n*'], ["hello world 5 o'clock", 24]],
    [['hello world 5" of rain', 4, 'count-down', 'n*'], ['hello world 5" of rain', 24]],
    [['hello world 5" of rain', 4, 'count-down', 'n*', 'hello world 5" of rain'], ['hello world 5" of rain', 24, 'hello world 5" of rain']],
    [['clock', 1, 2, 3, 4, 'n*'], ['clock', 24]]
]
