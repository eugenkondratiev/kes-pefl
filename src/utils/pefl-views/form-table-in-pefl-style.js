
import parseCopiedTableData from '../excel/parse-copied-table-data';
import filterShortRows from '../excel/filter-short-rows';

function formRow(row, rowIndex, _width = 70) {
    const columns = row.length || 5
    const cellWidth = parseFloat(_width / columns).toFixed(0)
    // console.log(rowIndex, columns, cellWidth, row);
    return `[tr${rowIndex % 2 ? "" : "  bgcolor=#C9F8B7"}]${row.map((cell, cellIndex) => {

        return formCell(cell, cellIndex, { _width: cellWidth, isBold: rowIndex === 0 })
    }).join("")}[/tr]`
}

function formCell(cell, cellIndex, options = { _width: 10, isBold: false }) {
    const { _width, isBold } = options
    return `[td width=${_width}% align=center]${isBold ? "[b]" : ""}${cell.trim()}${isBold ? "[/b]" : ""}[/td]`
}

function formPeflTable(_rawTable, { caption, width }) {

    const _peflTable = `[center]${caption}
    [table cellpadding=2 width=${parseInt(width)}% border=0 cellspacing=3 bgcolor=#A3DE8F]${_rawTable.map((row, rowIndex) => formRow(row, rowIndex)).join("")}[/table][/center]`
    return _peflTable
}


export default (rawData, options = { caption: "Заголовок", width: 70 }) => {
    const excelData = parseCopiedTableData(rawData);
    if (!excelData) return null

    const result = formPeflTable(filterShortRows(excelData), options)

    return result
}