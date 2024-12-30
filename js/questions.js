// Questions Interaction Script
document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.folder');
    
    folders.forEach(folder => {
        const smallFolder = folder.querySelector('.small-folder');
        
        if (smallFolder) {
            // Initially hide small folder
            smallFolder.style.display = 'none';
            
            // Add click event listener to folder
            folder.addEventListener('click', (event) => {
                // Prevent event if clicking inside small-folder
                if (event.target.closest('.small-folder')) {
                    return;
                }

                // Close all other small folders
                document.querySelectorAll('.small-folder').forEach(sf => {
                    if (sf !== smallFolder) {
                        sf.style.display = 'none';
                    }
                });

                // Toggle current small folder
                smallFolder.style.display = 
                    smallFolder.style.display === 'block' ? 'none' : 'block';
            });

            // Add hover event for additional interaction
            folder.addEventListener('mouseenter', () => {
                smallFolder.style.display = 'block';
            });

            folder.addEventListener('mouseleave', () => {
                // Only hide if not already clicked open
                if (smallFolder.style.display !== 'block') {
                    smallFolder.style.display = 'none';
                }
            });
        }
    });
});
