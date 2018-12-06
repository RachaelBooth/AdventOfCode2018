import InputParser from '../utils/inputParser';
import * as _ from 'lodash';
import * as moment from 'moment';

const day = 4;
const inputParser = new InputParser(day);

export function solve() {
    const input = inputParser.readInputLines();
    const data = getChronologicalData(input);
    const guardData = getGuardData(data);
    const mostAsleep = _.maxBy(_.values(guardData), g => g.totalMinutes);
    const mostCommonlyAsleep = _.maxBy(_.values(_.groupBy(mostAsleep.minutesAsleep)), v => v.length);
    return mostCommonlyAsleep[0] * mostAsleep.guard;
}

function getGuardData(chronologicalData: Data[]) {
    let guardData = {};
    let i = 0;
    let currentElf = null;
    let asleepSince = null;
    while (i < chronologicalData.length) {
        let item = chronologicalData[i];
        if (item.event == "duty-marker") {
            if (guardData[item.elf] == undefined) {
                guardData[item.elf] = { totalMinutes: 0, minutesAsleep: [], guard: _.parseInt(item.elf.substring(1)) };
            }
            currentElf = item.elf;
            asleepSince = null;
        } else if (item.event == "fall-asleep") {
            asleepSince = item.dateTime.minute();
        } else if (item.event == "wake") {
            let wakeTime = item.dateTime.minute();
            let asleepMins = wakeTime - asleepSince;
            guardData[currentElf].totalMinutes = guardData[currentElf].totalMinutes + asleepMins;
            guardData[currentElf].minutesAsleep = _.concat(guardData[currentElf].minutesAsleep, ..._.range(asleepSince, wakeTime));
            asleepSince = null;
        }
        i = i + 1;
    }
    return guardData;
}

type Event = "fall-asleep" | "wake" | "duty-marker";

interface Data {
    dateTime: moment.Moment,
    event: Event,
    elf?: string
}

function getChronologicalData(input: string[]) {
    let data = _.map(input, line => {
        let p = line.split(']');
        let q = p[1].split(' ');
        return parseSingle([p[0].substring(1), ...q]);
    });
    return _.sortBy(data, d => d.dateTime);
}

function parseSingle(line: string[]): Data {
    let date = moment(line[0]);
    let event: Event;
    let elf: string;
    if (line[2] == "falls") {
        event = "fall-asleep";
    } else if (line[2] == "wakes") {
        event = "wake";
    } else {
        event = "duty-marker";
        elf = line[3]
    }
    return {
        dateTime: date,
        event: event,
        elf: elf
    }
}