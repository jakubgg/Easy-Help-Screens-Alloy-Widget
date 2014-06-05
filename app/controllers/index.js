function closeListener (e) {
    $.hlpScr.helpMenu.releaseMenu();
    $.helpScreen.removeEventListener('close',closeListener);
}
$.helpScreen.addEventListener('close',closeListener);

$.helpScreen.open();
