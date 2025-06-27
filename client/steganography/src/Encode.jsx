import React, { useState } from 'react';

const Encode = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('F5');
  const [encodedImage, setEncodedImage] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [filename, setFilename] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleImageChange = (image) => {
    setError(null);
    if (!image.name.match(/\.(bmp|png|jpg|jpeg)$/)) {
      setError('Wrong File Type! Choose a PNG, JPG, or BMP file only');
      setModal(true);
      return;
    }
    if (image.size > 200000000) {
      setError('File size over limit! Choose a file below 200MB');
      setModal(true);
      return;
    }
    setImage(image);
    setFilename(image.name);
    setUploaded(true);
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.trim() === '') {
      setError('Enter valid text!');
      setModal(true);
      return;
    }
    setText(inputText);
  };

  const onClose = () => {
    setModal(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please choose an image file to encode!');
      setModal(true);
      return;
    }
    if (text.trim() === '') {
      setError('Please enter text to encode!');
      setModal(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);
    formData.append('algorithm', algorithm);
    if (key.trim() !== '') {
      formData.append('key', key);
    }

    try {
      const response = await fetch('https://petanihandal-stegano-f5-dmcss-api.hf.space/encode-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);
      setEncodedImage(imageUrl);
    } catch (err) {
      setError('Failed to encode image.');
      setModal(true);
    }
    setLoading(false);
  };

  return (
    <div className="text-white p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🖼️ Mode Embed: Sembunyikan Pesan ke dalam Gambar</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <label className="block font-semibold">Upload Gambar Asli (Cover)</label>
            <div className="border-2 border-dashed bg-gray-800 p-4 rounded-md">
              <input accept=".png,.bmp,.jpg,.jpeg" onChange={(e) => handleImageChange(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
              <label htmlFor="dropzone-file" className="flex items-center justify-center h-32 cursor-pointer text-gray-400">
                Drag and drop file here / Click to browse
              </label>
              {filename && <p className="text-sm text-green-400 mt-2">File: {filename}</p>}
            </div>

            <div>
              <label className="block font-semibold">Pilih Algoritma Steganografi:</label>
              <select
                className="w-full bg-gray-900 p-2 rounded-md"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <option value="F5">F5</option>
                <option value="optimDMCSS">optimDMCSS</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="form-checkbox h-4 w-4 text-red-600" />
              <label className="text-sm">Gunakan Reed-Solomon untuk koreksi kesalahan?</label>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <label className="block font-semibold">Pesan Rahasia:</label>
            <textarea
              rows="4"
              value={text}
              onChange={handleTextChange}
              placeholder="Masukkan pesan rahasia..."
              className="w-full bg-gray-900 p-3 rounded-md"
            ></textarea>

            <label className="block font-semibold">Kunci Rahasia (16, 24, atau 32 karakter):</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-gray-900 p-3 rounded-md"
                placeholder="Masukkan kunci enkripsi"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white opacity-50"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button type="submit" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold">
            Sembunyikan Pesan
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center mt-6">
          <svg className="animate-spin h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {encodedImage && (
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">🎉 Gambar Berhasil Disisipkan</h3>
          <img className="mx-auto w-64 h-64 object-cover border rounded-lg" src={encodedImage} alt="Encoded" />
          <a className="inline-block mt-6 px-6 py-3 bg-blue-700 hover:bg-blue-500 text-white rounded-xl font-semibold" href={encodedImage} download="encoded_image.png">
            Download Gambar
          </a>
        </div>
      )}

      {modal && error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Error</h2>
            <p className="mb-4">{error}</p>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encode;