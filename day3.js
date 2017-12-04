'use strict';

// get Manhattan distance
function aocd3p1(num) {
    var coords = getPositionCoordinates(num);
    return Math.abs(coords[0]) + Math.abs(coords[1]);

    // find the largest complete ring
    function getLargestCompleteRing(positionNumber) {
        return Math.ceil(Math.floor(Math.sqrt(positionNumber)) / 2);
    }

    // a 5x5 grid should return 4 because the outer ring is 16 squares
    function getSideLength(ring) {
        if (ring > 1) {
            return (ring * 2) - 2;
        }
        return 1;
    }

    function getRemainingPositions(positionNumber, completeRing) {
        return positionNumber - (((completeRing * 2) - 1) ** 2);
    }

    function getPositionCoordinates(positionNumber) {

        if (positionNumber === 1) {
            return [0, 0];
        }

        var completeRing = getLargestCompleteRing(positionNumber);
        var remainingRingPositions = getRemainingPositions(positionNumber, completeRing);
        var currentRing = remainingRingPositions === 0 ? completeRing : completeRing + 1;
        var positionsPerSide = getSideLength(currentRing);
        var completeSides = Math.floor(remainingRingPositions / positionsPerSide);
        var activeSidePositions = remainingRingPositions % positionsPerSide;
        var maxDistanceFromCenter = positionsPerSide / 2;

        switch (completeSides) {
            case 0:
                return [maxDistanceFromCenter, -maxDistanceFromCenter + activeSidePositions];
            case 1:
                return [maxDistanceFromCenter - activeSidePositions, maxDistanceFromCenter];
            case 2:
                return [-maxDistanceFromCenter, maxDistanceFromCenter - activeSidePositions];
            case 3:
                return [-maxDistanceFromCenter + activeSidePositions, -maxDistanceFromCenter];
            case 4:
                return [maxDistanceFromCenter, -maxDistanceFromCenter];
        }
    }
}

// a fundamentally different approach is needed :(
function aocd3p2(input) {

    var max = 0;
    var initialCoordinates = [0, 0];
    var previousCoordinates = initialCoordinates.toString();
    var positions = {};
    positions[initialCoordinates] = {
        coords: initialCoordinates,
        index: 1,
        value: 1
    };

    while (positions[previousCoordinates].value <= input) {
        let current = Object.assign({}, positions[previousCoordinates]);
        current.index++;
        if (current.coords[0] === max && current.coords[1] === -max) {
            current.coords[0]++;
            max++;
        }
        // go up
        else if (current.coords[0] === max && current.coords[1] < max) {
            current.coords[1]++;
        }
        // go left
        else if (current.coords[0] > -max && current.coords[1] === max) {
            current.coords[0]--;
        }
        // go down
        else if (current.coords[0] === -max && current.coords[1] > -max) {
            current.coords[1]--;
        }
        // go right
        else if (current.coords[0] < max && current.coords[1] === -max) {
            current.coords[0]++;
        }
        current.value = addAdjacentValues(current.coords[0], current.coords[1]);
        previousCoordinates = current.coords.toString();
        positions[previousCoordinates] = current;
    }

    return positions[previousCoordinates].value;

    function getValue(coords) {
        if (positions[coords] && positions[coords].value) {
            return positions[coords].value;
        }
        return 0;
    }

    function addAdjacentValues(x, y) {
        var adjacentPoints = [
            [x + 1, y],
            [x + 1, y + 1],
            [x, y + 1],
            [x - 1, y + 1],
            [x - 1, y],
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y -1]
        ];

        return adjacentPoints.reduce(function reducer(sum, coords) {
            return sum + getValue(coords);
        }, 0);
    }
}
