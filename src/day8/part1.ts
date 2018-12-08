import InputParser from '../utils/inputParser';
import * as _ from 'lodash';

const day = 8;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readWholeInputAsNumberArrayOfWords();
    const parsed = parseNode(new Reader(input));
    return sumMetadata(parsed);
}

function sumMetadata(node: node): number {
    return _.sum(node.metadata) + _.sum(_.map(node.children, c => sumMetadata(c)));
}

function parseNode(inputReader: Reader): node {
    let numberOfChildren = inputReader.readNext();
    let numberOfMetadataEntries = inputReader.readNext();
    let c = 0;
    let children = [];
    while (c < numberOfChildren) {
        let child = parseNode(inputReader);
        children.push(child);
        c = c + 1;
    }
    let m = 0;
    let metadata = [];
    while (m < numberOfMetadataEntries) {
        metadata.push(inputReader.readNext());
        m = m + 1;
    }
    return {
        children: children,
        metadata: metadata
    }
}

class Reader {
    private numbers: number[];
    private nextIndex: number;

    constructor(numbers: number[]) {
        this.numbers = numbers;
        this.nextIndex = 0;
    }

    public readNext = () => {
        let result = this.numbers[this.nextIndex];
        this.nextIndex = this.nextIndex + 1;
        return result;
    }
}

interface node {
    children: node[];
    metadata: number[];
}