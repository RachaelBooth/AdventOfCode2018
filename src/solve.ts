import * as program from 'commander'

declare var process;

program
  .option('-d --day [number]')
  .option('-p --part [number]')
  .parse(process.argv)

console.log(`Day ${program.day} Part ${program.part}`)