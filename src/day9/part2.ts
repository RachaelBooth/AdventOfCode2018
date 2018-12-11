import * as _ from 'lodash';

// Input
const players = 462;
const lastMarble = 71938 * 100;

export function solve() {
    return _.max(placeMarbles());
}

function placeMarbles() {
    let marbles = _.range(0, lastMarble + 1);
    let scores = _.map(_.range(0,players), r => 0);

    marbles[0] = { number: 0, next: 0, previous: 0 };

    let lastPlacedMarble = 0;
    let nextMarble = 1;
    let nextPlayer = 0;

    while (nextMarble <= lastMarble) {
        if (nextMarble % 23 == 0) {
            let oneBack = marbles[lastPlacedMarble].previous;
            let twoBack = marbles[oneBack].previous;
            let threeBack = marbles[twoBack].previous;
            let fourBack = marbles[threeBack].previous;
            let fiveBack = marbles[fourBack].previous;
            let sixBack = marbles[fiveBack].previous;
            let sevenBack = marbles[sixBack].previous;

            scores[nextPlayer] = scores[nextPlayer] + sevenBack + nextMarble;

            lastPlacedMarble = sixBack;

            let eightBack = marbles[sevenBack].previous;
            marbles[sixBack] = {
                number: sixBack,
                previous: eightBack,
                next: marbles[sixBack].next
            };
            marbles[eightBack] = {
                number: eightBack,
                previous: marbles[eightBack].previous,
                next: sixBack
            };
        } else {
            let previous = marbles[lastPlacedMarble].next;
            let next = marbles[previous].next;
            marbles[nextMarble] = {
                number: nextMarble,
                previous: previous,
                next: next
            };
            marbles[previous] = {
                number: previous,
                previous: marbles[previous].previous,
                next: nextMarble
            };
            marbles[next] = {
                number: next,
                previous: nextMarble,
                next: marbles[next].next
            };
            lastPlacedMarble = nextMarble;
        }
        nextMarble = nextMarble + 1;
        nextPlayer = (nextPlayer + 1) % players;
    }
    return scores;
}

interface marbleInfo {
    number: number,
    previous: number,
    next: number
}
