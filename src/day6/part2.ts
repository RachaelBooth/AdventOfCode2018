import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 6;
const inputParser = new InputParser(day);

const maxDistance = 10000;

export function solve() {
    const input = inputParser.readLinesAsCommaSeperatedNumbers();
    const coordinates = _.map(input, line => {
        return {
            X: line[0],
            Y: line[1]
        };
    });
    return getRegionSize(coordinates);
}

function isInRegion(location: coordinates, points: coordinates[]): boolean {
    let distances = _.map(points, p => distance(location, p));
    return _.max(distances) < maxDistance;
}

function getRegionSize(points: coordinates[]): number {
    let minX = _.max(_.map(points, p => p.X)) - maxDistance;
    let maxX = _.min(_.map(points, p => p.X)) + maxDistance;
    let minY = _.max(_.map(points, p => p.Y)) - maxDistance;
    let maxY = _.min(_.map(points, p => p.Y)) + maxDistance;
    let count = 0;
    let x = minX;
    while (x <= maxX) {
        let y = minY;
        while (y <= maxY) {
            if (isInRegion({ X: x, Y: y}, points)) {
                count = count + 1;
            }
            y = y + 1;
        }
        x = x + 1;
    }
    return count;
}

function distance(a: coordinates, b: coordinates): number {
    return Math.abs(a.X - b.X) + Math.abs(a.Y - b.Y);
}

interface coordinates {
    X: number,
    Y: number
}