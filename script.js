document.addEventListener('DOMContentLoaded', function() {
    const layers = {
        redLayer: document.getElementById('redLayer'),
        greenLayer: document.getElementById('greenLayer'),
        blueLayer: document.getElementById('blueLayer')
    };
    const allLayers = Object.values(layers);

    // Function to toggle visibility of a layer
    function toggleLayer(layer) {
        const img = layers[layer];
        if (img.style.display === 'block') {
            img.style.display = 'none'; // Hide the layer if it is visible
        } else {
            img.style.display = 'block'; // Show the layer if it is hidden
        }
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
