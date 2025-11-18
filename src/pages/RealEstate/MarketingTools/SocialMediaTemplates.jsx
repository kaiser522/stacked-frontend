import React, { useEffect, useRef, useState } from "react";

const gradients = [
    "linear-gradient(135deg, #40e0d0, #36c5b6)",
    "linear-gradient(135deg, #3a4a5c, #2c3e50)",
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    // "linear-gradient(135deg, #ffecd2, #fcb69f)",
    // "linear-gradient(45deg, #4a5a6c, #3a4a5c)",
    // "linear-gradient(45deg, #4facfe, #00f2fe)",
];

function createCanvasGradient(ctx, gradientString, width, height) {
    const g = gradientString || gradients[0];
    const diag = g.includes("45deg") ? ctx.createLinearGradient(0, 0, width, height) : ctx.createLinearGradient(0, 0, width, height);
    const colors = g.match(/#[0-9a-f]{6}/gi) || ["#40e0d0", "#36c5b6"];
    diag.addColorStop(0, colors[0]);
    diag.addColorStop(1, colors[1] || colors[0]);
    return diag;
}

export default function SocialMediaTemplates() {
    const quoteCanvas = useRef(null);
    const annCanvas = useRef(null);
    const tipCanvas = useRef(null);
    const statsCanvas = useRef(null);

    const [quote, setQuote] = useState({
        text: '"Success is not final, failure is not fatal: it is the courage to continue that counts."',
        author: "Winston Churchill",
        bg: gradients[0],
    });
    const [ann, setAnn] = useState({ title: "BIG NEWS!", message: "We're excited to announce our latest product launch. Stay tuned for more details!", bg: gradients[1] });
    const [tip, setTip] = useState({ num: "1", title: "Pro Tip", content: "Always engage with your audience within the first hour of posting for maximum reach and engagement.", bg: gradients[5] });
    const [stats, setStats] = useState({ number: "75%", label: "Increase in Engagement", description: "Since implementing our new social media strategy this quarter", bg: gradients[1] });

    const wrapLines = (ctx, text, maxWidth) => {
        const words = text.split(" ");
        let line = "";
        const lines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line.trim());
                line = words[n] + " ";
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());
        return lines;
    };

    const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight, align = "center") => {
        const lines = wrapLines(ctx, text, maxWidth);
        lines.forEach((ln, idx) => {
            const lineY = y + idx * lineHeight;
            const w = ctx.measureText(ln).width;
            let drawX = x;
            if (align === "center") drawX = x - w / 2;
            else if (align === "right") drawX = x - w;
            // Always draw with left alignment to avoid subpixel shifts
            ctx.textAlign = "left";
            ctx.fillText(ln, drawX, lineY);
        });
        return y + (lines.length - 1) * lineHeight; // last baseline
    };

    const drawQuote = () => {
        const canvas = quoteCanvas.current; if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = createCanvasGradient(ctx, quote.bg, width, height);
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#2c3e50";
        // Measure to center vertically (text + author as a block)
        ctx.font = "bold 30px Arial";
        const quoteLines = wrapLines(ctx, quote.text, width - 160);
        const quoteHeight = (quoteLines.length - 1) * 36 + 30; // n-1 gaps plus baseline
        const authorFont = 20;
        const gap = 28;
        const totalBlock = quoteHeight + gap + authorFont;
        let startY = (height - totalBlock) / 2 + 30; // baseline offset
        // Draw quote lines
        ctx.textAlign = "center";
        quoteLines.forEach((ln, i) => ctx.fillText(ln, width / 2, startY + i * 36));
        // Draw author
        ctx.fillStyle = "rgba(44,62,80,0.85)";
        ctx.font = `${authorFont}px Arial`;
        ctx.fillText(`— ${quote.author}`, width / 2, startY + quoteHeight + gap);
    };

    const drawAnnouncement = () => {
        const canvas = annCanvas.current; if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = createCanvasGradient(ctx, ann.bg, width, height);
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#40e0d0";
        // Compute vertical centering for title + message
        ctx.font = "bold 44px Arial";
        ctx.textAlign = "center";
        const titleHeight = 44; // approximate baseline height
        ctx.fillStyle = "#fff";
        ctx.font = "22px Arial";
        const msgLines = wrapLines(ctx, ann.message, width - 140);
        const msgHeight = (msgLines.length - 1) * 30 + 22;
        const block = titleHeight + 16 + msgHeight; // 16px gap between title and message
        let blockTop = (height - block) / 2 + 22;
        // Draw title
        ctx.fillStyle = "#40e0d0";
        ctx.font = "bold 44px Arial";
        ctx.fillText(ann.title, width / 2, blockTop);
        // Draw message
        ctx.fillStyle = "#fff";
        ctx.font = "22px Arial";
        msgLines.forEach((ln, i) => ctx.fillText(ln, width / 2, blockTop + 16 + titleHeight + i * 30));
    };

    const drawTip = () => {
        const canvas = tipCanvas.current; if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = createCanvasGradient(ctx, tip.bg, width, height);
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#40e0d0";
        ctx.beginPath(); ctx.arc(140, 140, 56, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#2c3e50"; ctx.font = "bold 40px Arial"; ctx.textAlign = "center"; ctx.fillText(tip.num, 140, 152);
        ctx.fillStyle = "#fff"; ctx.font = "bold 36px Arial"; ctx.textAlign = "left"; ctx.fillText(tip.title, 210, 152);
        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.font = "22px Arial";
        drawWrappedText(ctx, tip.content, 60, 230, width - 120, 30, "left");
    };

    const drawStats = () => {
        const canvas = statsCanvas.current; if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = createCanvasGradient(ctx, stats.bg, width, height);
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#40e0d0"; ctx.font = "bold 72px Arial"; ctx.textAlign = "center"; ctx.fillText(stats.number, width / 2, height / 2 - 16);
        ctx.fillStyle = "#fff"; ctx.font = "bold 28px Arial"; ctx.fillText(stats.label, width / 2, height / 2 + 24);
        ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.font = "20px Arial"; drawWrappedText(ctx, stats.description, width / 2, height / 2 + 62, width - 120, 28);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { drawQuote(); }, [quote]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { drawAnnouncement(); }, [ann]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { drawTip(); }, [tip]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { drawStats(); }, [stats]);

    const DownloadCanvas = (canvasRef, filename) => {
        const base = canvasRef.current; if (!base) return;
        // upscale to 1080x1080 for crisp output
        const dl = document.createElement("canvas");
        dl.width = 1080; dl.height = 1080; const scale = 1080 / base.width; const ctx = dl.getContext("2d");
        ctx.scale(scale, scale); ctx.drawImage(base, 0, 0);
        const link = document.createElement("a");
        link.download = `${filename}-${Date.now()}.png`;
        link.href = dl.toDataURL("image/png");
        link.click();
    };

    const ColorPicker = ({ value, onChange, choices }) => (
        <div className="flex gap-2 flex-wrap">
            {choices.map((g) => (
                <div key={g} onClick={() => onChange(g)} style={{ background: g, width: 36, height: 36, borderRadius: 8, cursor: "pointer", border: value === g ? "3px solid #21D4C6" : "3px solid transparent" }} />
            ))}
        </div>
    );

    const downloadAll = () => {
        setTimeout(() => DownloadCanvas(quoteCanvas, 'inspirational-quote'), 100);
        setTimeout(() => DownloadCanvas(annCanvas, 'announcement-post'), 300);
        setTimeout(() => DownloadCanvas(tipCanvas, 'tip-post'), 500);
        setTimeout(() => DownloadCanvas(statsCanvas, 'statistics-post'), 700);
    };

    return (
        <div className="min-h-screen bg-[#3A4E5E] text-white">
            <main className="max-w-[1400px] mx-auto px-8 py-8 border-l-4 border-[#21D4C6]">
                {/* Header - mirrors original HTML */}
                <section className="mb-8">
                    <div className="rounded-2xl border-2 border-[#21D4C6] p-6 bg-[#3A4E5E]">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="w-14 h-14 rounded-xl bg-[#21D4C6] text-black flex items-center justify-center text-3xl">📱</div>
                            <h1 className="text-3xl md:text-4xl font-bold">Social Media Post Generator</h1>
                        </div>
                        <p className="text-center text-[#A0B0C0] mb-4">Create Instagram and Facebook ready posts in seconds.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A0B0C0] mb-4">
                            <span>📱 1080×1080 Square Format</span>
                            <span>🎨 High Quality PNG/JPG</span>
                            <span>⚡ Instant Download</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            {['quote', 'announcement', 'tips', 'statistics'].map(t => (
                                <span key={t} className="px-4 py-1 rounded-full text-sm bg-[#2f3f4e] border border-[#21D4C6] text-[#21D4C6]">{t}</span>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button onClick={downloadAll} className="px-6 py-3 bg-[#21D4C6] text-black font-semibold rounded-xl shadow-inner">Download All Templates</button>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {/* Quote */}
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Inspirational Quote</h3></div>
                        <div className="p-5 flex justify-center bg-[#2c3e50]">
                            <canvas ref={quoteCanvas} width={400} height={400} className="border-2 border-[#21D4C6] rounded-lg bg-white" />
                        </div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Quote Text</label>
                                <textarea className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={quote.text} onChange={(e) => setQuote({ ...quote, text: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Author</label>
                                <input className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={quote.author} onChange={(e) => setQuote({ ...quote, author: e.target.value })} />
                            </div>
                            <ColorPicker value={quote.bg} onChange={(v) => setQuote({ ...quote, bg: v })} choices={gradients} />
                            <button className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2" onClick={() => DownloadCanvas(quoteCanvas, 'inspirational-quote')}>Download PNG</button>
                        </div>
                    </div>

                    {/* Announcement */}
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Announcement Post</h3></div>
                        <div className="p-5 flex justify-center bg-[#2c3e50]">
                            <canvas ref={annCanvas} width={400} height={400} className="border-2 border-[#21D4C6] rounded-lg bg-white" />
                        </div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Title</label>
                                <input className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={ann.title} onChange={(e) => setAnn({ ...ann, title: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Message</label>
                                <textarea className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={ann.message} onChange={(e) => setAnn({ ...ann, message: e.target.value })} />
                            </div>
                            <ColorPicker value={ann.bg} onChange={(v) => setAnn({ ...ann, bg: v })} choices={gradients} />
                            <button className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2" onClick={() => DownloadCanvas(annCanvas, 'announcement-post')}>Download PNG</button>
                        </div>
                    </div>

                    {/* Tip */}
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Tips & Advice</h3></div>
                        <div className="p-5 flex justify-center bg-[#2c3e50]">
                            <canvas ref={tipCanvas} width={400} height={400} className="border-2 border-[#21D4C6] rounded-lg bg-white" />
                        </div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Tip #</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={tip.num} onChange={(e) => setTip({ ...tip, num: e.target.value })} placeholder="Tip number" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Title</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={tip.title} onChange={(e) => setTip({ ...tip, title: e.target.value })} placeholder="Tip title" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Content</label>
                                <textarea className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={tip.content} onChange={(e) => setTip({ ...tip, content: e.target.value })} />
                            </div>
                            <ColorPicker value={tip.bg} onChange={(v) => setTip({ ...tip, bg: v })} choices={gradients} />
                            <button className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2" onClick={() => DownloadCanvas(tipCanvas, 'tip-post')}>Download PNG</button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-[#4A5E6E] rounded-xl border border-[#5A6E7E] overflow-hidden">
                        <div className="p-5 bg-[#3A4E5E]"><h3 className="text-lg font-semibold">Statistics & Data</h3></div>
                        <div className="p-5 flex justify-center bg-[#2c3e50]">
                            <canvas ref={statsCanvas} width={400} height={400} className="border-2 border-[#21D4C6] rounded-lg bg-white" />
                        </div>
                        <div className="p-5 bg-[#3A4E5E] space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Number</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={stats.number} onChange={(e) => setStats({ ...stats, number: e.target.value })} placeholder="Main number" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-[#A0B0C0]">Label</label>
                                    <input className="bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={stats.label} onChange={(e) => setStats({ ...stats, label: e.target.value })} placeholder="Label" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-[#A0B0C0]">Description</label>
                                <textarea className="w-full bg-[#2c3e50] border border-[#5a6a7c] rounded px-2 py-2" value={stats.description} onChange={(e) => setStats({ ...stats, description: e.target.value })} />
                            </div>
                            <ColorPicker value={stats.bg} onChange={(v) => setStats({ ...stats, bg: v })} choices={gradients} />
                            <button className="w-full bg-[#21D4C6] text-black font-semibold rounded px-3 py-2" onClick={() => DownloadCanvas(statsCanvas, 'statistics-post')}>Download PNG</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


