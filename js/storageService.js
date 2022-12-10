'use strict'

var STORAGE_USER_LOCATIONS = 'geust'
var STORAGE_USER_MARKERS = 'none'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

//////////// user preferences

function saveUserPref(value) {
    saveToStorage(STORAGE_USER_PREF, value)
}

function loadUserPref() {
    return loadFromStorage(STORAGE_USER_PREF)
}

//////////// user locations

function saveUserLocations(value) {
    saveToStorage(STORAGE_USER_LOCATIONS, value)
}

function loadUserLocations() {
    return loadFromStorage(STORAGE_USER_LOCATIONS)
}
