import parseCopiedTableData from '../excel/parse-copied-table-data';
import filterBlankRows from '../excel/filter-blan-rows';


function formGroups(_table) {

    const groups = _table[0].map(_ => [])

    _table.forEach((row, rawIndex) => {
        row.forEach((team, index) => {
            groups[index].push(team)
        })
    })

    return groups
}

function formMainCalendar(groups) {
    return groups.map(gr => {
        return formCalendar(gr)
    })
}


function formCalendar(tournament) {
    if (!tournament || !Array.isArray(tournament)) return null

    let teamslist = [...tournament]

    if ((teamslist.length % 2)) teamslist.push(null)

    const calendar = teamslist.map((_, index) => {
        return { name: `Тур ${index + 1}`, games: [] }
    })

    const N = teamslist.length;
    const shift = N / 2;

    function formTourGames(_list, _shift, _tour, _type = 0) {
        const _games = []
        for (let i = 0; i < _shift; i++) {
            _games.push([_list[i], _list[i + _shift], _type]);
        }
        return _games
    }


    for (let tour = 0; tour < N - 1; tour++) {
        calendar[tour].games = formTourGames(teamslist, shift, tour)
        //now carousel all except first element
        let middle = teamslist.splice(shift - 1, 1);
        teamslist.push(middle[0])
        middle = teamslist.splice(shift - 1, 1);
        teamslist.splice(1, 0, middle[0]);
    }

    calendar.pop()

    // console.log("calendar  - ", calendar);
    return calendar

}

function transformCalendarToFixtures(calendar) {
    const tours = calendar[0].length
    const fixtures = [...Array(tours)].map((_, i) => [`Тур ${i + 1}\n\r`])

    calendar.forEach((gr, grIndex) => {
        gr.forEach((tour, tourIndex) => {
            fixtures[tourIndex].push(tour.games.join('\n') + '\n')
        })
    })

    return fixtures.reduce((acc, fixturesTour, i) => {
        return acc + `\n\r${fixturesTour.join('')}`
    }, "\n\r")
}

function showGroups(_groups) {
    return _groups.map((gr, i) => `Группа ${i + 1}  - ${gr.join(' ')}\n`).join('')
}

export default (rawData) => {
    const excelData = parseCopiedTableData(rawData);
    if (!excelData) return null

    const groupsArray = formGroups(filterBlankRows(excelData))
    if (!groupsArray) return null

    const mainCalendar = formMainCalendar(groupsArray)
    if (!mainCalendar) return null

    const fixturesList = transformCalendarToFixtures(mainCalendar)
    return showGroups(groupsArray) + '\n\r' + fixturesList
}