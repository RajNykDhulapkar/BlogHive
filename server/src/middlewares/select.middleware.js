// express middleware to filter fields
const selectMiddleware = (req, res, next) => {
    try {
        let select = req.query.select;
        if (select) {
            if (typeof select === "string") {
                if (select.includes(",")) {
                    select = select.split(",");
                } else {
                    select = [select];
                }
            } else {
                let items = [];
                select.forEach((item, index) => {
                    if (item.includes(",")) {
                        items.push(...item.split(","));
                    }
                });
                select = select.filter((item) => !item.includes(","));
                select.push(...items);
                select = [...new Set(select)];
            }
        }
        req.select = select;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = selectMiddleware;
