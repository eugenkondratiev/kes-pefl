export default function parseExcelTableData(_data) {
    const rows = _data.split(/[\n\r]/)
    const _table = rows.map(r => {
        return r.split(/[\t,;]/).map(_ => _.trim())
    })
    return _table.filter((row, rowIndex) => {
        return Array.isArray(row) && !row.some(teamName => teamName.trim() === '')
    })
}
