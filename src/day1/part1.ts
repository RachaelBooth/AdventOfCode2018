import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 1;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readLinesAsNumbers();
    let sum = _.sum(input);
    return `${sum}`;
}