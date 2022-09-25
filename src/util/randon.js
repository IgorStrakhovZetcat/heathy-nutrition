export function getRandomNumber(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return min + Math.round(Math.random() * (max -min));

}