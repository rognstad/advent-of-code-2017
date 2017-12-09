'use strict';

function parseInput(input) {
    var lines = input.split('\n');
    var re = /([a-z]+) (inc|dec) /;
    return lines.map(function convertLine(line) {
        var inputs = line.split(' ');

        return {
            register: inputs[0],
            multiplier: inputs[1] === 'inc' ? 1 : -1,
            modifier: inputs[2],
            test: {
                target: inputs[4],
                condition: `${inputs[5]} ${inputs[6]}`
            } 
        }
    });
}

function d8p1(input) {
    var input = parseInput(input);
    var registers = {};
    var highest = 0;

    input.forEach(function initRegister(line) {
        registers[line.register] = 0;
    });

    input.forEach(function processLine(line) {
        var evalString = String(registers[line.test.target]) + line.test.condition;

        if (eval(evalString)) {
            registers[line.register] += (line.multiplier * line.modifier);
        }
    });

    for (let register in registers) {
        if (registers[register] > highest) {
            highest = registers[register];
        }
    }

    return highest;
}

function d8p2(input) {
    var input = parseInput(input);
    var registers = {};
    var max = 0;

    input.forEach(function initRegister(line) {
        registers[line.register] = 0;
    });

    input.forEach(function processLine(line) {
        var evalString = String(registers[line.test.target]) + line.test.condition;

        if (eval(evalString)) {
            registers[line.register] += (line.multiplier * line.modifier);
            if (registers[line.register] > max) {
                max = registers[line.register];
            }
        }
    });


    return max;
}
