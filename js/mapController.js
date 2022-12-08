'use strict'

window.initMap = initMap

function getPosition() {
    const userPref = loadUserPref()
    const location = {
        lat: +userPref.mapLocation[0],
        lng: +userPref.mapLocation[1],
        zoom: +userPref.zoomFactor
    }
    STORAGE_USER_LOCATIONS = `${userPref.name} locs`
    const userLocations = loadUserLocations()
    showLocation(location)
    if (!userLocations) return
    const locations = getgLocations()
    locations.push(...userLocations)
    renderLocations()
}

function initMap(lat, lng, zoom) {
    var elMap = document.querySelector('.map')

    var options = {
        center: { lat, lng },
        zoom
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Mark",
    })

    addEventOnclickMap(map)
    const userInfo = loadUserPref()
    if (userInfo) {
        changeLocationsBgColor(userInfo)
        renderSavedSettings(userInfo)
    }
}

function renderLocations() {
    var locations = getgLocations()

    var strHtml = ''
    locations.forEach(location => {
        const { id, lat, lng, name, date } = location
        const dateStr = timeStampToString(date)

        strHtml += `
        <div class="saved-location" data-id="${id}" onclick="onclickLocation(${id})">
         <button class="delete-location btn btn-danger"
         onclick="onDelLocation('${id}')">X</button>
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
    console.log(getgLocations())
}

function onclickLocation(locationId) {
    const location = getLocationById(locationId)
    placeMarkerAndPanTo(latLng, map)
}

