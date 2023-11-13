function fillArrayWithRandom(maxSize, arraySize) {
    const array = [];

    while (array.length < arraySize) {
        const value = Math.floor(Math.random() * (maxSize + 1));
        if (!array.includes(value)) {
            array.push(value);
        }
    }
    return array;
}

module.exports = { fillArrayWithRandom };