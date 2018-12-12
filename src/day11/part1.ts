import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const gridSerialNumber = 7165;
const gridSize = 300;

let gridDict = {};

export function solve() {
    let largestPower = { x: 1, y: 1, value: getTotalPower(1,1) };
    let x = 1;
    while (x <= gridSize - 2) {
        let y = 1;
        while (y <= gridSize - 2) {
            let totalPower = getTotalPower(x, y);
            if (totalPower > largestPower.value) {
                largestPower = { x: x, y: y, value: totalPower};
            }
            y = y + 1;
        }
        x = x + 1;
    }
    return `${largestPower.x},${largestPower.y}: ${largestPower.value}`;
}

function getTotalPower(x, y): number {
    let total = 0;
    let i = 0;
    while (i < 3) {
        let j = 0;
        while (j < 3) {
            total = total + getPower(x + i, y + j);
            j = j + 1;
        }
        i = i + 1;
    }
    return total;
}

function getPower(x, y): number {
    if (gridDict[`${x},${y}`] != undefined) {
        return gridDict[`${x},${y}`];
    }
    let power = calculatePower(x, y);
    gridDict[`${x},${y}`] = power;
    return power;
}

function calculatePower(x: number, y: number): number {
    let rackId = x + 10;
    let power = rackId * y;
    power = power + gridSerialNumber;
    power = power * rackId;
    power = (power % 1000) - (power % 100);
    return power - 5;
}