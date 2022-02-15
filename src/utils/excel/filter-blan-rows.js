
const filterBlankRows = _table => _table.filter((row, rowIndex) => {
    return Array.isArray(row) && !row.some(teamName => teamName.trim() === '')
})

export default filterBlankRows