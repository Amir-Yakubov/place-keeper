function showRange(newVal) {
    document.getElementById('sRange').innerHTML = newVal
}

function makeId(length = 4) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function changeBgColor(userInfo) {
    $("body").css({
        "background-color": `${userInfo.bgColor}`,
        "color": `${userInfo.txtColor}`
    })

}

function changeColor(userInfo) {
    $(".field").css({
        "background-color": `${userInfo.bgColor}`,
    })
}

function changeLocationsBgColor(userInfo) {
    $("body").css({
        "background-color": `${userInfo.bgColor}`,
    })
}

function changeLocationsTxtColor() {
    $(".saved-list-txt").css({
        "color": `${black}`,
    })
}

