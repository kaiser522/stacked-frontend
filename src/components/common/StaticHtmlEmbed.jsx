import React, { useEffect, useRef, useState } from 'react';

const StaticHtmlEmbed = ({ src, className }) => {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        async function loadHtml() {
            setError(null);
            try {
                const response = await fetch(src, { cache: 'no-store' });
                if (!response.ok) throw new Error(`Failed to load: ${src}`);
                const htmlText = await response.text();
                if (isCancelled) return;

                const container = containerRef.current;
                if (!container) return;

                container.innerHTML = htmlText;

                // Inject responsive CSS scoped ONLY to the embedded content container
                // This prevents affecting Intercom widget or other page elements
                const style = document.createElement('style');
                style.textContent = `
                    /* Only target elements within the embedded HTML container */
                    .static-html-container .container, 
                    .static-html-container [class*="container"]:not([id*="intercom"]):not([class*="intercom"]), 
                    .static-html-container [class*="Container"]:not([id*="intercom"]):not([class*="intercom"]) {
                        max-width: 100% !important;
                        width: 100% !important;
                        margin: 0 !important;
                    }
                    .static-html-container img:not([src*="intercom"]), 
                    .static-html-container video:not([src*="intercom"]), 
                    .static-html-container iframe:not([src*="intercom"]):not([title*="Intercom"]) {
                        max-width: 100% !important;
                        height: auto !important;
                    }
                `;
                container.insertBefore(style, container.firstChild);
                container.classList.add('static-html-container');

                // Execute any inline scripts inserted via innerHTML
                const scriptNodes = Array.from(container.querySelectorAll('script'));
                for (const oldScript of scriptNodes) {
                    const newScript = document.createElement('script');
                    // Copy attributes
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.textContent = oldScript.textContent;
                    // Replace script to trigger execution
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                }

                // Dispatch DOMContentLoaded to trigger any listeners inside the embedded content
                try {
                    document.dispatchEvent(new Event('DOMContentLoaded'));
                } catch {
                    // Ignore dispatch errors
                }
            } catch (e) {
                setError(e.message || 'Failed to render content');
            }
        }

        loadHtml();
        return () => {
            isCancelled = true;
            const container = containerRef.current;
            if (container) container.innerHTML = '';
        };
    }, [src]);

    return (
        <div className={className}>
            {error ? (
                <div className="p-4 rounded-md bg-red-600/10 border border-red-600/20 text-red-400 text-sm">{error}</div>
            ) : (
                <div ref={containerRef} />
            )}
        </div>
    );
};

export default StaticHtmlEmbed;


