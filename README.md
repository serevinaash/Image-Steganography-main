
# Image Steganography Project

This project demonstrates image steganography using the **f5** manipulation technique. The project is divided into two parts:

- **Frontend**: A React-based client interface built with the Tailwind CSS framework.

## Features

- Encode hidden messages within images using LSB steganography.
- Decode hidden messages from the encoded images.
- Simple and clean interface to interact with the steganography features.


### Frontend:
- **React**: JavaScript framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vercel**: Deployed the frontend alongside the backend.

## How It Works

1. **Encoding**: The user uploads an image and enters a message. The LSB technique embeds the message into the least significant bits of the image pixels, producing a steganographic image.
2. **Decoding**: The user uploads the encoded image, and the application retrieves the hidden message from the image using the reverse LSB technique.

## Setup Instructions

### Backend

1. Clone the repository.
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn pillow python-multipart
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment


## Future Enhancements

- Add support for different steganography techniques.
- Improve UI/UX for better user interaction.
