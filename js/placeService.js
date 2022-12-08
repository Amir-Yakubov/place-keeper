'use strict'

var STORAGE_USER_LOCATIONS = 'geust'
const gLocations = []

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

function showLocation(location) {
    const { lat, lng, zoom } = location
    initMap(lat, lng, zoom)
}

function deleteLocation(locationId) {
    const locationIdx = gLocations.findIndex(location => locationId === location.id)
    gLocations.splice(locationIdx, 1)
    saveUserLocations(gLocations)
}

function creatLocation(lat, lng) {
    const userPref = loadUserPref()
    const userName = `${userPref.name} locs`
    const location = {
        id: makeId(),
        lat,
        lng,
        name: prompt('Title?'),
        date: Date.now(),
        userName
    }
    console.log(location)
    gLocations.push(location)
    STORAGE_USER_LOCATIONS = location.userName
    saveUserLocations(gLocations)
    console.log(gLocations)
}

function getgLocations() {
    return gLocations
}

function getLocationById(locationId) {
    const location = gLocations.find(location => locationId === location.id)
    return location
}
