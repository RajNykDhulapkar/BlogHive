function exclude(item, keys) {
    if (!Array.isArray(keys)) {
        keys = [keys];
    }
    for (let key of keys) {
        delete item[key];
    }
    return item;
}
module.exports = { exclude };
