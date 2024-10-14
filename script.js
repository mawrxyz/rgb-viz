document.addEventListener('DOMContentLoaded', function() {
    const layers = {
        redLayer: document.getElementById('redLayer'),
        greenLayer: document.getElementById('greenLayer'),
        blueLayer: document.getElementById('blueLayer')
    };
    const allLayers = Object.values(layers);

    function showLayer(layer) {
        // Hide all layers first
        allLayers.forEach(img => img.style.display = 'none');

        if (layer && layers[layer]) {
            // Show the specified layer if it exists
            layers[layer].style.display = 'block';
        } else if (!layer) {
            // If no layer is specified, show all layers (for "Original")
            allLayers.forEach(img => img.style.display = 'block');
        } else {
            console.warn("Layer not found:", layer); // Handle case where the layer is invalid
        }
    }

    document.querySelectorAll('#toggle div').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('#toggle div').forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const dataLayer = button.getAttribute('data-layer');
            if (dataLayer === 'allLayers') {
                showLayer(null); // Pass null to show all layers
            } else {
                showLayer(dataLayer);
            }
        });
    });

    // Initialize by showing all layers and setting the "Original" button as active
    showLayer(null); // Pass null to show all layers on initial load
    document.querySelector('[data-layer="allLayers"]').classList.add('active');
});
