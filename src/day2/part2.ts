import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 2;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readLinesAsCharArrays();
    let index = 1;
    let found = false;
    while (index < input.length) {
        let comp = 0;
        while (comp < index) {
            let result = checkDifference(input[index], input[comp]);
            if (result.found) {
                return result.common;
            }
            comp = comp + 1;
        }
        index = index + 1;
    }
}

interface result {
    found: boolean;
    common?: string;
}

function checkDifference(first, second): result {
    let i = 0;
    let diffIndex: number;
    while (i < first.length) {
        if (first[i] != second[i]) {
            if (diffIndex !== undefined) {
                // Second difference
                return { found: false };
            }
            diffIndex = i;
        }
        i = i + 1;
    }
    if (diffIndex === undefined) {
        return { found: false };
    }
    _.pullAt(first, diffIndex);
    return {
        common: _.join(first, ''),
        found: true
    }
}