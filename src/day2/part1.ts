import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 2;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readInputLines();
    let twos = 0;
    let threes = 0;
    _.forEach(input, line => {
        let group = _.groupBy(line.split(''));
        let vals =_.values(_.mapValues(group, arr => arr.length));
        if (_.includes(vals, 2)) {
            twos = twos + 1;
        }
        if (_.includes(vals, 3)) {
            threes = threes + 1;
        }
    });
    return twos * threes;
}