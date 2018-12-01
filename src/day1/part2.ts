import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 1;
const inputParser = new InputParser(day);

export function solve(): string {
    const input = inputParser.readLinesAsNumbers();
    let frequency = 0;
    let frequenciesSeen = [];
    let index = 0;
    while (!_.includes(frequenciesSeen, frequency)) {
        frequenciesSeen.push(frequency);
        frequency = frequency + input[index];
        index = index + 1;
        if (index == input.length) {
            index = 0;
        }
    }
    return `${frequency}`;
}