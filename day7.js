'use strict';

function parseInput(input) {
    var re = /([a-z]+) \((\d+)\)( -> )?(.*)/;

    return input.split('\n').map(function transformLine(line) {
        var parts = line.match(re);
        var obj = {
            name: parts[1],
            weight: Number(parts[2]),
            children: parts[4] ? parts[4].split(', ') : []
        };
        return obj;
    });
}

function aoc2017d7p1(input) {
    input = parseInput(input);

    return getLayer(input)[0].name;

    function getLayer(items) {
        var allChildren = items.reduce(function getAllChildren(combined, item) {
            return [...combined, ...item.children];
        }, []);
        return items.filter(function hasChildrenIsNotChild(item) {
            return item.children.length > 0 && allChildren.indexOf(item.name) === -1;
        });
    }

}

// this isn't the most efficient function ever
function aoc2017d7p2(input) {
    input = parseInput(input);
    var programs = {};
    var programNames = [];

    input.forEach(function addToPrograms(item) {
        programs[item.name] = {
            weight: item.weight,
            children: item.children,
            childrenWeights: []
        };
        programNames.push(item.name);
    });

    programNames.forEach(function addRecursiveWeight(name) {
        programs[name].recursiveWeight = getWeight(programs[name], programs);
    });

    var parentName = findParentOfUnbalanced(programNames, programs);
    var parent = programs[parentName];
    var indexes = findIndexes(parent.childrenWeights);
    var diff = parent.childrenWeights[indexes.balanced] - parent.childrenWeights[indexes.unbalanced];
    var unbalancedProgram = programs[parent.children[indexes.unbalanced]];

    return unbalancedProgram.weight + diff;

    function findParentOfUnbalanced(names, programs) {
        return names.find(function checkchildrenWeights(name) {
            var item = programs[name];
            if (item.children.length === 0) {
                return false;
            }
            var sorted = [...item.childrenWeights].sort(function sorter(a, b) {
                return a - b;
            })
            return sorted[0] !== sorted[sorted.length - 1];
        });
    }

    function findIndexes(weights) {
        var valueCountMap = {};

        weights.forEach(function updateMap(value, index){
            if (valueCountMap[value]) {
                valueCountMap[value].count++;
                valueCountMap[value].indexes.push(index);
            }
            else {
                 valueCountMap[value] = {
                    count: 1,
                    indexes: [index]
                 };
            }
        });

        var unbalanced = weights.findIndex(function findUncommon(value) {
            return valueCountMap[value].count === 1;
        });
        var balanced = unbalanced === 0 ? 1 : 0;

        return {
            balanced,
            unbalanced
        };
    }

    function getWeight(program, programs) {
        var weight = program.recursiveWeight || program.children.reduce(function getChildWeight(total, childName) {
            var child = programs[childName];
            var weight = child.recursiveWeight || getWeight(child, programs);
            if (program.childrenWeights.length < program.children.length) {
                program.childrenWeights.push(weight);    
            }
            return total + weight;
        }, program.weight);
        return weight;
    }
}
