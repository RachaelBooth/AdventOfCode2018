import * as fs from 'fs';
import * as _ from 'lodash';

export default class InputParser {
    private day: number;

    constructor(day: number) {
        this.day = day;
    }

    public readWholeInputAsCharacterArray(): string[] {
        return this.readWholeInput().split("");
    }

    public readWholeInputAsCommaSeperatedWordArray(): string[] {
        return this.readWholeInput().split(/[\s,]+/);
    }

    public readWholeInputAsNumberArrayOfChars(): number[] {
        return _.map(this.readWholeInputAsCharacterArray(), n => _.parseInt(n));
    }

    public readWholeInputAsNumberArrayOfWords(): number[] {
        return _.map(this.readWholeInput().split(/\s+/), part => _.parseInt(part));
    }

    public readWholeInputAsCommaSeperatedNumberArray(): number[] {
        return _.map(this.readWholeInput().split(","), part => _.parseInt(part));
    }

    public readLinesAsNumberArrays(): number[][] {
        return _.map(this.readLinesAsWordArrays(), row => _.map(row, part => _.parseInt(part)));
    }

    public readLinesAsWordArrays(): string[][] {
        return _.map(this.readInputLines(), line => line.split(/\s+/));
    }

    public readLinesAsCharArrays(): string[][] {
        return _.map(this.readInputLines(), line => line.split(''));
    }

    public readInputLines(): string[] {
        const contents = this.readWholeInput();
        return contents.split(/\r?\n/);
    }

    public readWholeInput(): string {
        return fs.readFileSync(`./src/day${this.day}/input.txt`, { encoding: 'utf8' });
    }
}