import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 6;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readLinesAsCommaSeperatedNumbers();
    const coordinates = _.map(input, line => {
        return {
            X: line[0],
            Y: line[1]
        };
    });
    const square = getSquare(coordinates);
    const squareSizes = _.map(coordinates, point => getSquareSize(square, point));
    return _.max(squareSizes);
}

function getSquareSize(map: info[], point: coordinates): number {
    let minX = _.min(_.map(map, m => m.location.X));
    let maxX = _.max(_.map(map, m => m.location.X));
    let minY = _.min(_.map(map, m => m.location.Y));
    let maxY = _.max(_.map(map, m => m.location.Y));
    let closeEdge = _.find(map, i => i.nearestPoint != null && distance(i.nearestPoint, point) == 0 && (i.location.X == minX || i.location.X == maxX || i.location.Y == minY || i.location.Y == maxY));
    if (closeEdge != undefined) {
        return null;
    }
    return _.filter(map, i => i.nearestPoint != null && distance(i.nearestPoint, point) == 0).length;
}

function getSquare(points: coordinates[]): info[] {
    let minX = _.min(_.map(points, p => p.X));
    let maxX = _.max(_.map(points, p => p.X));
    let minY = _.min(_.map(points, p => p.Y));
    let maxY = _.max(_.map(points, p => p.Y));
    let square = _.flatMap(_.range(minX, maxX + 1), x => _.map(_.range(minY, maxY + 1), y => { return { X: x, Y: y }; }));
    return _.map(square, s => { return { location: s, nearestPoint: findNearest(s, points) }} );
}

function findNearest(s: coordinates, points: coordinates[]): coordinates {
    let distances = _.map(points, p => distance(p, s));
    let minDistance = _.min(distances);
    if (_.filter(distances, d => d == minDistance).length > 1) {
        return null;
    }
    return points[_.findIndex(distances, d => d == minDistance)];
}

function distance(a: coordinates, b: coordinates): number {
    return Math.abs(a.X - b.X) + Math.abs(a.Y - b.Y);
}

interface info {
    location: coordinates
    nearestPoint: coordinates
}

interface coordinates {
    X: number,
    Y: number
}