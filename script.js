/**
 * Color Swatch Component
 * Displays a single color with hex code and name
 */
class ColorSwatch {
    constructor(color) {
        this.color = color;
        this.element = this.createElement();
    }

    createElement() {
        const swatchElement = document.createElement('div');
        swatchElement.className = 'color-swatch';

        // Calculate contrast for text color
        const textColor = this.getContrastColor(this.color.hex);

        swatchElement.innerHTML = `
            <div class="color-preview" style="background-color: ${this.color.hex}; color: ${textColor};">
                ${this.color.hex.toUpperCase()}
            </div>
            <div class="color-info">
                <div class="color-hex">${this.color.hex.toUpperCase()}</div>
                <div class="color-name">${this.color.name || 'Unnamed Color'}</div>
            </div>
        `;

        // Add click handler to copy hex code
        swatchElement.addEventListener('click', () => {
            this.copyToClipboard(this.color.hex);
        });

        return swatchElement;
    }

    getContrastColor(hexColor) {
        // Remove # if present
        const hex = hexColor.replace('#', '');

        // Convert to RGB
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return black for light colors, white for dark colors
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }

    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showCopyFeedback();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '-1000px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
                this.showCopyFeedback();
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }

            document.body.removeChild(textArea);
        }
    }

    showCopyFeedback() {
        const preview = this.element.querySelector('.color-preview');
        const originalText = preview.textContent;

        preview.textContent = 'Copied!';
        setTimeout(() => {
            preview.textContent = originalText;
        }, 1000);
    }

    render() {
        return this.element;
    }
}

/**
 * Main Layout Component
 * Manages the color palette container and renders color swatches
 */
class MainLayout {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.colors = [];
        this.swatches = [];
    }

    setColors(colors) {
        this.colors = colors;
        this.render();
    }

    addColor(color) {
        this.colors.push(color);
        this.render();
    }

    removeColor(index) {
        if (index >= 0 && index < this.colors.length) {
            this.colors.splice(index, 1);
            this.render();
        }
    }

    clear() {
        this.colors = [];
        this.render();
    }

    render() {
        // Clear existing content
        this.container.innerHTML = '';
        this.swatches = [];

        if (this.colors.length === 0) {
            this.renderEmptyState();
            return;
        }

        // Create and render color swatches
        this.colors.forEach((color, index) => {
            const swatch = new ColorSwatch(color);
            this.swatches.push(swatch);
            this.container.appendChild(swatch.render());
        });
    }

    renderEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <h2>No Colors Yet</h2>
            <p>Add some colors to see the palette</p>
        `;
        this.container.appendChild(emptyState);
    }

    getColors() {
        return [...this.colors];
    }

    getSwatchCount() {
        return this.colors.length;
    }
}

/**
 * Color Palette Application
 * Main application class that coordinates everything
 */
class ColorPaletteApp {
    constructor() {
        this.layout = new MainLayout('color-palette-container');
        this.init();
    }

    init() {
        // Initialize with sample colors for testing
        const sampleColors = [
            { hex: '#FF6B6B', name: 'Coral Red' },
            { hex: '#4ECDC4', name: 'Teal' },
            { hex: '#45B7D1', name: 'Sky Blue' },
            { hex: '#96CEB4', name: 'Mint Green' },
            { hex: '#FFEAA7', name: 'Warm Yellow' }
        ];

        this.layout.setColors(sampleColors);
    }

    // Public API for external use
    addColor(hex, name = null) {
        // Validate hex color
        if (!this.isValidHex(hex)) {
            throw new Error('Invalid hex color format');
        }

        const color = {
            hex: hex.startsWith('#') ? hex : `#${hex}`,
            name: name || this.generateColorName(hex)
        };

        this.layout.addColor(color);
        return color;
    }

    removeColor(index) {
        this.layout.removeColor(index);
    }

    setColors(colors) {
        // Validate colors array
        const validColors = colors.filter(color =>
            color.hex && this.isValidHex(color.hex)
        );

        this.layout.setColors(validColors);
    }

    getColors() {
        return this.layout.getColors();
    }

    clearPalette() {
        this.layout.clear();
    }

    isValidHex(hex) {
        const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
        return hexRegex.test(hex);
    }

    generateColorName(hex) {
        // Simple color name generation based on hex values
        const colorNames = [
            'Crimson', 'Coral', 'Orange', 'Gold', 'Yellow',
            'Lime', 'Green', 'Teal', 'Cyan', 'Blue',
            'Indigo', 'Purple', 'Magenta', 'Pink', 'Rose'
        ];

        // Use first two hex digits to determine name
        const firstByte = parseInt(hex.replace('#', '').substr(0, 2), 16);
        const index = Math.floor((firstByte / 255) * (colorNames.length - 1));

        return colorNames[index] || 'Unknown Color';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorPaletteApp = new ColorPaletteApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ColorSwatch, MainLayout, ColorPaletteApp };
}