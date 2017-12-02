'use strict';

// make sure to pass input as a string because the real puzzle input is a large enough number that JS treats it as Infinity

function aoc2017d1p1(input) {
    var chars = [...String(input)];
    if (chars.length === 0) {
        return 0;
    }
    chars.push(chars[0]);
    return chars.reduce(function reducer(sum, current, index, array) {
        var next = array[index + 1];
        if (next && current === next) {
            return sum + Number(current);
        }
        return sum;
    }, 0);
}

function aoc2017d1p2(input) {
    var chars = [...String(input)];
    
    if (chars.length === 0) {
        return 0;
    }

    var steps = chars.length / 2;

    return chars.reduce(function reducer(sum, current, index, array) {
        var next = array[(index + steps) % array.length];
        if (next && current === next) {
            return sum + Number(current);
        }
        return sum;
    }, 0);
}
