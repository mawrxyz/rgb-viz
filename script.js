document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the layer classes (redLayer, greenLayer, blueLayer)
    const layers = {
        redLayer: document.querySelectorAll('.redLayer'),
        greenLayer: document.querySelectorAll('.greenLayer'),
        blueLayer: document.querySelectorAll('.blueLayer')
    };

    const allLayers = [...layers.redLayer, ...layers.greenLayer, ...layers.blueLayer];

    // Function to toggle visibility of a layer
    function toggleLayer(layer) {
        layers[layer].forEach(img => {
            if (img.style.display === 'block' || img.style.display === '') {
                img.style.display = 'none'; // Hide the layer if visible
            } else {
                img.style.display = 'block'; // Show the layer if hidden
            }
        });
    }

    // Full-screen button elements
    const fullscreenButton = document.getElementById('fullscreen-button');
    const expandIcon = document.getElementById('expand-icon');
    const collapseIcon = document.getElementById('collapse-icon');

    // Toggle full-screen mode
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    }

    // Enter full-screen mode
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

    // Exit full-screen mode
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

    // Toggle the icons based on full-screen state
    function toggleIcons(isFullscreen) {
        if (isFullscreen) {
            expandIcon.style.display = 'none';
            collapseIcon.style.display = 'block';
        } else {
            expandIcon.style.display = 'block';
            collapseIcon.style.display = 'none';
        }
    }

    // Listen for full-screen changes
    document.addEventListener('fullscreenchange', () => {
        toggleIcons(!!document.fullscreenElement);
    });

    // Add event listener to full-screen button
    fullscreenButton.addEventListener('click', toggleFullscreen);

    // Function to show all layers on page load
    function showAllLayers() {
        allLayers.forEach(img => img.style.display = 'block');
    }

    // Add event listeners to the toggle buttons
    document.querySelectorAll('#toggle div').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle the active class for the button
            button.classList.toggle('active');

            // Toggle the corresponding layer visibility
            const dataLayer = button.getAttribute('data-layer');
            toggleLayer(dataLayer);
        });
    });

    // On page load, show all layers
    showAllLayers();
});
