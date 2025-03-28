document.addEventListener('DOMContentLoaded', () => {
    // Fetch photosynthesis data
    fetch('/photosynthesis')
        .then(response => response.json())
        .then(data => {
            // Display explanation
            const explanationDiv = document.getElementById('explanation');
            explanationDiv.innerHTML = `<h2>Explanation</h2><p>${data.explanation}</p>`;

            // Create flashcards
            const flashcardsDiv = document.getElementById('flashcards');
            data.flashcards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('flashcard');
                cardElement.setAttribute('data-index', index);
                
                // Initial state shows front
                cardElement.innerHTML = `<strong>Card ${index + 1}:</strong> ${card.front}`;
                
                // Add click event to flip card
                cardElement.addEventListener('click', () => {
                    if (cardElement.classList.contains('flipped')) {
                        // If already flipped, show front
                        cardElement.innerHTML = `<strong>Card ${index + 1}:</strong> ${card.front}`;
                        cardElement.classList.remove('flipped');
                    } else {
                        // Flip to back
                        cardElement.innerHTML = `<strong>Card ${index + 1}:</strong> ${card.back}`;
                        cardElement.classList.add('flipped');
                    }
                });

                flashcardsDiv.appendChild(cardElement);
            });
        })
        .catch(error => {
            console.error('Error fetching photosynthesis data:', error);
        });
});