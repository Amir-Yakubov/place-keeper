// 'use strict'

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
        title: "Click to zoom",
    })

    map.addListener("center_changed", () => {
        console.log('click on map')

        // window.setTimeout(() => {
        //     map.panTo(marker.getPosition());
        // }, 3000)
    })
    marker.addListener("click", () => {
        console.log('click on marker')
        // map.setZoom(8)
        // map.setCenter(marker.getPosition())
    })
    placeMark(map)
}

function placeMark(map) {

    map.addListener("click", (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        console.log('lat', lat)
        console.log('lng', lng)
        creatLocation(lat, lng)
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

function deleteCoord() {

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
        name: prompt('Title?')
    }
    console.log(location)
}