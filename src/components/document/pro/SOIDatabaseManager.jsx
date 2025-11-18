import React, { useEffect, useRef, useState } from 'react';

const SOIDatabaseManager = () => {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch('/soi_database_manager.html', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load content');
                let html = await res.text();
                if (cancelled) return;
                const el = containerRef.current;
                if (!el) return;
                // Extract and scope styles to .pro-scope
                const styles = [];
                html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => { styles.push(css); return ''; });
                const scopedCss = styles.map(css => {
                    let scoped = css
                        .replace(/\bbody\b/g, '.pro-scope')
                        .replace(/\bhtml\b/g, '.pro-scope')
                        .replace(/:root\b/g, '.pro-scope')
                        .replace(/(^|,)\s*\*/g, '$1 .pro-scope *');
                    scoped = scoped.replace(/(^|\}|;)\s*([^@}{]+)\{/gm, (m, p1, selectors) => {
                        const newSelectors = selectors.split(',').map(s => {
                            const t = s.trim();
                            if (!t) return t;
                            if (t.startsWith('.pro-scope')) return t;
                            return `.pro-scope ${t}`;
                        }).join(', ');
                        return `${p1} ${newSelectors}{`;
                    });
                    return scoped;
                }).join('\n');

                el.innerHTML = `<div class="pro-scope">${html}</div>`;
                if (scopedCss) {
                    const styleEl = document.createElement('style');
                    styleEl.textContent = scopedCss;
                    el.querySelector('.pro-scope')?.prepend(styleEl);
                }
                const scripts = Array.from(el.querySelectorAll('script'));
                const head = document.head;
                const originalInsertAdjacentHTML = head.insertAdjacentHTML ? head.insertAdjacentHTML.bind(head) : null;
                const originalAppendChild = head.appendChild.bind(head);
                if (head.insertAdjacentHTML) {
                    head.insertAdjacentHTML = function () { /* block external head injections from embedded HTML */ };
                }
                head.appendChild = function (node) {
                    if (node && node.tagName) {
                        const tag = node.tagName.toLowerCase();
                        if (tag === 'style' || tag === 'link') {
                            return node; // prevent global style/link injection
                        }
                    }
                    return originalAppendChild(node);
                };
                try {
                    for (const s of scripts) {
                        const n = document.createElement('script');
                        Array.from(s.attributes).forEach(a => n.setAttribute(a.name, a.value));
                        n.text = s.text;
                        s.parentNode.replaceChild(n, s);
                    }
                } finally {
                    if (originalInsertAdjacentHTML) head.insertAdjacentHTML = originalInsertAdjacentHTML;
                    head.appendChild = originalAppendChild;
                }
            } catch (e) {
                setError(e.message || 'Failed to render content');
            }
        }
        load();
        return () => { cancelled = true; if (containerRef.current) containerRef.current.innerHTML = ''; };
    }, []);

    return (
        <div className="w-full min-h-[900px] bg-white/5 rounded-md border border-white/10">
            {error ? (
                <div className="p-4 text-sm text-red-400">{error}</div>
            ) : (
                <div ref={containerRef} />
            )}
        </div>
    );
};

export default SOIDatabaseManager;


