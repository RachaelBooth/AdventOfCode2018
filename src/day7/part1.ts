import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 7;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readLinesAsWordArrays();
    const parsed = _.map(input, i => parseLine(i));
    const tree = getPrerequisiteTree(parsed);
    return getOrder(tree);
}

function getOrder(info: stepInfo[]): string {
    let order = "";
    let remainingSteps = info;
    while (remainingSteps.length > 0) {
        let availableSteps = _.map(_.filter(remainingSteps, s => s.prerequisites.length == 0), s => s.step);
        let nextStep = _.min(availableSteps);
        order = order + nextStep;
        remainingSteps = _.map(_.filter(remainingSteps, s => s.step != nextStep), s => { return { step: s.step, prerequisites: _.without(s.prerequisites, nextStep)}});
    }
    return order;
}

function getPrerequisiteTree(orderRelations: ordering[]): stepInfo[] {
    let stepNames = _.uniq(_.flatMap(orderRelations, o => [o.earlier, o.later]));
    let steps = _.map(stepNames, s => {
        let prerequisites = _.map(_.filter(orderRelations, o => o.later == s), o => o.earlier);
        return {
            step: s,
            prerequisites: prerequisites
        }
    });
    return steps;
}

function parseLine(line: string): ordering {
    return {
        earlier: line[1],
        later: line[7]
    }
}

interface stepInfo {
    step: string,
    prerequisites: string[]
}

interface ordering {
    earlier: string,
    later: string
}