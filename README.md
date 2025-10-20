# Sarvam Chat Widget

Notion Document : 
  ##A. [Brief](https://tinyurl.com/bde8hf3x)
  ##B. [Detailed](https://tinyurl.com/2szsjfpu)

A production-ready, embeddable chat widget with voice capabilities built with React, TypeScript, and Vite. Features Shadow DOM encapsulation, multi-language support, and voice input/output.

## 🚀 Features

- **Shadow DOM Encapsulation**: Complete style isolation from host page
- **Voice Input**: Browser-native Speech Recognition API
- **Voice Output**: Text-to-speech for assistant responses
- **Multi-language Support**: Easy language switching with 8+ Indian languages
- **Fully Customizable**: Colors, position, icons, labels
- **Responsive Design**: Works on desktop and mobile
- **Single Bundle**: Entire widget in one `widget.js` file
- **Zero Dependencies**: Uses only browser-native APIs for voice features

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open `http://localhost:5173/public/test-page.html` to see the widget in action.

## 🏗️ Build

```bash
npm run build
```

This creates a single `dist/widget.js` file containing all JavaScript and CSS.

## 📝 Usage

### 1. Add Configuration Script

```html
<script>
  window.AgentWidgetConfig = {
    apiEndpoint: '/api/chat',
    primaryColor: '#6366f1',
    position: 'bottom-right',
    bubbleIcon: '💬',
    defaultLanguage: 'en-US',
    supportedLanguages: [
      { code: 'en-US', name: 'English' },
      { code: 'hi-IN', name: 'हिंदी' },
      // ... more languages
    ],
    welcomeMessage: 'Hello! How can I help you today?',
    placeholder: 'Type your message...',
    headerTitle: 'Chat Assistant',
    enableVoice: true,
    enableLanguageSwitcher: true,
    context: 'You are a helpful assistant.',
  };
</script>
```

### 2. Load the Widget

```html
<script src="https://your-cdn.com/widget.js"></script>
```

That's it! The widget will automatically initialize and appear on your page.

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiEndpoint` | string | `/api/chat` | Backend API endpoint |
| `primaryColor` | string | `#6366f1` | Primary theme color |
| `position` | string | `bottom-right` | Widget position |
| `bubbleIcon` | string | `💬` | Chat bubble icon |
| `defaultLanguage` | string | `en-US` | Default language code |
| `supportedLanguages` | array | See config | Available languages |
| `welcomeMessage` | string | - | Initial greeting |
| `placeholder` | string | - | Input placeholder |
| `headerTitle` | string | - | Chat header title |
| `enableVoice` | boolean | `true` | Enable voice features |
| `enableLanguageSwitcher` | boolean | `true` | Show language selector |
| `context` | string | - | Agent context/instructions |

## 🔌 Backend API

The widget sends POST requests to your configured `apiEndpoint` with the following structure:

### Request

```json
{
  "message": "User message",
  "context": "Agent context from config",
  "lang": "en-US"
}
```

### Response

```json
{
  "response": "Assistant response message"
}
```

### Example Backend (Node.js/Express)

```javascript
app.post('/api/chat', async (req, res) => {
  const { message, context, lang } = req.body;
  
  // Call your AI service (e.g., Sarvam API)
  const response = await yourAIService.chat({
    message,
    context,
    language: lang
  });
  
  res.json({ response: response.text });
});
```

## 🗂️ Project Structure

```
/src
  /components
    Widget.tsx              # Main widget container
    ChatWindow.tsx          # Chat interface
    MessageList.tsx         # Message display
    ChatInput.tsx           # Input with voice button
    *.module.css            # Component styles
  /hooks
    useChat.ts              # Chat logic
    useSpeechRecognition.ts # Voice input
    useSpeechSynthesis.ts   # Voice output
  /context
    ConfigContext.tsx       # Configuration provider
  /types
    config.ts               # Config types
    index.ts                # Shared types
  App.tsx                   # Root component
  main.tsx                  # Shadow DOM entry
  index.css                 # Global styles
/public
  test-page.html            # Test/demo page
```

## 🎨 Customization

### Custom Styling

The widget uses CSS Modules for complete encapsulation. To customize:

1. Modify the CSS module files in `/src/components/`
2. Use `config.primaryColor` for theme color
3. Rebuild the widget

### Custom Voice Settings

Modify voice settings in the hooks:

```typescript
// In useSpeechSynthesis.ts
utterance.rate = 1.0;  // Speech rate
utterance.pitch = 1.0;  // Voice pitch
utterance.volume = 1.0; // Volume
```

## 🌍 Language Support

Default supported languages:
- English (en-US)
- Hindi (hi-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Bengali (bn-IN)
- Marathi (mr-IN)
- Gujarati (gu-IN)
- Kannada (kn-IN)

Add more languages via `supportedLanguages` config option.

## 🔒 Shadow DOM

The widget uses Shadow DOM for complete isolation:
- No CSS conflicts with host page
- Encapsulated JavaScript scope
- Secure and predictable behavior

## 📱 Browser Support

- Chrome/Edge: Full support
- Safari: Full support
- Firefox: Full support
- Speech Recognition: Chrome, Edge, Safari (limited)
- Speech Synthesis: All modern browsers

## 🐛 Troubleshooting

### Widget not appearing
- Check console for errors
- Verify `widget.js` is loaded
- Ensure `window.AgentWidgetConfig` is set before loading widget

### Voice not working
- Check browser support for Speech Recognition
- Ensure HTTPS (required for microphone access)
- Check microphone permissions

### API errors
- Verify backend endpoint is correct
- Check CORS configuration
- Ensure API returns correct JSON format

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ using React, TypeScript, and Vite
