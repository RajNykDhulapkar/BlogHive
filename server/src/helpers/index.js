function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
}

// function to get a random element from a list
function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function shuffleArray(array, size) {
    if (!size) size = array.length;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.slice(0, size);
}

function get_random_sub_list(list) {
    const length = Math.floor(Math.random() * list.length);
    return shuffleArray(list, list.length).slice(0, length);
}

// function to get a random sublist of a given size
function get_random_sub_list_with_size(list, size) {
    return shuffleArray(list, list.length).slice(0, size);
}


// slugify function to convert a string to a slug for file names
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// zip function to zip two arrays into an object
function zip(keys, values) {
    return keys.reduce((obj, field, i) => {
        obj[field] = values[i];
        return obj;
    }, {});
}

// function to unzip an object into an array
function unzip(obj) {
    return Object.keys(obj).reduce((arr, field) =>
        arr.push(obj[field]) && arr, []);
}

module.exports = {
    range,
    get_random,
    shuffleArray,
    get_random_sub_list,
    get_random_sub_list_with_size,
    slugify,
    zip,
    unzip,
    capitalizeEachWord
};
