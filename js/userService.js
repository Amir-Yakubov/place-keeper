'use strict'

let gUserPref = null
let STORAGE_USER_PREF = 'userPrefDB'

function setUserPref(userOref) {
    gUserPref = userOref
}

function getgUserPref() {
    return gUserPref
}