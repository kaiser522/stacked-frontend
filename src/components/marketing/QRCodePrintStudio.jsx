import React, { useState, useRef, useEffect } from "react";

export default function QRCodePrintStudio() {
    const [qrCodes, setQrCodes] = useState([
        { label: 'Property Listing', url: 'https://example.com/listing/123', type: 'listing' },
        { label: 'Schedule Tour', url: 'https://calendly.com/youragent', type: 'calendar' }
    ]);
    const [currentLayout, setCurrentLayout] = useState('grid');
    const [brandColor, setBrandColor] = useState('#40e0d0');
    const [brandName, setBrandName] = useState('Your Name');
    const [brandPhone, setBrandPhone] = useState('(555) 123-4567');
    const [brandWebsite, setBrandWebsite] = useState('yourwebsite.com');
    const canvasRef = useRef(null);

    const platformSizes = {
        'ig-post': { width: 1080, height: 1080, name: 'Instagram Post' },
        'ig-story': { width: 1080, height: 1920, name: 'Instagram Story' },
        'fb-post': { width: 1200, height: 630, name: 'Facebook Post' },
        'linkedin': { width: 1200, height: 627, name: 'LinkedIn Post' },
        'twitter': { width: 1200, height: 675, name: 'Twitter Post' },
        'pinterest': { width: 1000, height: 1500, name: 'Pinterest Pin' }
    };

    const addQRCode = () => {
        const label = prompt('QR Code Label:');
        const url = prompt('Destination URL:');
        const type = prompt('QR Code Type (listing/calendar/review/contact/website/custom):') || 'custom';

        if (label && url) {
            setQrCodes(prev => [...prev, { label, url, type }]);
        }
    };

    const removeQRCode = (index) => {
        setQrCodes(prev => prev.filter((_, i) => i !== index));
    };

    const changeBrandColor = (color) => {
        setBrandColor(color);
    };

    const changeLayout = (layout) => {
        setCurrentLayout(layout);
    };

    const updatePreview = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        if (currentLayout === 'grid') {
            drawGridLayout(ctx, width, height);
        } else if (currentLayout === 'flyer') {
            drawFlyerLayout(ctx, width, height);
        } else if (currentLayout === 'sticker') {
            drawStickerLayout(ctx, width, height);
        } else if (currentLayout === 'rider') {
            drawRiderLayout(ctx, width, height);
        }
    };

    const drawGridLayout = (ctx, width, height) => {
        // Header
        ctx.fillStyle = brandColor;
        ctx.fillRect(0, 0, width, 120);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(brandName, width / 2, 50);
        ctx.font = '20px Arial';
        ctx.fillText(`${brandPhone} • ${brandWebsite}`, width / 2, 85);

        // QR Grid
        const cols = 3;
        const rows = Math.ceil(qrCodes.length / cols);
        const qrSize = 150;
        const spacing = 50;
        const startX = (width - (cols * qrSize + (cols - 1) * spacing)) / 2;
        const startY = 160;

        qrCodes.forEach((qr, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * (qrSize + spacing);
            const y = startY + row * (qrSize + spacing + 60);

            // QR Code placeholder
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, qrSize, qrSize);

            // White squares for QR pattern
            ctx.fillStyle = 'white';
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(x + i * 15, y + j * 15, 15, 15);
                    }
                }
            }

            // Label
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(qr.label, x + qrSize / 2, y + qrSize + 25);

            // URL (truncated)
            ctx.font = '12px Arial';
            ctx.fillStyle = '#666';
            const truncatedUrl = qr.url.length > 30 ? qr.url.substring(0, 30) + '...' : qr.url;
            ctx.fillText(truncatedUrl, x + qrSize / 2, y + qrSize + 45);
        });
    };

    const drawFlyerLayout = (ctx, width, height) => {
        // Background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);

        // Header
        ctx.fillStyle = brandColor;
        ctx.fillRect(0, 0, width, 150);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Scan for More Info', width / 2, 60);
        ctx.font = 'bold 24px Arial';
        ctx.fillText(brandName, width / 2, 100);
        ctx.font = '18px Arial';
        ctx.fillText(`${brandPhone} • ${brandWebsite}`, width / 2, 130);

        // Main QR Code (if available)
        if (qrCodes.length > 0) {
            const mainQR = qrCodes[0];
            const qrSize = 300;
            const x = (width - qrSize) / 2;
            const y = 200;

            // QR Code
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, qrSize, qrSize);

            // QR pattern
            ctx.fillStyle = 'white';
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(x + i * 15, y + j * 15, 15, 15);
                    }
                }
            }

            // Label
            ctx.fillStyle = brandColor;
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(mainQR.label, width / 2, y + qrSize + 50);
        }
    };

    const drawStickerLayout = (ctx, width, height) => {
        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Create sticker grid (3x4)
        const stickerWidth = 200;
        const stickerHeight = 200;
        const cols = 3;
        const rows = 4;
        const spacingX = (width - cols * stickerWidth) / (cols + 1);
        const spacingY = (height - rows * stickerHeight) / (rows + 1);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = spacingX + col * (stickerWidth + spacingX);
                const y = spacingY + row * (stickerHeight + spacingY);

                // Sticker background
                ctx.fillStyle = '#f8f9fa';
                ctx.fillRect(x, y, stickerWidth, stickerHeight);

                // Border
                ctx.strokeStyle = '#dee2e6';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, stickerWidth, stickerHeight);

                // QR Code (use first QR or repeat)
                const qrIndex = (row * cols + col) % Math.max(qrCodes.length, 1);
                const qr = qrCodes[qrIndex] || { label: 'Sample QR', url: 'https://example.com' };

                const qrSize = 120;
                const qrX = x + (stickerWidth - qrSize) / 2;
                const qrY = y + 20;

                // QR Code
                ctx.fillStyle = '#000';
                ctx.fillRect(qrX, qrY, qrSize, qrSize);

                // QR pattern
                ctx.fillStyle = 'white';
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (Math.random() > 0.5) {
                            ctx.fillRect(qrX + i * 15, qrY + j * 15, 15, 15);
                        }
                    }
                }

                // Brand name
                ctx.fillStyle = brandColor;
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(brandName, x + stickerWidth / 2, qrY + qrSize + 25);

                // QR Label
                ctx.fillStyle = '#2c3e50';
                ctx.font = '12px Arial';
                ctx.fillText(qr.label, x + stickerWidth / 2, qrY + qrSize + 45);
            }
        }
    };

    const drawRiderLayout = (ctx, width, height) => {
        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Header section
        ctx.fillStyle = brandColor;
        ctx.fillRect(0, 0, width, 100);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(brandName, width / 2, 40);
        ctx.font = '16px Arial';
        ctx.fillText(`${brandPhone} • ${brandWebsite}`, width / 2, 65);

        // QR Grid
        const cols = 3;
        const rows = Math.ceil(qrCodes.length / cols);
        const qrSize = 150;
        const spacing = 50;
        const startX = (width - (cols * qrSize + (cols - 1) * spacing)) / 2;
        const startY = 160;

        qrCodes.forEach((qr, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * (qrSize + spacing);
            const y = startY + row * (qrSize + spacing + 60);

            // QR Code placeholder
            ctx.fillStyle = '#000';
            ctx.fillRect(x, y, qrSize, qrSize);

            // White squares for QR pattern
            ctx.fillStyle = 'white';
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(x + i * 15, y + j * 15, 15, 15);
                    }
                }
            }

            // Label
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(qr.label, x + qrSize / 2, y + qrSize + 25);

            // URL (truncated)
            ctx.font = '12px Arial';
            ctx.fillStyle = '#666';
            const truncatedUrl = qr.url.length > 30 ? qr.url.substring(0, 30) + '...' : qr.url;
            ctx.fillText(truncatedUrl, x + qrSize / 2, y + qrSize + 45);
        });
    };

    useEffect(() => {
        updatePreview();
    }, [qrCodes, currentLayout, brandColor, brandName, brandPhone, brandWebsite]);

    const downloadIndividualQRs = () => {
        if (qrCodes.length === 0) {
            alert('Please add some QR codes first');
            return;
        }

        qrCodes.forEach((qr, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 500;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 400, 500);

            // Brand header
            ctx.fillStyle = brandColor;
            ctx.fillRect(0, 0, 400, 80);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(brandName, 200, 35);
            ctx.font = '14px Arial';
            ctx.fillText(`${brandPhone} • ${brandWebsite}`, 200, 60);

            // QR Code
            const qrSize = 250;
            const qrX = (400 - qrSize) / 2;
            const qrY = 110;

            ctx.fillStyle = '#000';
            ctx.fillRect(qrX, qrY, qrSize, qrSize);

            // QR pattern
            ctx.fillStyle = 'white';
            for (let i = 0; i < 17; i++) {
                for (let j = 0; j < 17; j++) {
                    if (Math.random() > 0.5) {
                        ctx.fillRect(qrX + i * 15, qrY + j * 15, 15, 15);
                    }
                }
            }

            // Label
            ctx.fillStyle = brandColor;
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(qr.label, 200, qrY + qrSize + 40);

            // URL
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            const displayUrl = qr.url.length > 35 ? qr.url.substring(0, 35) + '...' : qr.url;
            ctx.fillText(displayUrl, 200, qrY + qrSize + 70);

            // Download
            const link = document.createElement('a');
            link.download = `qr-${qr.label.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const downloadPrintLayout = () => {
        const canvas = canvasRef.current;

        // Create high-resolution version
        const printCanvas = document.createElement('canvas');
        printCanvas.width = 2550; // 8.5" at 300 DPI
        printCanvas.height = 3300; // 11" at 300 DPI
        const printCtx = printCanvas.getContext('2d');

        // Scale the current canvas to print resolution
        printCtx.scale(3.1875, 3.3); // Scale factors for high-res
        printCtx.drawImage(canvas, 0, 0);

        // Download as PNG
        const link = document.createElement('a');
        link.download = `qr-print-layout-${currentLayout}-${Date.now()}.png`;
        link.href = printCanvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #4a5a6c 0%, #3a4a5c 100%)', color: 'white', padding: '20px' }}>
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 p-8 rounded-[20px] border-2 border-[#40e0d0]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-[15px] flex items-center justify-center text-3xl" style={{ background: '#40e0d0' }}>⬛</div>
                        QR Code & Print Pack Studio
                    </h1>
                    <p className="text-xl mb-5" style={{ color: '#a0b4c3' }}>Generate branded QR codes and create print-ready layouts for marketing materials.</p>
                    <div className="flex items-center justify-center gap-5 mb-5 flex-wrap">
                        <span>📱 QR Code Generator</span>
                        <span>🖨️ Print-Ready Layouts</span>
                        <span>📄 PDF & PNG Output</span>
                    </div>
                    <div className="mt-5">
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>bulk generation</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>print ready</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>branded</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>marketing</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls Panel */}
                    <div className="bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-[20px] p-6 h-fit">
                        <h2 className="text-2xl font-semibold mb-5 text-center border-b-2 border-[rgba(64,224,208,0.3)] pb-2" style={{ color: '#40e0d0' }}>QR Code Generator</h2>

                        <div className="mb-5">
                            <button
                                onClick={addQRCode}
                                className="w-full p-3 bg-[#27ae60] text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#229954] hover:-translate-y-0.5"
                            >
                                Add QR Code
                            </button>
                        </div>

                        <div className="bg-[rgba(44,62,80,0.5)] rounded-lg p-4 mb-5 max-h-[200px] overflow-y-auto">
                            {qrCodes.length === 0 ? (
                                <p className="text-[#a0b4c3] text-center py-5">No QR codes added yet</p>
                            ) : (
                                qrCodes.map((qr, index) => (
                                    <div key={index} className="bg-[rgba(64,224,208,0.1)] border border-[rgba(64,224,208,0.3)] rounded-lg p-3 mb-2 flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="text-[#40e0d0] font-semibold text-sm">{qr.label}</div>
                                            <div className="text-xs text-[#a0b4c3] break-all">{qr.url}</div>
                                        </div>
                                        <button
                                            onClick={() => removeQRCode(index)}
                                            className="bg-[#e74c3c] text-white border-none px-2 py-1 rounded text-xs cursor-pointer transition-all hover:bg-[#c0392b]"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <h3 className="text-[#40e0d0] my-6 text-xl">Branding Options</h3>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Agent/Company Name</label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Phone Number</label>
                            <input
                                type="text"
                                value={brandPhone}
                                onChange={(e) => setBrandPhone(e.target.value)}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Website</label>
                            <input
                                type="text"
                                value={brandWebsite}
                                onChange={(e) => setBrandWebsite(e.target.value)}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Brand Color</label>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {['#40e0d0', '#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12'].map(color => (
                                    <div
                                        key={color}
                                        className={`w-10 h-10 rounded-lg cursor-pointer border-3 transition-all ${brandColor === color ? 'border-[#40e0d0]' : 'border-transparent'
                                            }`}
                                        style={{ background: color }}
                                        onClick={() => changeBrandColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-[#40e0d0] my-6 text-xl">Print Layout</h3>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Layout Style</label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {[
                                    { key: 'grid', icon: '⚏', name: 'Grid' },
                                    { key: 'flyer', icon: '📄', name: 'Flyer' },
                                    { key: 'sticker', icon: '🏷️', name: 'Stickers' },
                                    { key: 'rider', icon: '📋', name: 'Rider' }
                                ].map(layout => (
                                    <div
                                        key={layout.key}
                                        className={`bg-[rgba(64,224,208,0.1)] border-2 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-[#40e0d0] hover:bg-[rgba(64,224,208,0.1)] hover:-translate-y-0.5 ${currentLayout === layout.key
                                                ? 'border-[#40e0d0] bg-[rgba(64,224,208,0.2)]'
                                                : 'border-[rgba(64,224,208,0.3)]'
                                            }`}
                                        onClick={() => changeLayout(layout.key)}
                                    >
                                        <div className="text-2xl mb-2">{layout.icon}</div>
                                        <div className="text-sm font-semibold text-[#a0b4c3]">{layout.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-[20px] p-6">
                        <h2 className="text-2xl font-semibold mb-5 text-center border-b-2 border-[rgba(64,224,208,0.3)] pb-2" style={{ color: '#40e0d0' }}>Preview & Download</h2>

                        <canvas
                            ref={canvasRef}
                            width="800"
                            height="1000"
                            className="w-full border-2 border-[#40e0d0] rounded-lg bg-white mb-5"
                        />

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <button
                                onClick={downloadIndividualQRs}
                                className="p-4 bg-[#40e0d0] text-[#2c3e50] border-none rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#36c5b6] hover:-translate-y-0.5"
                            >
                                Download Individual QRs
                            </button>
                            <button
                                onClick={downloadPrintLayout}
                                className="p-4 bg-[#e67e22] text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#d35400] hover:-translate-y-0.5"
                            >
                                Download Print Layout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


