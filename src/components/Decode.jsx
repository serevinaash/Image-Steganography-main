/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';


import { 
  HiArrowUpOnSquareStack, 
  HiKey, 
  HiEye, 
  HiEyeSlash, 
  HiDocumentText,
  HiClipboardDocument,
  HiCheckCircle
} from 'react-icons/hi2';


const FormSection = ({ title, subtitle, icon, children }) => (
  <div className="bg-slate-800/50 ring-1 ring-white/10 rounded-2xl p-6 md:p-8">
    <div className="flex items-center gap-4 mb-5">
      <div className="bg-slate-900/70 p-3 rounded-full ring-1 ring-slate-700">
        {React.createElement(icon, { className: 'w-6 h-6 text-cyan-400' })}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const ToggleSwitch = ({ enabled, setEnabled }) => (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`${enabled ? 'bg-cyan-500' : 'bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
      role="switch"
      aria-checked={enabled}
    >
      <span aria-hidden="true" className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}/>
    </button>
);



const Decode = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [keyFilename, setKeyFilename] = useState('');
  const [password, setPassword] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [algorithm, setAlgorithm] = useState('F5');
  const [useReedSolomon, setUseReedSolomon] = useState(true);
  const [decodedText, setDecodedText] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleImageChange = useCallback((file) => {
    setError(null);
    if (!file) return;
    if (!file.name.match(/\.(jpg|jpeg)$/)) {
      setError('Tipe File Salah! Hanya gambar .JPG atau .JPEG yang didukung untuk diekstrak.');
      return;
    }
    setImage(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  }, [imagePreview]);
  
  const handleKeyFileChange = (file) => {
      if(!file) return;
      if(!file.name.endsWith('.bin')) {
          setError('Tipe File Kunci Salah! Harap upload file .bin');
          return;
      }
      setKeyFile(file);
      setKeyFilename(file.name);
  }

  // Cleanup URL object
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);
  
  const handleReset = () => {
      setImage(null);
      setImagePreview(null);
      setKeyFile(null);
      setKeyFilename('');
      setPassword('');
      setAlgorithm('F5');
      setUseReedSolomon(true);
      setDecodedText(null);
      setError(null);
      setLoading(false);
      setIsCopied(false);
  }
  
  const copyToClipboard = () => {
      if(decodedText) {
          navigator.clipboard.writeText(decodedText);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset status setelah 2 detik
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !password.trim()) {
      setError('Harap upload gambar stego dan masukkan kunci rahasia.');
      return;
    }

    setLoading(true);
    setDecodedText(null);
    const formData = new FormData();
    formData.append('stego_image', image);
    formData.append('key', password);
    formData.append('algorithm', algorithm);
    formData.append('use_rs', useReedSolomon);
    formData.append('path_key_file', keyFile);
    
    try {
      const response = await fetch('https://petanihandal-stegano-f5-dmcss-api.hf.space/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Gagal mengekstrak pesan.');
      }
      setDecodedText(data.extracted_message);
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke server.');
    }
    setLoading(false);
  };
  
  if (decodedText !== null) {
      return (
        <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 ring-1 ring-white/10 rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-slate-900/70 p-3 rounded-full ring-1 ring-slate-700">
                        <HiDocumentText className="w-8 h-8 text-cyan-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400 mb-2">🎉 Pesan Berhasil Diekstrak!</h2>
                <div className="mt-6 text-left bg-slate-900 p-4 rounded-lg ring-1 ring-slate-700 max-h-60 overflow-y-auto">
                    <p className="text-slate-200 whitespace-pre-wrap break-words">{decodedText}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                     <button onClick={copyToClipboard} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
                        {isCopied ? <HiCheckCircle className="w-5 h-5"/> : <HiClipboardDocument className="w-5 h-5" />}
                        {isCopied ? 'Tersalin!' : 'Salin Pesan'}
                    </button>
                     <button onClick={handleReset} className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-semibold transition-colors">
                        Ekstrak Lagi
                    </button>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Extract Message</h1>
        <p className="text-slate-400 mt-2">Ekstrak pesan rahasia dari dalam gambar stego.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Langkah 1: Upload File" subtitle="Pilih gambar stego dan file kunci jika ada." icon={HiArrowUpOnSquareStack}>
            <div className="bg-slate-900/70 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Gambar Stego (.jpg)</label>
                {imagePreview ? (
                     <div className="text-center">
                        <img src={imagePreview} alt="Pratinjau Gambar" className="w-full max-h-60 object-contain rounded-lg mx-auto mb-4" />
                        <button type="button" onClick={() => document.getElementById('stego-image-file').click()} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors">Ganti Gambar</button>
                    </div>
                ) : (
                    <>
                        <input id="stego-image-file" type="file" className="hidden" accept=".jpg,.jpeg" onChange={(e) => handleImageChange(e.target.files[0])} />
                        <label htmlFor="stego-image-file" className="flex items-center justify-center w-full py-4 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:bg-slate-800/70 transition-colors">
                            <span className="text-sm text-slate-400">Klik atau seret file gambar</span>
                        </label>
                    </>
                )}
            </div>
            <div className="bg-slate-900/70 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-slate-300 mb-2">File Kunci (.bin) - Opsional</label>
                <input id="key-file-input" type="file" className="hidden" accept=".bin" onChange={(e) => handleKeyFileChange(e.target.files[0])} />
                <label htmlFor="key-file-input" className="flex items-center justify-center w-full py-4 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:bg-slate-800/70 transition-colors">
                     <span className="text-sm text-slate-400">{keyFilename || "Klik atau seret file kunci"}</span>
                </label>
            </div>
        </FormSection>

        <FormSection title="Langkah 2: Kunci & Konfigurasi" subtitle="Masukkan parameter yang sesuai saat embed." icon={HiKey}>
             <div>
              <label htmlFor="secret-key" className="block text-sm font-semibold text-slate-300 mb-2">Kunci Rahasia</label>
              <div className="relative">
                <input id="secret-key" type={showKey ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900 text-slate-100 p-3 rounded-md ring-1 ring-slate-600 focus:ring-cyan-500 focus:outline-none transition placeholder-slate-500" placeholder="Kunci yang digunakan saat embed"/>
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center'>
                <label htmlFor="algorithm" className="block text-sm font-semibold text-slate-300">Algoritma</label>
                <select id="algorithm" className="bg-slate-900 text-slate-100 p-2 rounded-md ring-1 ring-slate-600 focus:ring-cyan-500 focus:outline-none transition" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="F5">F5</option>
                    <option value="optimDMCSS">optimDMCSS</option>
                </select>
            </div>
             <div className='flex justify-between items-center'>
                <label htmlFor="reed-solomon" className="block text-sm font-semibold text-slate-300">Menggunakan Reed-Solomon?</label>
                <ToggleSwitch enabled={useReedSolomon} setEnabled={setUseReedSolomon} />
            </div>
            <div className="!mt-8 bg-cyan-900/40 text-cyan-200 p-3 rounded-lg text-xs ring-1 ring-cyan-500/30">
                Pastikan Kunci, Algoritma, dan opsi Reed-Solomon sama persis seperti saat proses embed untuk hasil yang akurat.
            </div>
        </FormSection>

        <div className="pt-4">
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !image || !password}>
            {loading ? 'Mengekstrak...' : 'Ekstrak Pesan'}
          </button>
        </div>
      </form>

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setError(null)}>
          <div className="bg-slate-800 text-slate-100 p-6 rounded-xl shadow-2xl shadow-black/50 ring-1 ring-red-500/50 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-red-400 mb-4">Terjadi Kesalahan</h2>
            <p className="mb-6 text-slate-300">{error}</p>
            <button onClick={() => setError(null)} className="w-full bg-red-600/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decode;