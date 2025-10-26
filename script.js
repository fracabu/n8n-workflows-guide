// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('searchInput');

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });

    // Navigate to section function
    window.navigateToSection = function(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });

            // Scroll to top of content
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Update URL hash without scrolling
            history.pushState(null, null, '#' + sectionId);
        }
    };

    // Handle initial navigation based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        navigateToSection(initialHash);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            navigateToSection(hash);
        } else {
            navigateToSection('intro');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            // If search is empty, return to current section
            return;
        }

        // Search through all sections
        let foundResults = false;
        contentSections.forEach(section => {
            const content = section.textContent.toLowerCase();

            if (content.includes(searchTerm)) {
                if (!foundResults) {
                    // Show first matching section
                    navigateToSection(section.id);
                    foundResults = true;
                }

                // Highlight matching text (optional enhancement)
                highlightSearchTerm(section, searchTerm);
            }
        });
    });

    // Highlight search terms in content
    function highlightSearchTerm(section, searchTerm) {
        if (!searchTerm) return;

        // Remove previous highlights
        const previousHighlights = section.querySelectorAll('.search-highlight');
        previousHighlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });

        if (searchTerm.length < 3) return; // Only highlight if search term is 3+ characters

        // Add new highlights
        const walker = document.createTreeWalker(
            section,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.parentElement.tagName !== 'SCRIPT' &&
                node.parentElement.tagName !== 'STYLE' &&
                !node.parentElement.classList.contains('search-highlight')) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const lowerText = text.toLowerCase();
            const index = lowerText.indexOf(searchTerm);

            if (index !== -1) {
                const beforeText = text.substring(0, index);
                const matchText = text.substring(index, index + searchTerm.length);
                const afterText = text.substring(index + searchTerm.length);

                const fragment = document.createDocumentFragment();
                fragment.appendChild(document.createTextNode(beforeText));

                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'search-highlight';
                highlightSpan.style.backgroundColor = '#ffeb3b';
                highlightSpan.style.padding = '2px 4px';
                highlightSpan.style.borderRadius = '3px';
                highlightSpan.textContent = matchText;
                fragment.appendChild(highlightSpan);

                fragment.appendChild(document.createTextNode(afterText));

                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    // Clear search highlights when input is cleared
    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            if (searchInput.value === '') {
                document.querySelectorAll('.search-highlight').forEach(highlight => {
                    const parent = highlight.parentNode;
                    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                    parent.normalize();
                });
            }
        }, 200);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                navigateToSection(targetId);
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }

        // Press 'Escape' to clear search and blur
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();

            // Clear highlights
            document.querySelectorAll('.search-highlight').forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
        }
    });

    // Add reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 280px;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #ea4b71, #ff6b6b);
        transform-origin: left;
        transform: scaleX(0);
        z-index: 9999;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / documentHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });

    // Add copy button to code blocks
    document.querySelectorAll('code').forEach(codeBlock => {
        if (codeBlock.textContent.length > 20) {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';

            codeBlock.parentNode.insertBefore(wrapper, codeBlock);
            wrapper.appendChild(codeBlock);

            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copia';
            copyButton.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                padding: 2px 8px;
                font-size: 0.75rem;
                background: #ea4b71;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            wrapper.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });

            wrapper.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });

            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    copyButton.textContent = 'Copiato!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copia';
                    }, 2000);
                });
            });

            wrapper.appendChild(copyButton);
        }
    });

    // Add scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ea4b71, #ff6b6b);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(234, 75, 113, 0.4);
    `;

    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
        } else {
            scrollTopButton.style.opacity = '0';
        }
    });

    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Print functionality
    window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });

    console.log('N8N Workflows Guide - Initialized successfully! 🚀');
    console.log('Keyboard shortcuts:');
    console.log('  "/" - Focus search');
    console.log('  "Escape" - Clear search');
    console.log('  "Ctrl/Cmd + P" - Print current section');
});

// Function to copy workflow JSON (Fase 1)
function copyWorkflowJSON() {
    const jsonElement = document.getElementById('workflow-json');
    const jsonText = jsonElement.textContent;

    navigator.clipboard.writeText(jsonText).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ Copiato!';
        button.style.background = '#00b894';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#ea4b71';
        }, 2500);
    }).catch(err => {
        console.error('Errore durante la copia:', err);
        alert('Errore durante la copia. Prova a selezionare e copiare manualmente il testo.');
    });
}

// Function to copy workflow JSON (Fase 2)
function copyWorkflowJSON2() {
    const jsonElement = document.getElementById('workflow-json-fase2');
    const jsonText = jsonElement.textContent;

    navigator.clipboard.writeText(jsonText).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ Copiato!';
        button.style.background = '#00b894';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#ea4b71';
        }, 2500);
    }).catch(err => {
        console.error('Errore durante la copia:', err);
        alert('Errore durante la copia. Prova a selezionare e copiare manualmente il testo.');
    });
}
