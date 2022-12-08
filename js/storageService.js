'use strict'

var STORAGE_USER_LOCATIONS = 'geust'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveUserPref(value) {
    saveToStorage(STORAGE_USER_PREF, value)
}

function loadUserPref() {
    return loadFromStorage(STORAGE_USER_PREF)
}

function saveUserLocations(value) {
    saveToStorage(STORAGE_USER_LOCATIONS, value)
}

function loadUserLocations() {
    return loadFromStorage(STORAGE_USER_LOCATIONS)
}
