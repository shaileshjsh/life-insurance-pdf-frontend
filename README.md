# Life Insurance PDF Field Extraction UI

This is a React-based frontend for uploading a life insurance product illustration PDF, extracting key fields using the backend API, and editing the results.

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Select a PDF file and click "Extract Fields".
- Edit the extracted fields as needed.

## Notes
- The frontend expects the backend API to be running and accessible at `/extract-fields`.
- Make sure CORS is configured if accessing the backend from a different origin.
