const {
    remote,
    shell
} = require('electron')
var $ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui')

let MachineID = null;
let Res       = null;

$('#logo-btn').on('click', e => {
    shell.openExternal('https://swedishfamily.net')
})

$('#close-btn').on('click', e => {
    remote.getCurrentWindow().close()
})

$('#dash-close-btn').on('click', e => {
    remote.getCurrentWindow().close()
})

$('#minimize-btn').on('click', e => {
    remote.getCurrentWindow().minimize()
})

$("#sign-out").click(function() {
    remote.app.relaunch();
    remote.app.exit(0);
})

$("#login-btn").click(function() {

    if (!$("#username-input").val() || !$("#password-input").val()) {
        $("#user-div, #pass-div").effect("shake", {times: 4, distance: 10});
        return
    }

    let username = $("#username-input").val();
    let password = $("#password-input").val();

    
    $('#main-login').fadeOut(1000).promise().done(function(){
        $("#dashboard").fadeIn(1000);
    });
})