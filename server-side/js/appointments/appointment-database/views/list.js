
// creates and returns an error page
// TODO parse error code to human readable information
function getError(error){
    return `<!DOCTYPE html>
        <html>
        <head>
            <title>Milestones Overview</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/styles/style.css" />
        </head>
        <body>
            <h1>Milestones Overview ERROR</h1>
            <p>Sorry, there's some error:<br/>${error.code}</p>
        </body>
        </html>
    `;
}

// creates and returns complete overview page with HTML and CSS reference
function getList(milestones) {

    console.log("getList")
    console.log(milestones);

    return `<!DOCTYPE html>
    <html>
        <head>
            <title>Milestones Overview</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/styles/style.css" />
        </head>
        <body>
            <h1>Milestones Overview</h1>
            <table>
                <tr>
                <th>id</th>
                <th>Project</th>
                <th>Task</th>
                <th>Deadline</th>
                <th>notes</th>
                </tr>
                
                ${milestones.map(createRow).join('')}
                
            </table>
        
        </body>
    </html>`;
}

// how array map works https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// create each row with TR and TD Elements
function createRow(milestones) {

    return `<tr>
        <td>${milestones.id}</td>
        <td>${milestones.project}</td>
        <td>${milestones.task}</td>
        <td>${milestones.deadline}</td>
        <td>${milestones.notes}</td>
        
    </tr>`;
}

module.exports = {
    getList,
    getError};
