// 'use strict'

const gLocations = []
window.initMap = initMap

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
}

function addEventOnclickMap(map) {

    map.addListener("click", (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        creatLocation(lat, lng)
        renderLocations()
    })
}

function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
        position: latLng,
        map: map,
    })
    map.panTo(latLng)
}

window.initMap = initMap;

function getPosition() {
    const userPref = loadUserPref()
    const location = {
        lat: +userPref.mapLocation[0],
        lng: +userPref.mapLocation[1],
        zoom: +userPref.zoomFactor
    }
    showLocation(location)
}

function showLocation(location) {
    const { lat, lng, zoom } = location
    initMap(lat, lng, zoom)
}

function deleteLocation(locationId) {
    const locationIdx = gLocations.findIndex(location => locationId === location.id)
    gLocations.splice(locationIdx, 1)
    saveUserPref()
}



function addCoord() {

}

function updateCoord() {

}

function readCoord() {

}

function creatLocation(lat, lng) {
    const location = {
        id: makeId(),
        lat,
        lng,
        name: prompt('Title?'),
        date: Date.now()
    }
    console.log(location)
    gLocations.push(location)
}

function getgLocations() {
    return gLocations
}

function creatLocations() {
    const locations = []
    for (let i = 0; i < 3; i++) {
        const location = {
            id: makeId(),
            lat: 31.674895235898184,
            lng: 34.55861049318059,
            name: 'Example',
            date: 1670460334416
        }
        locations.push(location)
    }
    return locations
}
