import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 5;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readWholeInput();
    const units = _.uniq(_.map(input.split(''), u => u.toUpperCase()));
    const polymersAfterRemoval = _.map(units, u => removeUnit(input, u));
    const reduced = _.map(polymersAfterRemoval, p => doReaction(p));
    const lengths = _.map(reduced, r => r.length);
    return _.min(lengths);
}

function removeUnit(polymer: string, unit: string): string {
    let result = "";
    let i = 0;
    while (i < polymer.length) {
        if (polymer[i].toUpperCase() != unit) {
            result = result + polymer[i];
        }
        i = i + 1;
    }
    return result;
}

function doReaction(polymer: string): string {
    let current = polymer;
    let i = 0;
    while (i < current.length - 1) {
        if (current[i].toUpperCase() == current[i+1].toUpperCase() && current[i] != current[i + 1]) {
            // Eliminate
            current = current.substring(0, i) + current.substring(i + 2);
            i = i - 1;
            if (i < 0) {
                i = 0;
            }
        } else {
            i = i + 1;
        }
    }
    return current;
}