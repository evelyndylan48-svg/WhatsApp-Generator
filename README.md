# WhatsApp Bulk Number Verifier

Bulk-generate and verify WhatsApp numbers for a US area code, then export results as vCard for iPhone import.

## Features

- User selects area code (3 digits) and number limit (200–5000)
- Backend verifies each number via WhatsApp Cloud API in batches
- Progress shown in UI
- Download results as vCard for iPhone

## Setup

1. **Clone repo and install dependencies**
    ```bash
    git clone https://github.com/yourusername/whatsapp-number-generator.git
    cd whatsapp-number-generator
    npm install
    ```

2. **Add WhatsApp Cloud API credentials**

   - Set these as Netlify environment variables:
     - `WHATSAPP_TOKEN`
     - `WHATSAPP_PHONE_ID`
   - Or directly in `whatsapp-verify.js` for testing.

3. **Run locally**
   ```bash
   npm start
   ```

4. **Deploy to Netlify**
   - Push repo to GitHub
   - Connect repo in Netlify dashboard
   - Set your environment variables
   - Netlify auto-builds & deploys

## Usage

- Enter a 3-digit US area code and a limit (200–5000)
- Click "Generate"
- Wait for results and download the `.vcf` file
- Open the file on your iPhone to import contacts

## Notes

- Verification speed is limited by WhatsApp API rate limiting
- For large batches, this will take several minutes
- Never expose credentials on the frontend!
