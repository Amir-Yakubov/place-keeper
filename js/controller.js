'use strict'

function onInit() {
    const userInfo = loadUserPref()
    if (userInfo) {
        setUserPref(userInfo)
        changeBgColor(userInfo)
        renderSavedSettings(userInfo)
    }

}

function onSubmit(event) {
    event.preventDefault()
    let mapLocationStr = $('.map-location').val()

    const userInfo = {
        name: $('.first-name').val(),
        bgColor: $('.bg-color').val(),
        txtColor: $('.text-color').val(),
        zoomFactor: $('.zoom-factor').val(),
        mapLocation: mapLocationStr.split(', ')
    }
    setUserPref(userInfo)
    saveUserPref(userInfo)
    window.location.reload(true)
}

function saveUserPref(value) {
    saveToStorage(STORAGE_KEY, value)
}

function loadUserPref() {
    return loadFromStorage(STORAGE_KEY)
}

function greetUser(userInfo) {
    $('.username-text').text(userInfo.name)
}

function changeBgColor(userInfo) {
    $("body").css({
        "background-color": `${userInfo.bgColor}`,
        "color": `${userInfo.txtColor}`
    })
    $(".field").css({
        "background-color": `${userInfo.bgColor}`,
    })
}

function renderSavedSettings(userInfo) {

    $('.saved-settings').html(`<div class="display-5 username-text">${userInfo.name}</div>
    <div class="saved-text-box"><p>Saved Location: <a href="#">${userInfo.mapLocation}</a>
    </p><p>Background-color: <a href="#">${userInfo.bgColor}</a></p>
    <p>Text-color: <a href="#">${userInfo.txtColor}</a></p></div>
    <p class="inline">Zoom Factor: <a href="#">${userInfo.zoomFactor}</a></p>
    <button class="btn-clear btn btn-danger" onclick="onClearClick()">Clear</button>`)
    $('.saved-settings').show()
}

function onClearClick() {
    localStorage.clear()
    window.location.reload(true)
}

function renderLocations() {
    // if (!locations) locations = creatLocations()
    var locations = getgLocations()

    var strHtml = ''
    locations.forEach(location => {
        const { id, lat, lng, name, date } = location
        const dateStr = timeStampToString(date)

        strHtml += `
        <div class="saved-location" data-id="${id}">
         <button class="delete-location btn btn-danger" onclick="onDelLocation('${id}')">X</button>
         <p class="card-title display-6">${name}</p>
         <p class="date-string">Saved: ${dateStr}</p>
        </div>`
    })
    $('.render-locations').html(strHtml)
}

function timeStampToString(date) {
    const newDate = new Date(date)
    let year = newDate.getFullYear()
    let month = newDate.getMonth()
    let day = newDate.getDay()
    let hour = newDate.getHours()
    let minutes = newDate.getMinutes()

    return `${day}/${month}/${year} ${hour}:${minutes}`
}

function onDelLocation(locationId) {
    deleteLocation(locationId)
    renderLocations()
}