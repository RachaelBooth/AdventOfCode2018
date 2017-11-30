import * as program from 'commander'

declare var process;

program
  .option('-d --day [number]')
  .option('-p --part [number]')
  .parse(process.argv)

getAnswer(program.day, program.part);

async function getAnswer(day: number, part: number) {
    console.log(`Day ${program.day} Part ${program.part}`);
    const location = `./day${day}/part${part}`;
    const code = await import(location);
    console.log(`Answer: ${code.solve()}`);
}
