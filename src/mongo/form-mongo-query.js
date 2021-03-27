/* eslint-disable no-unused-expressions */
const DEFAULT_PLAYERS_LIMIT = 40; // todo constants to file or to storage provider


module.exports = (query) => {
    const { id, name, count, namePart, limit, start: _start = false } = query;
    const _count = count || (!limit && !_start);
    const _limit = _count ? false : (limit || DEFAULT_PLAYERS_LIMIT);

    const _query = {};
    id ? _query._id = parseInt(id) : undefined;
    namePart || name
        ? _query.name = { $regex: name || namePart, $options: "i" }
        : undefined

    return { filter: _query, pagination: { limit: +_limit || false, start: _start || false } }
}
