function placeHolderHandler(message = "Place holder handler") {
    return function (req, res, next) {
        return res.status(200).json({
            message,
        });
    }
}

module.exports = placeHolderHandler;