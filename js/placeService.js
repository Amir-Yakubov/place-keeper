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
        renderLocation()
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

function addCoord() {

}

function onDelClick() {
    console.log('delete')
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