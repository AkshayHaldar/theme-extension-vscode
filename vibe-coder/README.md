# Vibe Coder - Synesthetic Code Editor

A React-based code editor that dynamically changes its theme based on the time of day and the programming language you're working with. Experience a synesthetic coding environment that adapts to your workflow!

## Features

- **Dynamic Theme Switching**
  - Time-based themes:
    - Morning Calm (6:00 AM - 12:00 PM): Light blue theme for a fresh start
    - Afternoon Focus (12:00 PM - 6:00 PM): Warm orange theme for productivity
    - Night Owl (6:00 PM - 6:00 AM): Deep blue theme for late-night coding
  - Language-based themes:
    - Python Zen: Green theme optimized for Python development
    - WebDev Flow: Cyan theme for web development (JavaScript, TypeScript, HTML, CSS)

- **Monaco Editor Integration**
  - Full-featured code editor with syntax highlighting
  - Support for multiple programming languages
  - Real-time code editing and preview

- **Status Bar**
  - Shows current theme and trigger type
  - Updates in real-time as themes change

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vibe-coder.git
   cd vibe-coder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open in your default browser at `http://localhost:3000`.

## Usage

### Code Editor

1. **Language Selection**
   - Use the dropdown menu at the top of the editor to select your programming language
   - Supported languages:
     - JavaScript
     - TypeScript
     - Python
     - HTML
     - CSS

2. **Theme Changes**
   - The theme will automatically change based on:
     - Time of day (every minute)
     - Selected programming language
   - The current theme and trigger are displayed in the status bar

3. **Code Editing**
   - Write and edit code in the Monaco editor
   - Syntax highlighting adapts to the selected language
   - Real-time code validation and formatting

### Theme System

The application uses a context-based theme system that manages:
- Time-based theme switching
- Language-based theme switching
- Theme state persistence
- Real-time theme updates

## Development

### Project Structure

```
vibe-coder/
├── src/
│   ├── components/
│   │   ├── CodeEditor.tsx    # Main editor component
│   │   └── StatusBar.tsx     # Status bar component
│   ├── contexts/
│   │   └── ThemeContext.tsx  # Theme management
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── public/
└── package.json
```

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Customization

### Adding New Themes

1. Open `src/contexts/ThemeContext.tsx`
2. Add a new theme to the `themes` object:
   ```typescript
   'new-theme': {
     name: 'New Theme',
     colors: {
       background: '#COLOR',
       foreground: '#COLOR',
       primary: '#COLOR',
       secondary: '#COLOR'
     }
   }
   ```

### Adding Language Support

1. Update the language selector in `CodeEditor.tsx`
2. Add language-specific theme in `ThemeContext.tsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Material-UI](https://mui.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
