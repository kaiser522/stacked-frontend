import React, { useState, useRef, useEffect } from "react";

export default function BrandWatermarkStudio() {
    const [currentImage, setCurrentImage] = useState(null);
    const [brandSettings, setBrandSettings] = useState({
        text: 'Your Brand',
        contact: 'yourwebsite.com',
        position: 'bottom-right',
        opacity: 0.8,
        size: 3,
        color: '#40e0d0',
        borderStyle: 'none'
    });
    const [presets, setPresets] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState(['ig-post', 'ig-story', 'fb-post']);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const platformSizes = {
        'ig-post': { width: 1080, height: 1080, name: 'Instagram Post' },
        'ig-story': { width: 1080, height: 1920, name: 'Instagram Story' },
        'fb-post': { width: 1200, height: 630, name: 'Facebook Post' },
        'linkedin': { width: 1200, height: 627, name: 'LinkedIn Post' },
        'twitter': { width: 1200, height: 675, name: 'Twitter Post' },
        'pinterest': { width: 1000, height: 1500, name: 'Pinterest Pin' }
    };

    useEffect(() => {
        const savedPresets = JSON.parse(localStorage.getItem('brandPresets') || '[]');
        setPresets(savedPresets);
    }, []);

    // Update preview when currentImage or brandSettings change
    useEffect(() => {
        if (currentImage) {
            updatePreview();
        }
    }, [currentImage, brandSettings]);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            loadImage(file);
        }
    };

    const loadImage = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setCurrentImage(img);
                // Use setTimeout to ensure the canvas ref is ready
                setTimeout(() => {
                    updatePreview(img);
                }, 100);
            };
            img.onerror = () => {
                alert('Error loading image. Please try a different image.');
            };
            img.src = e.target.result;
        };
        reader.onerror = () => {
            alert('Error reading file. Please try again.');
        };
        reader.readAsDataURL(file);
    };

    const updatePreview = (img = currentImage) => {
        if (!img) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const maxSize = 400;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);

        // Set canvas dimensions
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply border if needed
        if (brandSettings.borderStyle !== 'none') {
            applyBorder(ctx, canvas.width, canvas.height);
        }

        // Add watermark
        addWatermark(ctx, canvas.width, canvas.height);
    };

    const applyBorder = (ctx, width, height) => {
        ctx.strokeStyle = brandSettings.color;
        ctx.lineWidth = brandSettings.size * 2;

        if (brandSettings.borderStyle === 'solid') {
            ctx.strokeRect(0, 0, width, height);
        } else if (brandSettings.borderStyle === 'rounded') {
            ctx.beginPath();
            ctx.roundRect(5, 5, width - 10, height - 10, 15);
            ctx.stroke();
        } else if (brandSettings.borderStyle === 'frame') {
            ctx.fillStyle = brandSettings.color;
            ctx.fillRect(0, 0, width, 10);
            ctx.fillRect(0, height - 10, width, 10);
            ctx.fillRect(0, 0, 10, height);
            ctx.fillRect(width - 10, 0, 10, height);
        }
    };

    const addWatermark = (ctx, width, height) => {
        const fontSize = Math.max(12, brandSettings.size * 4);
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = brandSettings.color;
        ctx.globalAlpha = brandSettings.opacity;

        const text = brandSettings.text;
        const contact = brandSettings.contact;
        const textWidth = ctx.measureText(text).width;
        const contactWidth = ctx.measureText(contact).width;
        const maxWidth = Math.max(textWidth, contactWidth);

        let x, y;

        switch (brandSettings.position) {
            case 'bottom-right':
                x = width - maxWidth - 20;
                y = height - 30;
                break;
            case 'bottom-left':
                x = 20;
                y = height - 30;
                break;
            case 'top-right':
                x = width - maxWidth - 20;
                y = 30;
                break;
            case 'top-left':
                x = 20;
                y = 30;
                break;
            case 'center':
                x = (width - maxWidth) / 2;
                y = height / 2;
                break;
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x - 10, y - fontSize - 5, maxWidth + 20, fontSize * 2 + 15);

        ctx.fillStyle = brandSettings.color;
        ctx.fillText(text, x, y);
        ctx.fillText(contact, x, y + fontSize + 5);

        ctx.globalAlpha = 1;
    };

    const updateWatermark = () => {
        if (currentImage) {
            // Use setTimeout to ensure state updates are applied
            setTimeout(() => {
                updatePreview();
            }, 50);
        }
    };

    const updateOpacity = (value) => {
        setBrandSettings(prev => ({ ...prev, opacity: value / 100 }));
        updateWatermark();
    };

    const updateSize = (value) => {
        setBrandSettings(prev => ({ ...prev, size: parseInt(value) }));
        updateWatermark();
    };

    const changeWatermarkColor = (color) => {
        setBrandSettings(prev => ({ ...prev, color }));
        updateWatermark();
    };

    const togglePlatform = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    const exportAssets = () => {
        if (!currentImage) {
            alert('Please upload an image first');
            return;
        }

        if (selectedPlatforms.length === 0) {
            alert('Please select at least one platform');
            return;
        }

        selectedPlatforms.forEach(platform => {
            const size = platformSizes[platform];
            const canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, size.width, size.height);

            const scale = Math.min(size.width / currentImage.width, size.height / currentImage.height);
            const scaledWidth = currentImage.width * scale;
            const scaledHeight = currentImage.height * scale;
            const offsetX = (size.width - scaledWidth) / 2;
            const offsetY = (size.height - scaledHeight) / 2;

            ctx.drawImage(currentImage, offsetX, offsetY, scaledWidth, scaledHeight);

            if (brandSettings.borderStyle !== 'none') {
                applyBorder(ctx, size.width, size.height);
            }

            addWatermark(ctx, size.width, size.height);

            const link = document.createElement('a');
            const timestamp = Date.now();
            link.download = `branded-image-${platform}-${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });

        setTimeout(() => {
            alert(`Successfully exported ${selectedPlatforms.length} branded assets!`);
        }, 500);
    };

    const postToPlatform = (platform) => {
        if (!currentImage) {
            alert('Please upload an image first');
            return;
        }

        const size = platformSizes[platform];
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size.width, size.height);

        const scale = Math.min(size.width / currentImage.width, size.height / currentImage.height);
        const scaledWidth = currentImage.width * scale;
        const scaledHeight = currentImage.height * scale;
        const offsetX = (size.width - scaledWidth) / 2;
        const offsetY = (size.height - scaledHeight) / 2;

        ctx.drawImage(currentImage, offsetX, offsetY, scaledWidth, scaledHeight);

        if (brandSettings.borderStyle !== 'none') {
            applyBorder(ctx, size.width, size.height);
        }

        addWatermark(ctx, size.width, size.height);

        // Convert canvas to blob for posting
        canvas.toBlob((blob) => {
            const imageUrl = URL.createObjectURL(blob);

            // Create platform-specific posting URLs
            const platformUrls = {
                'ig-post': `https://www.instagram.com/`,
                'ig-story': `https://www.instagram.com/`,
                'fb-post': `https://www.facebook.com/`,
                'linkedin': `https://www.linkedin.com/feed/`,
                'twitter': `https://twitter.com/compose/tweet`,
                'pinterest': `https://www.pinterest.com/pin-builder/`
            };

            // Open platform in new tab
            const platformUrl = platformUrls[platform];
            if (platformUrl) {
                window.open(platformUrl, '_blank');

                // Show instructions for manual upload
                setTimeout(() => {
                    alert(`Image ready for ${platformSizes[platform].name}!\n\nInstructions:\n1. The ${platformSizes[platform].name} page should be open in a new tab\n2. Download the generated image from your browser\n3. Upload it to your ${platformSizes[platform].name} post\n\nYour branded image is automatically sized for ${platformSizes[platform].name} (${size.width}×${size.height})`);
                }, 1000);
            }
        }, 'image/png');
    };

    const exportSingle = () => {
        if (!currentImage) {
            alert('Please upload an image first');
            return;
        }

        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = `branded-image-preview-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    const savePreset = () => {
        const name = prompt('Enter a name for this preset:');
        if (!name) return;

        const preset = { name, settings: { ...brandSettings } };
        const newPresets = [...presets, preset];
        setPresets(newPresets);
        localStorage.setItem('brandPresets', JSON.stringify(newPresets));
    };

    const loadPreset = (presetName) => {
        if (presetName === 'default') {
            setBrandSettings({
                text: 'Your Real Estate Brand',
                contact: 'yourwebsite.com',
                position: 'bottom-right',
                opacity: 0.8,
                size: 3,
                color: '#40e0d0',
                borderStyle: 'none'
            });
        } else {
            const preset = presets.find(p => p.name === presetName);
            if (preset) {
                setBrandSettings(preset.settings);
            }
        }
        updateWatermark();
    };

    const deletePreset = (presetName) => {
        if (presetName === 'default') return;

        if (confirm(`Delete preset "${presetName}"?`)) {
            const newPresets = presets.filter(p => p.name !== presetName);
            setPresets(newPresets);
            localStorage.setItem('brandPresets', JSON.stringify(newPresets));
        }
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #4a5a6c 0%, #3a4a5c 100%)', color: 'white', padding: '20px' }}>
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10 p-8 rounded-[20px] border-2 border-[#40e0d0]" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-[15px] flex items-center justify-center text-3xl" style={{ background: '#40e0d0' }}>🎨</div>
                        Brand Watermark & Social Asset Pack
                    </h1>
                    <p className="text-xl mb-5" style={{ color: '#a0b4c3' }}>Upload images and automatically generate branded social media assets for all platforms.</p>
                    <div className="flex items-center justify-center gap-5 mb-5 flex-wrap">
                        <span>📱 Instagram Ready</span>
                        <span>📘 Facebook Optimized</span>
                        <span>💼 LinkedIn Professional</span>
                        <span>🎯 Platform Specific</span>
                    </div>
                    <div className="mt-5">
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>drag & drop</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>auto watermark</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>multi-platform</span>
                        <span className="inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40e0d0', border: '1px solid rgba(64, 224, 208, 0.3)' }}>batch export</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls Panel */}
                    <div className="bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-[20px] p-6 h-fit">
                        <h2 className="text-2xl font-semibold mb-5 text-center border-b-2 border-[rgba(64,224,208,0.3)] pb-2" style={{ color: '#40e0d0' }}>Brand Settings</h2>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Brand Name/Text</label>
                            <input
                                type="text"
                                value={brandSettings.text}
                                onChange={(e) => setBrandSettings(prev => ({ ...prev, text: e.target.value }))}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Website/Contact</label>
                            <input
                                type="text"
                                value={brandSettings.contact}
                                onChange={(e) => setBrandSettings(prev => ({ ...prev, contact: e.target.value }))}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Watermark Position</label>
                            <select
                                value={brandSettings.position}
                                onChange={(e) => setBrandSettings(prev => ({ ...prev, position: e.target.value }))}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            >
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="top-right">Top Right</option>
                                <option value="top-left">Top Left</option>
                                <option value="center">Center</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">
                                Watermark Opacity
                                <span className="inline-block bg-[rgba(64,224,208,0.2)] text-[#40e0d0] px-2 py-1 rounded text-sm ml-2">
                                    {Math.round(brandSettings.opacity * 100)}%
                                </span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                value={brandSettings.opacity * 100}
                                onChange={(e) => updateOpacity(e.target.value)}
                                className="w-full h-1.5 rounded bg-[#5a6a7c] appearance-none slider"
                                style={{ background: '#5a6a7c' }}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">
                                Watermark Size
                                <span className="inline-block bg-[rgba(64,224,208,0.2)] text-[#40e0d0] px-2 py-1 rounded text-sm ml-2">
                                    {['XS', 'Small', 'Medium', 'Large', 'XL'][brandSettings.size - 1]}
                                </span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={brandSettings.size}
                                onChange={(e) => updateSize(e.target.value)}
                                className="w-full h-1.5 rounded bg-[#5a6a7c] appearance-none slider"
                                style={{ background: '#5a6a7c' }}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Watermark Color</label>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {['#40e0d0', '#ffffff', '#000000', '#e74c3c', '#3498db', '#2ecc71'].map(color => (
                                    <div
                                        key={color}
                                        className={`w-10 h-10 rounded-lg cursor-pointer border-3 transition-all ${brandSettings.color === color ? 'border-[#40e0d0]' : 'border-transparent'
                                            }`}
                                        style={{ background: color }}
                                        onClick={() => changeWatermarkColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-[#a0b4c3] font-medium">Border Style</label>
                            <select
                                value={brandSettings.borderStyle}
                                onChange={(e) => setBrandSettings(prev => ({ ...prev, borderStyle: e.target.value }))}
                                className="w-full p-3 border-2 border-[#5a6a7c] rounded-lg bg-[#2c3e50] text-white focus:border-[#40e0d0] focus:outline-none"
                            >
                                <option value="none">No Border</option>
                                <option value="solid">Solid Border</option>
                                <option value="rounded">Rounded Border</option>
                                <option value="frame">Picture Frame</option>
                            </select>
                        </div>

                        <h3 className="text-[#40e0d0] my-6 text-xl">Presets</h3>

                        <button
                            onClick={savePreset}
                            className="w-full p-4 bg-transparent text-[#40e0d0] border-2 border-[#40e0d0] rounded-lg font-semibold hover:bg-[#40e0d0] hover:text-[#2c3e50] transition-all mb-4"
                        >
                            Save Current Settings
                        </button>

                        <div>
                            <div className="bg-[rgba(64,224,208,0.1)] border border-[rgba(64,224,208,0.3)] rounded-lg p-3 mb-2 flex justify-between items-center">
                                <div className="text-[#40e0d0] font-semibold">Real Estate Default</div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => loadPreset('default')}
                                        className="bg-[#40e0d0] text-[#2c3e50] px-2 py-1 rounded text-sm hover:bg-[#36c5b6] transition-all"
                                    >
                                        Load
                                    </button>
                                </div>
                            </div>

                            {presets.map((preset, index) => (
                                <div key={index} className="bg-[rgba(64,224,208,0.1)] border border-[rgba(64,224,208,0.3)] rounded-lg p-3 mb-2 flex justify-between items-center">
                                    <div className="text-[#40e0d0] font-semibold">{preset.name}</div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => loadPreset(preset.name)}
                                            className="bg-[#40e0d0] text-[#2c3e50] px-2 py-1 rounded text-sm hover:bg-[#36c5b6] transition-all"
                                        >
                                            Load
                                        </button>
                                        <button
                                            onClick={() => deletePreset(preset.name)}
                                            className="bg-[#40e0d0] text-[#2c3e50] px-2 py-1 rounded text-sm hover:bg-[#36c5b6] transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-[20px] p-6 min-h-[600px]">
                        <h2 className="text-2xl font-semibold mb-5 text-center border-b-2 border-[rgba(64,224,208,0.3)] pb-2" style={{ color: '#40e0d0' }}>Image Preview</h2>

                        <div
                            className="border-3 border-dashed border-[#40e0d0] rounded-[15px] p-10 text-center mb-5 cursor-pointer transition-all hover:border-[#36c5b6] hover:bg-[rgba(64,224,208,0.1)]"
                            style={{ background: 'rgba(64, 224, 208, 0.05)' }}
                            onClick={triggerFileInput}
                        >
                            <div className="text-5xl text-[#40e0d0] mb-4">📷</div>
                            <div className="text-lg text-[#a0b4c3] mb-2">Drop your image here or click to browse</div>
                            <div className="text-sm text-[#748899]">Supports JPG, PNG, WebP • Max 10MB</div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <div className="bg-[#2c3e50] rounded-[15px] p-5 flex justify-center items-center min-h-[400px] relative">
                            {currentImage ? (
                                <div className="flex justify-center items-center">
                                    <canvas
                                        ref={canvasRef}
                                        className="max-w-full max-h-[400px] rounded-lg shadow-2xl"
                                        style={{
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="text-[#748899] text-center text-lg">Upload an image to see the branded preview</div>
                            )}
                        </div>
                    </div>

                    {/* Export Panel */}
                    <div className="bg-[rgba(58,74,92,0.8)] border-2 border-[#40e0d0] rounded-[20px] p-6 h-fit">
                        <h2 className="text-2xl font-semibold mb-5 text-center border-b-2 border-[rgba(64,224,208,0.3)] pb-2" style={{ color: '#40e0d0' }}>Export Options</h2>

                        {/* <h3 className="text-[#40e0d0] mb-4 text-lg font-semibold">🚀 Export & Post to Platforms</h3>
                        <p className="text-[#a0b4c3] text-sm mb-4">Choose your platforms and either download or post directly to social media!</p>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            {Object.entries(platformSizes).map(([key, platform]) => (
                                <div
                                    key={key}
                                    className={`bg-[rgba(44,62,80,0.5)] border-2 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-[#40e0d0] hover:bg-[rgba(64,224,208,0.1)] hover:-translate-y-0.5 ${selectedPlatforms.includes(key)
                                        ? 'border-[#40e0d0] bg-[rgba(64,224,208,0.2)]'
                                        : 'border-[rgba(64,224,208,0.3)]'
                                        }`}
                                    onClick={() => togglePlatform(key)}
                                >
                                    <div className="text-2xl mb-2">{key === 'ig-post' ? '📱' : key === 'ig-story' ? '📲' : key === 'fb-post' ? '📘' : key === 'linkedin' ? '💼' : key === 'twitter' ? '🐦' : '📌'}</div>
                                    <div className="text-sm font-semibold text-[#a0b4c3] mb-1">{platform.name}</div>
                                    <div className="text-xs text-[#748899]">{platform.width}×{platform.height}</div>
                                </div>
                            ))}
                        </div> */}

                        <div className="grid grid-cols-1 gap-3 mb-4">
                            {/* <button
                                onClick={exportAssets}
                                disabled={!currentImage || selectedPlatforms.length === 0}
                                className="w-full p-4 bg-[#40e0d0] text-[#2c3e50] border-none rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#36c5b6] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                📥 Download Selected Platforms
                            </button> */}

                            <button
                                onClick={exportSingle}
                                disabled={!currentImage}
                                className="w-full p-4 bg-transparent text-[#40e0d0] border-2 border-[#40e0d0] rounded-lg text-lg font-semibold cursor-pointer transition-all hover:bg-[#40e0d0] hover:text-[#2c3e50] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                📤 Export Current Size Only
                            </button>
                        </div>

                        <div className="border-t border-[rgba(64,224,208,0.3)] pt-4">
                            <h4 className="text-[#40e0d0] mb-3 font-semibold">Post Individual Platforms</h4>
                            <p className="text-[#a0b4c3] text-xs mb-3">Click any platform to open it directly with your branded image ready to post!</p>

                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(platformSizes).map(([key, platform]) => (
                                    <button
                                        key={key}
                                        onClick={() => postToPlatform(key)}
                                        disabled={!currentImage}
                                        className="w-full p-2 bg-[rgba(64,224,208,0.1)] text-[#40e0d0] border border-[rgba(64,224,208,0.3)] rounded-lg font-medium cursor-pointer transition-all hover:bg-[rgba(64,224,208,0.2)] hover:border-[#40e0d0] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                {key === 'ig-post' ? '📱' : key === 'ig-story' ? '📲' : key === 'fb-post' ? '📘' : key === 'linkedin' ? '💼' : key === 'twitter' ? '🐦' : '📌'}
                                            </span>
                                            <span>Post to {platform.name}</span>
                                        </div>
                                        <span className="text-xs text-[#748899]">{platform.width}×{platform.height}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-3 p-2 bg-[rgba(64,224,208,0.1)] border border-[rgba(64,224,208,0.3)] rounded-lg">
                                <p className="text-[#a0b4c3] text-xs">
                                    💡 <strong>Pro Tip:</strong> Your image will be automatically sized and branded for each platform. Just upload it when the platform opens!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


