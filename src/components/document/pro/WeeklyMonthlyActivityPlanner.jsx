import React, { useEffect, useRef, useState } from 'react';

const WeeklyMonthlyActivityPlanner = () => {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch('/weekly_monthly_activity_planner.html', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load content');
                let html = await res.text();
                if (cancelled) return;
                const el = containerRef.current;
                if (!el) return;
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
                // Inject responsive overrides to ensure embedded content scales on small screens
                const responsiveCss = `
.pro-scope { max-width: 100% !important; width: 100% !important; margin: 0 auto; word-break: break-word; overflow-wrap: anywhere; }
.pro-scope * { box-sizing: border-box; }
.pro-scope img, .pro-scope video, .pro-scope svg, .pro-scope canvas { max-width: 100% !important; height: auto !important; }
.pro-scope iframe, .pro-scope embed, .pro-scope object { width: 100% !important; max-width: 100% !important; }
.pro-scope table { width: 100% !important; display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.pro-scope [style*="width:"] { max-width: 100% !important; }
@media (max-width: 1024px) {
  .pro-scope h1 { font-size: 1.75rem !important; }
  .pro-scope h2 { font-size: 1.5rem !important; }
  .pro-scope h3 { font-size: 1.25rem !important; }
}
@media (max-width: 768px) {
  .pro-scope .container, .pro-scope .wrapper, .pro-scope .content { width: 100% !important; max-width: 100% !important; padding-left: 0.75rem; padding-right: 0.75rem; }
  .pro-scope .row, .pro-scope [class*="col-"] { width: 100% !important; max-width: 100% !important; }
}`;
                const responsiveStyleEl = document.createElement('style');
                responsiveStyleEl.textContent = responsiveCss;
                el.querySelector('.pro-scope')?.append(responsiveStyleEl);
                const scripts = Array.from(el.querySelectorAll('script'));
                for (const s of scripts) {
                    const n = document.createElement('script');
                    Array.from(s.attributes).forEach(a => n.setAttribute(a.name, a.value));
                    n.text = s.text;
                    s.parentNode.replaceChild(n, s);
                }
                try { document.dispatchEvent(new Event('DOMContentLoaded')); } catch (_) { }
            } catch (e) {
                setError(e.message || 'Failed to render content');
            }
        }
        load();
        return () => { cancelled = true; if (containerRef.current) containerRef.current.innerHTML = ''; };
    }, []);

    return (
        <div className="w-full min-h-[400px] sm:min-h-[900px] bg-white/5 rounded-md border border-white/10 overflow-x-auto">
            {error ? (
                <div className="p-4 text-sm text-red-400">{error}</div>
            ) : (
                <div ref={containerRef} />
            )}
        </div>
    );
};

export default WeeklyMonthlyActivityPlanner;


