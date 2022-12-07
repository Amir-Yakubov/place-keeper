'use strict'

function onSubmit(event) {
    event.preventDefault()
    const userInfo = {
        name: $('.first-name').val(),
        bgColor: $('.bg-color').val(),
        txtColor: $('.text-color').val(),
        mapLocation: $('.map-location').val()
    }
    console.dir(userInfo)
    saveToStorage(STORAGE_KEY, userInfo)
}

