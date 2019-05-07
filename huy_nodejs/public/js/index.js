function directTo(location) {
    window.location.href = location;
}

function changeTodetail(room){
    var id = room.getAttribute("id");
    window.location.href = `/changePage/${id}`
}



var area = ['B3', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B13'];
var floor = ['1', '2', '3', '4'];
var rooms = ['105', '106', '107', '108', '109', '110', '111', '112', '112A', '113', '114', '115', '116' ];

function makeID(area, floor, room) {
    return area + floor + room;
}

var areaHTML = [];
for (i = 0; i < area.length; i++) {
    var floorHTML = [];
    for (j = 0; j < floor.length; j++) {
        var roomHTML = rooms.map(
            room => `<button onclick="changeTodetail(this)"  id="${ makeID(area[i], floor[j], room) }" class="Room">${ room }</button>`
        )
        floorHTML[j] = `
            <div class="floor">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FL${ floor[j] }
                ${ roomHTML.join("") }
            </div>
        `
    }
    areaHTML[i] = `
        <div class="area">
            <div class="name"><i class="fas fa-building"></i>${ area[i] }</div>
            <div class="building">
                ${ floorHTML.join("") }
            </div>
        </div>
    `;
}

document.getElementById('content').innerHTML = `${ areaHTML.join("") }`;