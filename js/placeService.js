'use strict'

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

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    })
}

function addCoord() {

}

function deleteCoord() {

}

function updateCoord() {

}

function readCoord() {

}