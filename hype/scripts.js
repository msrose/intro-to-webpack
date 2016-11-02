var impress = require('./impress');

impress().init();

var blinkers = document.getElementsByClassName('blink');
var visible = true;
setInterval(function() {
    for(var i = 0; i < blinkers.length; i++) {
        blinkers[i].style.visibility = visible ? 'visible' : 'hidden';
    }
    visible = !visible;
}, 1000);
