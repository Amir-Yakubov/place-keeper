'use strict'

var map
const gLocations = []
const gMarkers = []

function creatLocation(lat, lng) {
    const locName = prompt('Title?')
    if (!locName) {
        alert('not validated name')
        return null
    }
    const userPref = loadUserPref()
    const userName = `${userPref.name} locs`
    const location = {
        id: makeId(),
        lat,
        lng,
        name: locName,
        date: Date.now(),
        userName
    }

    gLocations.push(location)
    STORAGE_USER_LOCATIONS = location.userName
    saveUserLocations(gLocations)
    console.log(gLocations)
    return location.name
}

function panToPosition(latLng, map) {
    map.panTo(latLng)
    map.setCenter(latLng)
}

function showLocation(location) {
    const { lat, lng, zoom } = location
    initMap(lat, lng, zoom)
}

function placeMarker(lat, lng, map, locationName) {

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: locationName
    })
    gMarkers.push(marker)
}

function clearMarker(locationId) {
    const location = getLocationById(locationId)
    let currMarker = getMarkerByTitle(location.name)
    currMarker.setMap(null)
    const markers = getgMarkers()
}

function deleteLocation(locationId) {
    const locationIdx = gLocations.findIndex(location => locationId === location.id)
    gLocations.splice(locationIdx, 1)
    saveUserLocations(gLocations)
}

function getLocationById(locationId) {
    const location = gLocations.find(location => locationId === location.id)
    return location
}

function getMarkerByTitle(markerTitle) {
    const marker = gMarkers.find(marker => markerTitle === marker.getTitle())
    return marker
}

function getgLocations() {
    return gLocations
}

function getgMarkers() {
    return gMarkers
}