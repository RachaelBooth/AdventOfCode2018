import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const gridSerialNumber = 7165;
const gridSize = 300;

let gridDict = {};

export function solve() {
    let largestPower = { x: 1, y: 1, size: 1, value: getTotalPower(1,1, 1) };
    let size = 1;
    while (size <= 300) {
        let x = 1;
        while (x <= gridSize - size + 1) {
            let y = 1;
            while (y <= gridSize - size + 1) {
                let totalPower = getTotalPower(x, y, size);
                if (totalPower > largestPower.value) {
                    largestPower = { x: x, y: y, size: size, value: totalPower};
                }
                y = y + 1;
            }
            x = x + 1;
        }
        size = size + 1;
    }
    return `${largestPower.x},${largestPower.y},${largestPower.size}`;
}

function getTotalPower(x, y, size): number {
    let total = 0;
    let i = 0;
    while (i < size) {
        let j = 0;
        while (j < size) {
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