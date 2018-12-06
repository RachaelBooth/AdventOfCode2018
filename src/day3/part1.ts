import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 3;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readLinesAsWordArrays();
    const elfClaims = _.map(input, line => {
        var distance = _.map(line[2].substring(0, line[2].length - 1).split(','), x => _.parseInt(x));
        var size = _.map(line[3].split('x'), x => _.parseInt(x));
        return {
            elf: line[0],
            left: distance[0],
            top: distance[1],
            right: distance[0] + size[0],
            bottom: distance[1] + size[1]
        };
    });
    let fabric = {};
    _.forEach(elfClaims, claim => {
        let i = claim.left;
        while (i < claim.right) {
            let j = claim.top;
            while (j < claim.bottom) {
                let key = `${i},${j}`;
                var s = fabric[key];
                if (s == undefined) {
                    fabric[key] = 0;
                } else {
                    fabric[key] = s + 1;
                }
                j = j + 1;
            }
            i = i + 1;
        }
    });
    return _.filter(_.values(fabric), v => v > 0).length;
}