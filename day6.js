'use strict';

function aoc2017d6p1(input) {
    var banks = cleanInput(input);
    var history = {};
    var count = 0;

    do {
        history[banks] = true;
        let bank = findHigestIndex(banks);
        let blocks = banks[bank];
        banks[bank] = 0;

        for (let i = 1; i <= blocks; i++) {
            banks[(bank + i) % banks.length]++;
        }

        count++;
    } while (!history.hasOwnProperty(banks))

    return count;
}

function aoc2017d6p2(input) {
    var banks = cleanInput(input);
    var history = {};
    var count = 0;

    do {
        history[banks] = count;
        let bank = findHigestIndex(banks);
        let blocks = banks[bank];
        banks[bank] = 0;

        for (let i = 1; i <= blocks; i++) {
            banks[(bank + i) % banks.length]++;
        }

        count++;
    } while (!history.hasOwnProperty(banks))

    return count - history[banks];
}

function findHigestIndex(arr) {
    var max = 0;
    var index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
            index = i;
        }
    }
    return index;
}

function cleanInput(input) {
    return input.trim().split(/\s+/).map(Number);
}

