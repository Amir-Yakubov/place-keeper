'use strict'

let gUserPref = null
const STORAGE_KEY = 'userPrefDB'

function setUserPref(userOref) {
    gUserPref = userOref
}

function getgUserPref() {
    return gUserPref
}