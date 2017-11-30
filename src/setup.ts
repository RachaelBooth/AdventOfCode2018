import * as program from 'commander'
import * as fs from 'fs'

declare var process;

program
  .option('-d --day [number]')
  .option('-2 --part-two')
  .parse(process.argv);

program.partTwo ? createPartTwoFiles(program.day) : createPartOneFiles(program.day);

function createPartOneFiles(day: string): void {
    const dir = getDir(day);

    fs.mkdirSync(dir);
    fs.copyFileSync('src/template/input.txt', `${dir}/input.txt`);
    let codeFile = fs.readFileSync('src/template/part1.ts', { encoding: 'utf8' });
    codeFile = codeFile.replace('const day = 0;', `const day = ${day};`);
    fs.writeFileSync(`${dir}/part1.ts`, codeFile);
}

function createPartTwoFiles(day: string): void {
    const dir = getDir(day);

    fs.copyFileSync(`${dir}/part1.ts`, `${dir}/part2.ts`);
}

function getDir(day: string): string {
    return `src/day${day}`;
}