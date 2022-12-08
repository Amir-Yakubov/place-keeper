'user strict'

function onInit() {
    const userInfo = loadUserPref()
    if (userInfo) {
        setUserPref(userInfo)
        changeColor(userInfo)
        changeBgColor(userInfo)
        renderSavedSettings(userInfo)
    }
}

function onSubmit(event) {
    event.preventDefault()
    let mapLocationStr = $('.map-location').val()

    const userInfo = {
        name: $('.first-name').val(),
        bgColor: $('.bg-color').val(),
        txtColor: $('.text-color').val(),
        zoomFactor: $('.zoom-factor').val(),
        mapLocation: (mapLocationStr.split(', ')) ? mapLocationStr.split(', ') : alert('ivalide location')
    }
    setUserPref(userInfo)
    saveUserPref(userInfo)
    window.location.reload(true)
}

function greetUser(userInfo) {
    $('.username-text').text(userInfo.name)
}

function renderSavedSettings(userInfo) {

    $('.saved-settings').html(`<div class="display-5 username-text">${userInfo.name}</div>
    <div class="saved-text-box"><p>Saved Location: <a href="#">${userInfo.mapLocation}</a>
    </p><p>Background-color: <a href="#">${userInfo.bgColor}</a></p>
    <p>Text-color: <a href="#">${userInfo.txtColor}</a></p></div>
    <p class="inline">Zoom Factor: <a href="#">${userInfo.zoomFactor}</a></p>
    <button class="btn-clear btn btn-danger" onclick="onClearClick()">Logout</button>`)
    $('.saved-settings').show()
}

function onClearClick() {
    localStorage.clear()
    window.location.reload(true)
    STORAGE_USER_LOCATIONS = 'geust'
}