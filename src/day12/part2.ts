import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 12;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readInputLines();
    let plants = parseInitialState(input[0]);
    let statesSeen = [plants];
    const rules = _.map(_.drop(input, 2), line => parseRule(line));
    let i = 0;
    const numberOfGenerations = 50000000000;
    while (i < numberOfGenerations) {
        plants = getNextGeneration(plants, rules);
        i = i + 1;
        const translation = getTranslationDetailFromSeenStates(statesSeen, plants);
        if (translation != null) {
            const cycleLength = i - translation.indexFirstSeen;
            const remainingGenerationsAtFirstSeen = numberOfGenerations - translation.indexFirstSeen;
            const offset = remainingGenerationsAtFirstSeen % cycleLength;
            const baseIndex = translation.indexFirstSeen + offset;
            const numberOfCycles = (remainingGenerationsAtFirstSeen - offset) / cycleLength;
            const baseState = statesSeen[baseIndex];
            return _.sum(baseState) + (baseState.length * numberOfCycles * translation.diff);
        } else {
            statesSeen.push(plants);
        }
    }
    // Hopefully won't get here
    return _.sum(plants);
}

interface translationDetail {
    indexFirstSeen: number,
    diff: number
}

function getTranslationDetailFromSeenStates(statesSeen: number[][], plants: number[]): translationDetail {
    let index = 0;
    while (index < statesSeen.length) {
        const translationLength = getTranslation(statesSeen[index], plants);
        if (translationLength != null) {
            return {
                indexFirstSeen: index,
                diff: translationLength
            };
        }
        index = index + 1;
    }
    return null;
}

function getTranslation(state: number[], plants: number[]): number {
    const baseDiff = _.min(plants) - _.min(state);
    const isSamePattern = _.xor(_.map(state, p => p + baseDiff), plants).length == 0;
    if (isSamePattern) {
        return baseDiff;
    }
    return null;
}

function getNextGeneration(plants: number[], rules: rule[]): number[] {
    // + 1 to upper bound as want inclusive
    const rangeToConsider = _.range(_.min(plants) - 2, _.max(plants) + 2 + 1);
    let newPlants = [];
    _.forEach(rangeToConsider, pot => {
        const rule = findRule(pot, plants, rules);
        if (rule.producesPlant) {
            newPlants.push(pot);
        }
    });
    return newPlants;
}

function findRule(pot: number, plants: number[], rules: rule[]): rule {
    return _.find(rules, r => 
        r.left2 == _.includes(plants, pot - 2) &&
        r.left1 == _.includes(plants, pot - 1) &&
        r.current == _.includes(plants, pot) &&
        r.right1 == _.includes(plants, pot + 1) &&
        r.right2 == _.includes(plants, pot + 2));
}

function parseInitialState(line: string) {
    let bits = line.split(' ');
    let plants = [];
    let i = 0;
    while (i < bits[2].length) {
        if (bits[2][i] == '#') {
            plants.push(i);
        }
        i = i + 1;
    }
    return plants;
}

function parseRule(line: string): rule {
    return {
        left2: line[0] == '#',
        left1: line[1] == '#',
        current: line[2] == '#',
        right1: line[3] == '#',
        right2: line[4] == '#',
        producesPlant: line[9] == '#'
    };
}

interface rule {
    left2: boolean,
    left1: boolean,
    current: boolean,
    right1: boolean,
    right2: boolean,
    producesPlant: boolean
}