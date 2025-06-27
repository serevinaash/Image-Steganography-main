import React, { useState } from 'react';

const Encode = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('F5');
  const [useReedSolomon, setUseReedSolomon] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [encodedImage, setEncodedImage] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [filename, setFilename] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEncode, setShowEncode] = useState(true);

  const handleImageChange = (image) => {
    setError(null);
    if (!image.name.match(/\.(bmp|png|gif|jpg|jpeg)$/)) {
      setError("Format tidak didukung! Gunakan PNG, BMP, atau JPG.");
      setModal(true);
      setLoading(false);
      return;
    }
    if (image.size > 200000000) {
      setError("Ukuran file terlalu besar! Maksimal 200MB.");
      setLoading(false);
      setModal(true);
      return;
    }
    setImage(image);
    setFilename(image.name);
    setUploaded(true);
    setError(null);
  };

  const onClose = () => {
    setModal(false);
    setError(null);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEncode(false);

    if (!image || !text || !key) {
      setError("Lengkapi semua input!");
      setModal(true);
      setShowEncode(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);
    formData.append('key', key);
    formData.append('algorithm', algorithm);
    formData.append('reedSolomon', useReedSolomon);

    const response = await fetch('https://stegserver-ebmc9j0kk-a8h1kms-projects.vercel.app/encode-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);
    setEncodedImage(imageUrl);
    setLoading(false);
    setShowEncode(true);
  };

  return (
    <div className="text-white bg-gray-900 min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold mb-10">📷 Mode Embed: Sembunyikan Pesan ke dalam Gambar</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kiri: Upload dan Opsi */}
          <div>
            <label className="block mb-2">Upload Gambar Asli (Cover)</label>
            <label htmlFor="dropzone-file" className="block border-2 border-gray-700 border-dashed rounded-lg p-6 text-center bg-gray-800 cursor-pointer hover:bg-gray-700">
              <p className="text-sm">Drag and drop file here</p>
              <p className="text-xs text-gray-400">Limit 200MB per file • JPG, JPEG, PNG</p>
              <input
                id="dropzone-file"
                type="file"
                accept=".png,.bmp,.jpg,.jpeg"
                onChange={(e) => handleImageChange(e.target.files[0])}
                className="hidden"
              />
            </label>
            {uploaded && <p className="text-xs mt-2">File: {filename}</p>}

            <div className="mt-6">
              <label className="block mb-1">Pilih Algoritma Steganografi:</label>
              <select
                className="w-full bg-gray-800 p-2 rounded"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <option value="F5">F5</option>
                <option value="optimDMCSS">optimDMCSS</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  checked={useReedSolomon}
                  onChange={(e) => setUseReedSolomon(e.target.checked)}
                />
                <span className="ml-2">Gunakan Reed-Solomon untuk koreksi kesalahan?</span>
              </label>
            </div>
          </div>

          {/* Kanan: Pesan dan Kunci */}
          <div>
            <label className="block mb-1">Pesan Rahasia:</label>
            <textarea
              className="w-full bg-gray-800 p-2 rounded h-32"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <label className="block mt-4 mb-1">Kunci Rahasia (16, 24, atau 32 karakter):</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-800 p-2 rounded"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          {showEncode && <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded" type="submit">Sembunyikan Pesan</button>}
        </div>

        {loading && (
          <div className="mt-6 text-center animate-spin text-2xl">⏳</div>
        )}
      </form>

      {error && modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Error</h2>
            <p className="text-black mb-4">{error}</p>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {encodedImage && (
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold mb-4">Encoded Image</h3>
          <img className="mx-auto w-64 h-64 object-cover rounded border" src={encodedImage} alt="Encoded" />
          <a className="mt-4 inline-block bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded" href={encodedImage} download="encoded_image.png">
            Download Encoded Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Encode;