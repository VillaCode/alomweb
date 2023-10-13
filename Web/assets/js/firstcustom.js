window.onload = function() {
    // Set a delay of 5 seconds after the page has loaded
    setTimeout(function() {
        let hasReachedScrollPoint = false;
        const gridcarElement = document.querySelector('#gridcar');
        const initialInnerHTML = gridcarElement.innerHTML;

        const observer = new MutationObserver((mutations) => {
            if (!hasReachedScrollPoint) {
                gridcarElement.innerHTML = initialInnerHTML; // Revert back to the initial state
            }
        });

        observer.observe(gridcarElement, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeOldValue: true
        });

        window.addEventListener('scroll', function() {
            const portfolioElemTopToViewport = document.querySelector('#portfolioid').getBoundingClientRect().top;
            
            console.log(portfolioElemTopToViewport);

            if (portfolioElemTopToViewport <= 0 && !hasReachedScrollPoint) {
                hasReachedScrollPoint = true;
                observer.disconnect(); // stop observing changes
            }
        });

    }, 5000); // 5000 milliseconds delay = 5 seconds
}
