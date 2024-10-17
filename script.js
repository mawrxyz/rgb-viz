document.addEventListener('DOMContentLoaded', function() {
    const layers = {
        redLayer: document.querySelectorAll('.redLayer'),
        greenLayer: document.querySelectorAll('.greenLayer'),
        blueLayer: document.querySelectorAll('.blueLayer')
    };

    const allLayers = [...layers.redLayer, ...layers.greenLayer, ...layers.blueLayer];

    const fullscreenButton = document.getElementById('fullscreen-button');
    const expandIcon = document.getElementById('expand-icon');
    const collapseIcon = document.getElementById('collapse-icon');

    // Function to toggle visibility of a layer
    function toggleLayer(layer) {
        layers[layer].forEach(img => {
            img.style.display = (img.style.display === 'block' || img.style.display === '')
                ? 'none' : 'block'; // Toggle visibility
        });
    }

    // Update tooltips dynamically for layer buttons
    function updateTooltip(button) {
        const dataLayer = button.getAttribute('data-layer');
        const isActive = button.classList.contains('active');
        const lightColor = dataLayer.replace('Layer', '').toLowerCase();
        const action = isActive ? 'off' : 'on';
        
        const tooltipText = `Toggle ${lightColor} visibility ${action}`;
        button.setAttribute('title', tooltipText); // Modify the tooltip
    }

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
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        toggleIcons(true);
        fullscreenButton.setAttribute('title', 'Exit fullscreen');
    }

    // Exit full-screen mode
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        toggleIcons(false);
        fullscreenButton.setAttribute('title', 'Fullscreen');
    }

    // Toggle icons based on full-screen state
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
        const isFullscreen = !!document.fullscreenElement;
        toggleIcons(isFullscreen);
        fullscreenButton.setAttribute('title', isFullscreen ? 'Exit fullscreen' : 'Fullscreen');
    });

    // Add event listener to full-screen button
    fullscreenButton.addEventListener('click', toggleFullscreen);

    // Show all layers on page load
    function showAllLayers() {
        allLayers.forEach(img => img.style.display = 'block');
    }

    // Add event listeners to toggle buttons
    document.querySelectorAll('#toggle div').forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('active'); // Toggle active class
            const dataLayer = button.getAttribute('data-layer'); // Get layer name
            toggleLayer(dataLayer); // Toggle the corresponding layer
            updateTooltip(button); // Update tooltip after each click
        });

        // Initialize tooltips on page load
        updateTooltip(button);
    });

    // Show all layers on page load
    showAllLayers();
});
