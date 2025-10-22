# Bytecore Quiz Application

## Security Configuration

This application uses Telegram bot integration for quiz results. For security reasons, sensitive credentials are not hardcoded.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### Important Security Notes

1. **Never commit the `.env` file to version control**
2. The `.gitignore` file is configured to exclude sensitive files
3. For production deployment, set environment variables on your hosting platform
4. The `config.js` file uses base64 encoding as a fallback (less secure but obfuscated)

### Files to Keep Secure

- `.env` - Contains actual credentials
- `config.js` - Contains fallback encoded credentials

### Deployment Instructions

1. Clone the repository
2. Create your `.env` file with your actual credentials
3. Deploy to your hosting platform
4. Set environment variables on your hosting platform for production

### Local Development

1. Create `.env` file with your credentials
2. Open `index.html` in a web browser
3. Navigate to Quiz section to test functionality

## File Structure

- `index.html` - Main landing page
- `quiz.html` - Quiz application
- `config.js` - Configuration management
- `.env` - Environment variables (not in git)
- `.gitignore` - Git ignore rules