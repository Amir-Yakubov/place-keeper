'use strict'

let STORAGE_USER_PREF = 'userPrefDB'
let gUserPref = null

function setUserPref(userOref) {
    gUserPref = userOref
}

function getgUserPref() {
    return gUserPref
}