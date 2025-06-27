import React, { useState } from 'react';

const Decode = () => {
  const [image, setImage] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [algorithm, setAlgorithm] = useState('F5');
  const [reedSolomon, setReedSolomon] = useState(true);
  const [text, setText] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');
  const [keyFilename, setKeyFilename] = useState('');

  const handleFileChange = (setter, setName, acceptExts, maxSizeMB) => (file) => {
    const extValid = acceptExts.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!extValid) {
      setError(`Invalid file type! Only ${acceptExts.join(', ').toUpperCase()} allowed.`);
      setModal(true);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large! Max ${maxSizeMB}MB allowed.`);
      setModal(true);
      return;
    }
    setter(file);
    setName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !keyFile || password === '') {
      setError('Lengkapi semua input: gambar, kunci, dan password.');
      setModal(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('key', keyFile);
    formData.append('password', password);
    formData.append('algorithm', algorithm);
    formData.append('reedSolomon', reedSolomon);

    try {
      const response = await fetch('https://your-backend/decode-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setText(data.decoded_text);
    } catch (err) {
      setError('Gagal mengirim permintaan decode.');
      setModal(true);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setModal(false);
    setError(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔍 Mode Extract: Ekstrak Pesan dari Gambar</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="flex-1 space-y-4">
          <label className="block font-semibold">Upload Gambar Stego (.jpg)</label>
          <div className="border-2 border-dashed bg-gray-800 p-4 rounded-md">
            <input accept=".jpg,.jpeg" onChange={e => handleFileChange(setImage, setFilename, ['.jpg', '.jpeg'], 200)(e.target.files[0])} id="dropzone-stego" type="file" className="hidden" />
            <label htmlFor="dropzone-stego" className="flex items-center justify-center h-32 cursor-pointer text-gray-400">
              Drag and drop file here / Click to browse
            </label>
            {filename && <p className="text-sm text-green-400 mt-2">File: {filename}</p>}
          </div>

          <label className="block font-semibold">Upload File Kunci Path (.bin)</label>
          <div className="border-2 border-dashed bg-gray-800 p-4 rounded-md">
            <input accept=".bin" onChange={e => handleFileChange(setKeyFile, setKeyFilename, ['.bin'], 200)(e.target.files[0])} id="dropzone-key" type="file" className="hidden" />
            <label htmlFor="dropzone-key" className="flex items-center justify-center h-32 cursor-pointer text-gray-400">
              Drag and drop file here / Click to browse
            </label>
            {keyFilename && <p className="text-sm text-green-400 mt-2">File: {keyFilename}</p>}
          </div>
        </div>

        {/* Options Area */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Masukkan Kunci & Opsi</h3>

          <label className="block text-sm font-medium mb-1">Kunci Rahasia:</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <label className="block mt-4 text-sm font-medium mb-1">Algoritma yang digunakan saat embed:</label>
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white">
            <option value="F5">F5</option>
            <option value="optimDMCSS">optimDMCSS</option>
          </select>

          <label className="inline-flex items-center mt-4">
            <input type="checkbox" checked={reedSolomon} onChange={() => setReedSolomon(!reedSolomon)} className="form-checkbox text-red-500" />
            <span className="ml-2">Apakah Reed-Solomon digunakan saat embed?</span>
          </label>
        </div>

        {/* Info */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-blue-900 text-blue-200 p-4 rounded-md text-sm">
            Pastikan Kunci, Algoritma, dan opsi Reed-Solomon sama persis seperti saat proses embed.
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button type="submit" className="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-md shadow">Ekstrak Pesan</button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-6">
          <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      )}

      {text && (
        <div className="mt-10 bg-black text-white p-6 rounded-md text-center">
          <h3 className="text-lg font-bold">Pesan Tersembunyi:</h3>
          <p className="mt-2 text-sm break-words">{text}</p>
        </div>
      )}

      {modal && error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-black max-w-sm">
            <h2 className="text-lg font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decode;