'use strict';

function getRows(str) {
    return str.split(/\n/);
}

function cleanRow(row) {
    return row.split(/\s+/).map(Number);
}

// wrap multi-line input in ``
function aoc2017d2p1(input) {

    function getRowChecksum(row) {
        var max, min;
        row.forEach(function updateMaxMin(value) {
            if (!max || value > max) {
                max = value;
            }
            if (!min || value < min) {
                min = value;
            }
        });
        return max - min;
    }

    return getRows(input)
        .map(cleanRow)
        .reduce(function reducer(sum, row) {
            return sum + getRowChecksum(row);
        }, 0);
}

// wrap multi-line input in ``
function aoc2017d2p2(input) {

    function sortHighestToLowest(row) {
        return row.sort(function sorter(a, b) {
            return b - a;
        });
    }

    function getRowChecksum(input) {
        var row = [...input];
        var numerator = row.shift();

        for (let i = 0; i < row.length; i++) {
            if (numerator % row[i] === 0) {
                return numerator / row[i];
            }
        }

        return getRowChecksum(row);
    }

    return getRows(input)
        .map(cleanRow)
        .reduce(function reducer(sum, row) {
            return sum + getRowChecksum(sortHighestToLowest(row));
        }, 0);
}
