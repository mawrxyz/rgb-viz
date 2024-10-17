document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the layer classes (redLayer, greenLayer, blueLayer)
    const layers = {
        redLayer: document.querySelectorAll('.redLayer'),
        greenLayer: document.querySelectorAll('.greenLayer'),
        blueLayer: document.querySelectorAll('.blueLayer')
    };

    const allLayers = [...layers.redLayer, ...layers.greenLayer, ...layers.blueLayer];

    // Function to toggle visibility of a layer (all elements with the same class)
    function toggleLayer(layer) {
        layers[layer].forEach(img => {
            if (img.style.display === 'block' || img.style.display === '') {
                img.style.display = 'none'; // Hide the layer if it is visible
            } else {
                img.style.display = 'block'; // Show the layer if it is hidden
            }
        });
    }

    document.getElementById('fullscreenButton').addEventListener('click', function() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    });

    const fullscreenButton = document.getElementById('fullscreen-button');
const expandIcon = document.getElementById('expand-icon');
const collapseIcon = document.getElementById('collapse-icon');

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
});

function enterFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }

    toggleIcons(true);
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }

    toggleIcons(false);
}

function toggleIcons(isFullscreen) {
    if (isFullscreen) {
        expandIcon.style.display = 'none';
        collapseIcon.style.display = 'block';
    } else {
        expandIcon.style.display = 'block';
        collapseIcon.style.display = 'none';
    }
}

// Listen for full-screen changes and update icons accordingly
document.addEventListener('fullscreenchange', () => {
    toggleIcons(!!document.fullscreenElement);
});

    // Initially show all layers
    function showAllLayers() {
        allLayers.forEach(img => img.style.display = 'block');
    }

    // Add event listeners to toggle buttons
    document.querySelectorAll('#toggle div').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle the active class for the button
            button.classList.toggle('active');

            // Toggle the corresponding layer
            const dataLayer = button.getAttribute('data-layer');
            toggleLayer(dataLayer);
        });
    });

    // On page load, show all layers
    showAllLayers();
});
