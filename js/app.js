// var content = { 'index-1': ['About <em>Sofie Gagelmans</em>', '<em>LUCA Showcase</em>'] }
//
// 'index-1' :
//
// ['About <em>Sofie Gagelmans</em>', '<em>LUCA Showcase</em>'] :
// dit zijn de linker en rechterknop van de footer, gescheiden door een komma, html mag, maar wees zuinig
//


// VARIABLES
var content = {
    'page-1': ['About <em>Sofie Gagelmans</em>', '<em>Being Dyslexic</em>'],
    'page-2': ['About <em>Sofie Gagelmans</em>', '<em>Playing with Dyslexia</em>'],
    'page-3': ['About <em>Sofie Gagelmans</em>', '<em>LUCA Showcase</em>'],
    'page-4': ['About <em>Sofie Gagelmans</em>', '<em>Art Book Fair</em>'],
    'page-5': ['About <em>Sofie Gagelmans</em>', '<em>Redesign for a Belgian Magazine</em>'],
    'page-6': ['About <em>Sofie Gagelmans</em>', '<em>Series of Posters</em>'],
    'page-7': ['About <em>Sofie Gagelmans</em>', '<em>Everything Twice</em>']
}

var pages = Object.keys(content);
var currentRequestId = 0;
var screenBreakpoint = 1000;

var open = {
    right: false,
    left: false,
}


// SLIDER FUNCTIONS

function openSlider(side) {
    if($(window).width() < screenBreakpoint) {
        closeSlider(side !== 'right' ? 'right' : 'left' )
    }
    $('#slider-from-' + side + ' a.x').show();
    document.getElementById("slider-from-" + side).style[side] = "0";
    open[side] = true;
    return false;
}

function closeSlider(side) {
    var needsPercNao = '50';
    if($(window).width() < screenBreakpoint) {
        needsPercNao = '100';
        $('#slider-from-' + side + ' a.x').hide();
    }
    document.getElementById("slider-from-" + side).style[side] = "-" + needsPercNao + "%";
    open[side] = false;
    return false;
}

function toggleSlider(side) {
    if(open[side]) {
        closeSlider(side);
    } else {
        openSlider(side);
    }
}


// PAGEFUNCTIONS

function preparePage(page) {
    if (currentRequestId === 0) {
        $('div.previous').css('opacity', 0);
    } else {
        $('div.previous').css('opacity', 1);
    }

    $('#left-slide-button').html(content[page][0]);
    $('#right-slide-button').html(content[page][1]);

    $(".fade-container").fadeOut(0);
}

function loadPage(page) {
    // tell variables both panes are closed :(
    open.right = false;
    open.left = false;
    preparePage(page);

    // load with cachebusting
    $(".fade-container").load(page + '.html?_' + (new Date()).getTime(), function () {
        $(".fade-container").fadeIn(200);
        const container = document.querySelector('#style-2');

        new PerfectScrollbar(container);
        history.replaceState({ page: page }, page, "#" + page);
    });
}

function loadNextPage(event) {
    //event.preventDefault();
    if (currentRequestId === pages.length - 1) {
        currentRequestId = 0;
        loadPage(pages[0]);
    } else {
        currentRequestId++;
        loadPage(pages[currentRequestId]);
    }
    return false;
}

function loadPreviousPage() {
    if (currentRequestId !== 0) {
        currentRequestId--;
        loadPage(pages[currentRequestId]);
    }
    return false;
}

$(document).ready(function () {
    var target = window.location.hash;
    if (target && pages.indexOf(target.substr(1, target.length - 1)) > -1) {
        currentRequestId = pages.indexOf(target.substr(1, target.length - 1))
    }
    console.log("...loading page contents...", target, currentRequestId);
    loadPage(pages[currentRequestId]);
});

$(window).bind("popstate", function (e) {
    var state = e.originalEvent.state;
    if (state === null) {
        console.log("normal navigation");
    } else {
        loadPage(state.page);
    }
});

window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});

window.onresize = function() {
    closeSlider('left');
    closeSlider('right');
}
