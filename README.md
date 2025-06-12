# The Browser is a Marvelous Thing! 🌐

An interactive presentation showcasing modern browser capabilities and hidden web features.

## 🎯 Overview

This presentation demonstrates the incredible evolution of web browsers in 2024, featuring:

- Modern CSS capabilities (Container Queries, :has() selector, CSS Nesting)
- Underutilized HTML elements (Dialog, Details/Summary, Datalist)
- Powerful Web APIs (File System Access, View Transitions, Intersection Observer)
- Advanced development tools and techniques

## 🏗️ Architecture: Manifest-Based Slide System

This presentation uses a **manifest-based architecture** that provides flexible slide management without the limitations of traditional numeric indexing.

### ✨ Key Benefits

- **Easy Insertion**: Add slides anywhere without renumbering
- **Simple Removal**: Remove slides without affecting others
- **Semantic Organization**: Descriptive file names and metadata
- **Dynamic Management**: Enable/disable slides without deletion
- **Section Support**: Organize slides into logical groups
- **Maintainable**: Clear separation of content and structure

### 📁 File Structure

```text
├── index.html              # Main presentation file
├── slides/
│   ├── manifest.json       # Slide configuration and metadata
│   ├── title.html          # Individual slide files
│   ├── presenter.html      # (semantic names)
│   ├── hook.html
│   └── ...
├── demo-functions.js       # Interactive demo functions
├── test-manifest.html      # System testing interface
└── slide-manager.html      # Management demo interface
```

### 🎮 Getting Started

1. **Run the presentation**: Open `index.html` in a browser or use a live server
2. **Navigate**: Use arrow keys, space bar, or navigation buttons
3. **Test the system**: Visit `test-manifest.html` to verify the manifest system
4. **Explore management**: Check out `slide-manager.html` for slide management demos

### 📋 Manifest Structure

The `slides/manifest.json` file controls the entire presentation:

```json
{
  "presentation": {
    "title": "The Browser is a Marvelous Thing!",
    "author": "Andreas Wänqvist",
    "github": "mobilemancer",
    "version": "1.0.0"
  },
  "slides": [
    {
      "id": "title",
      "title": "The Browser is a Marvelous Thing",
      "file": "title.html",
      "enabled": true,
      "section": "introduction",
      "description": "Title slide with presentation overview"
    }
  ],
  "sections": [
    {
      "id": "introduction",
      "title": "Introduction",
      "color": "#4facfe"
    }
  ]
}
```

## 🔧 Slide Management

### Adding a New Slide

1. Create your slide HTML file in the `slides/` directory
2. Add an entry to the `slides` array in `manifest.json`:

```json
{
  "id": "my-new-slide",
  "title": "My Amazing New Slide",
  "file": "my-new-slide.html",
  "enabled": true,
  "section": "introduction",
  "description": "Description of the slide content"
}
```

3. The slide will automatically appear in the presentation!

### Removing a Slide

- **Temporary**: Set `"enabled": false` in the manifest
- **Permanent**: Remove the entry from the manifest and delete the HTML file

### Reordering Slides

Simply rearrange the slide objects in the `slides` array in `manifest.json`. No file renaming required!

### Managing Sections

Organize slides into logical groups by setting the `section` property and defining sections in the manifest.

## 🎯 Key Features

### Interactive Demos

- **Container Queries**: Responsive components that adapt to their container
- **CSS :has()**: Parent selector for advanced styling
- **Dialog Element**: Native modals with built-in accessibility
- **File System Access**: Read and write files like a desktop app
- **View Transitions**: Smooth page transitions with minimal code

### Navigation

- **Keyboard**: Arrow keys, spacebar for navigation
- **Mouse**: Click navigation buttons
- **Fullscreen**: F11 or double-click for fullscreen mode
- **Performance**: Automatic slide preloading for smooth transitions

## 🚀 Technical Implementation

### Caching System

Slides are cached after first load for optimal performance during navigation.

### Error Handling

Comprehensive error handling with user-friendly error messages for missing slides or network issues.

## 🎨 Customization

### Themes

Modify CSS variables in `styles.css` to customize the presentation theme.

### Sections

Add visual indicators and navigation by section using the sections configuration.

---

**Built with ❤️ & 🤖 for the web development community**
