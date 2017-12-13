// var content = { 'index-1': ['About <em>Sofie Gagelmans</em>', '<em>LUCA Showcase</em>'] }
//
// 'index-1' :
//
// ['About <em>Sofie Gagelmans</em>', '<em>LUCA Showcase</em>'] :
// dit zijn de linker en rechterknop van de footer, gescheiden door een komma, html mag, maar wees zuinig
//

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

function preparePage(page) {
    if (currentRequestId === 0) {
        $('a.previous').css('opacity', 0);
    } else {
        $('a.previous').css('opacity', 1);
    }

    $('#left-slide-button').html(content[page][0]);
    $('#right-slide-button').html(content[page][1]);

    $(".fade-container").fadeOut(0);
}

function loadPage(page) {
    preparePage(page);
    $(".fade-container").load(page + '.html?_' + (new Date()).getTime(), function () {
        $(".fade-container").fadeIn(200);
        const container = document.querySelector('#style-2');
        // TODO: add check here:
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
