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
