'use strict';

function aoc2017d5p1(steps) {
    steps = steps.split(/\n/).map(Number);
    var index = 0;
    var count = 0;
    while (steps[index] !== undefined) {
        steps[index]++;
        index = index + steps[index] - 1;
        count++;
    }
    return count;
}

function aoc2017d5p2(steps) {
    steps = steps.split(/\n/).map(Number);
    var index = 0;
    var count = 0;
    while (steps[index] !== undefined) {
        let mod = steps[index] >= 3 ? -1 : 1;
        steps[index] = steps[index] + mod;
        index = index + steps[index] - mod;
        count++;
    }
    return count;
}
