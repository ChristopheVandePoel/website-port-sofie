function openSlider(side) {
    document.getElementById("slider-from-" + side).style[side] = "0";
    return false;
}

function closeSlider(side) {
    var needsPercNao = ($(window).width() > 1000) ? '50' : '100';
    document.getElementById("slider-from-" + side).style[side] = "-" + needsPercNao + "%";
    return false;
}