import * as _ from 'lodash';

// Input
const players = 462;
const lastMarble = 71938;

export function solve() {
    return _.max(placeMarbles());
}

function placeMarbles() {
    let marbleCircle = [0];
    let scores = _.map(_.range(0,players), r => 0);

    let lastPlacedIndex = 0;
    let nextMarble = 1;
    let nextPlayer = 0;

    while (nextMarble <= lastMarble) {
        if (nextMarble % 23 == 0) {
            let marbleToRemove = (lastPlacedIndex - 7 + marbleCircle.length) % marbleCircle.length;
            let removedMarble = _.pullAt(marbleCircle, marbleToRemove);
            scores[nextPlayer] = scores[nextPlayer] + removedMarble[0] + nextMarble;
            lastPlacedIndex = marbleToRemove % marbleCircle.length;
        } else {
            let nextPos = (lastPlacedIndex + 2) % marbleCircle.length;
            marbleCircle = _.concat(_.slice(marbleCircle, 0, nextPos), [nextMarble], _.slice(marbleCircle, nextPos));
            lastPlacedIndex = nextPos;
        }
        nextMarble = nextMarble + 1;
        nextPlayer = (nextPlayer + 1) % players;
    }
    return scores;
}
