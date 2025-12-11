export function scrollToTop() {
    // Small delay to ensure route change and DOM update are complete
    setTimeout(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            // Try window.scrollTo first (most reliable)
            try {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
            } catch (e) {
                // Fallback for browsers that don't support scrollTo options
                window.scrollTo(0, 0)
            }
            
            // Also set scrollTop on both documentElement and body for maximum compatibility
            // This ensures scroll works even if smooth scroll fails
            if (document.documentElement) {
                document.documentElement.scrollTop = 0
            }
            if (document.body) {
                document.body.scrollTop = 0
            }
        })
    }, 50) // Small delay to allow route change to complete
}