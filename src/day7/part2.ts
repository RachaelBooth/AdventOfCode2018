import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 7;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readLinesAsWordArrays();
    const parsed = _.map(input, i => parseLine(i));
    const tree = getPrerequisiteTree(parsed);
    return getTime(tree);
}

function getTime(tree: stepInfo[]) {
    let time = 0;
    let remaining = tree;
    let working = [0,0,0,0,0]
    let inProgress = [null, null, null, null, null]
    while (remaining.length > 0) {
        console.log(working);
        console.log(inProgress);
        // Assign new work
        let availableWorkers = _.filter(working, i => i == 0).length;
        if (availableWorkers > 0) {
            let availableSteps = _.sortBy(_.filter(remaining, s => s.prerequisites.length == 0), s => s.step);
            let i = 0;
            while (i < availableWorkers && i < availableSteps.length) {
                let nextWorkerIndex = _.findIndex(working, w => w == 0);
                working[nextWorkerIndex] = availableSteps[i].duration;
                inProgress[nextWorkerIndex] = availableSteps[i].step;
                remaining = _.filter(remaining, r => r.step != availableSteps[i].step);
                i = i + 1;
            }
        }

        // Do time step
        time = time + 1;
        working = _.map(working, (w, index) => {
            if (w == 0) {
                return 0;
            }
            if (w > 1) {
                return w - 1;
            }
            // w = 0: Finish work
            remaining = _.map(remaining, r => { return { step: r.step, duration: r.duration, prerequisites: _.without(r.prerequisites, inProgress[index])}});
            inProgress[index] = null;
            return 0;
        });
    }
    // No more work to start, just need to add remaining time
    time = time + _.max(working);
    return time;
}

function getPrerequisiteTree(orderRelations: ordering[]): stepInfo[] {
    let stepNames = _.uniq(_.flatMap(orderRelations, o => [o.earlier, o.later]));
    let steps = _.map(stepNames, s => {
        let prerequisites = _.map(_.filter(orderRelations, o => o.later == s), o => o.earlier);
        return {
            step: s,
            prerequisites: prerequisites,
            duration: getDuration(s)
        }
    });
    return steps;
}

function getDuration(step: string): number {
    return 60 + step.charCodeAt(0) - 64;
}

function parseLine(line: string): ordering {
    return {
        earlier: line[1],
        later: line[7]
    }
}

interface stepInfo {
    step: string,
    prerequisites: string[],
    duration: number
}

interface ordering {
    earlier: string,
    later: string
}