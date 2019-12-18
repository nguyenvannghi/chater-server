const MONGO_OPS = {
    LIKE: '$like',
    EQUA: '$eq',
    GREATER_THAN: '$gt',
    GREATER_THAN_OR_EQUA: '$gte',
    IN: '$in',
    LESS_THAN: '$lt',
    LESS_THAN_OR_EQUA: '$lte',
    NOT_EQUA: '$ne',
    NOT_IN: '$nin',
};

const MONGO_LOGIS = {
    AND: '$and',
    NOT: '$not',
    NOR: '$nor',
    OR: '$or',
};

const formatOperators = (item, args) => {
    const op = args.op;
    const val = args.value;
    if (op === MONGO_OPS.LIKE) {
        return { [item]: new RegExp(val) };
    } else {
        return { [item]: { [op]: val } };
    }
};

const getComparisonQueryOperators = args => {
    if (args && Object.keys(args).length > 0) {
        const listKeys = Object.keys(args);
        let newWhere = {};
        listKeys.forEach(item => {
            let childQuery = {};
            if (args.hasOwnProperty(item)) {
                const childParams = args[item];
                childQuery = formatOperators(item, childParams);
                Object.assign(newWhere, childQuery);
            }
        });
        return newWhere;
    }
    return {};
};

module.exports.getLogicalQueryOperators = args => {
    if (args && Object.keys(args).length > 0) {
        const listKeys = Object.keys(args);
        let newLogicalQuery = {};
        listKeys.forEach(item => {
            let childLogicalQuery = {};
            const childQueries = args[item];
            if (args.hasOwnProperty(item)) {
                if (Object.values(MONGO_LOGIS).includes(item)) {
                    let childQueriesFormated = [];
                    childQueries.forEach(childQuery => {
                        childQueriesFormated.push(getComparisonQueryOperators(childQuery));
                    });
                    childLogicalQuery = { [item]: childQueriesFormated };
                } else {
                    childLogicalQuery = formatOperators(item, childQueries);
                }
            }
            Object.assign(newLogicalQuery, childLogicalQuery);
        });
        return newLogicalQuery;
    }
    return {};
};
