'use strict'

let gUserPosition

function getPosition() {

    const userPref = loadUserPref()
    const location = {
        lat: +userPref.mapLocation[0],
        lng: +userPref.mapLocation[1],
        zoom: +userPref.zoomFactor
    }

    STORAGE_USER_LOCATIONS = `${userPref.name} locs`
    STORAGE_USER_MARKERS = `${userPref.name} marks`
    const userLocations = loadUserLocations()
    const locations = getgLocations()
    if (userLocations) locations.push(...userLocations)
    showLocation(location)
    renderLocations()
}

function onClickMyPlace() {
    navigator.geolocation.getCurrentPosition(getUserPosition, handleLocationError)
}

function getUserPosition(pos) {
    const { latitude: lat, longitude: lng, accuracy } = pos.coords
    const userPosition = { lat, lng }
    console.log(userPosition)
    gUserPosition = userPosition
    showLocation(gUserPosition)
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}

function initMap(lat, lng, zoom = 16) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    })

    const locations = getgLocations()
    locations.forEach(location => {
        let { lat, lng, name } = location
        let savedMarker = new google.maps.Marker({
            position: { lat, lng },
            map,
            title: name,
        })
        gMarkers.push(savedMarker)
    })

    addEventOnclickMap(map)
    const userInfo = loadUserPref()
    if (userInfo) {
        changeLocationsBgColor(userInfo)
        renderSavedSettings(userInfo)
    }
}

function addEventOnclickMap(map) {
    map.addListener("click", (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        const locationName = creatLocation(lat, lng)
        if (!locationName) return
        placeMarker(lat, lng, map, locationName)
        panToPosition(e.latLng, map)
        renderLocations()
    })
}

function onclickLocation(locationId) {
    const location = getLocationById(locationId)
    setTimeout(() => {
        if (!location) return

        const { lat, lng } = location

        var options = {
            center: { lat, lng },
            zoom: 16
        }

        var elMap = document.querySelector('.map')
        var map = new google.maps.Map(
            elMap,
            options
        )
        renderMarkers(map)
    }, 100)

}

function onDelLocation(event, locationId) {
    event.preventDefault()
    clearMarker(locationId)
    deleteLocation(locationId)
    renderLocations()
}

function renderLocations() {
    var locations = getgLocations()
    if (!locations.length) {
        $('.render-locations').html(`
    Nothing to display yet!<br>choose location and save by name</span></div>`)
        return
    }

    var strHtml = ''
    locations.forEach(location => {
        const { id, lat, lng, name, date } = location
        const dateStr = timeStampToString(date)

        strHtml += `
        <div class="saved-location" data-id="${id}" onclick="onclickLocation('${id}')">
         <button class="delete-location btn btn-danger"
         onclick="onDelLocation(event, '${id}')">X</button>
         <p class="card-title display-6">${name}</p>
         <p class="date-string">Saved: ${dateStr}</p>
        </div>`
    })
    $('.render-locations').html(strHtml)
}

function renderMarkers(map) {
    const locations = getgLocations()
    locations.forEach(location => {
        let { lat, lng, name } = location
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            title: name,
        })
    })
}
