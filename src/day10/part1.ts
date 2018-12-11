import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 10;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readInputLines();
    let points = _.map(input, line => parseLine(line));
    let t = 0;
    while (t < 10100) {
        console.log(t);
        drawMap(points);
        points = movePoints(points);
        t = t + 1;
    }
    return 'not implemented';
}

function movePoints(points: point[]): point[] {
    return _.map(points, point => movePoint(point));
}

function movePoint(point: point): point {
    const position = {
        X: point.position.X + point.velocity.X,
        Y: point.position.Y + point.velocity.Y
    };
    return {
        position: position,
        velocity: point.velocity
    }
}

function drawMap(points: point[]) {
    const xValues = _.map(points, p => p.position.X);
    const yValues = _.map(points, p => p.position.Y);
    const minX = _.min(xValues);
    const maxX = _.max(xValues);
    const minY = _.min(yValues);
    const maxY = _.max(yValues);
    // There are 362 points - assume that a message must have many sharing horizontal/vertical coordinates
    if (maxX - minX > 100 && maxY - minY > 100) {
        return;
    }
    let y = minY;
    while (y <= maxY) {
        let x = minX;
        let line = "";
        while (x <= maxX) {
            if (_.find(points, p => p.position.X == x && p.position.Y == y)) {
                line = line + "#";
            } else {
                line = line + ".";
            }
            x = x + 1;
        }
        console.log(line);
        y = y + 1;
    }
    console.log("===");
}

function parseLine(line: string): point {
    const parts = line.split(/[<>,]/);
    const position = {
        X: _.parseInt(parts[1]),
        Y: _.parseInt(parts[2])
    };
    const velocity = {
        X: _.parseInt(parts[4]),
        Y: _.parseInt(parts[5])
    }
    return {
        position: position,
        velocity: velocity
    }
}

interface point {
    position: coordinate,
    velocity: velocity
}

interface velocity {
    X: number,
    Y: number
}

interface coordinate {
    X: number,
    Y: number
}