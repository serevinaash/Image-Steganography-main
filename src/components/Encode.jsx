/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';

// Menambahkan ikon baru untuk file ZIP
import { 
  HiCloudArrowUp, 
  HiChatBubbleLeftEllipsis, 
  HiKey, 
  HiCog6Tooth, 
  HiEye, 
  HiEyeSlash,
  HiArchiveBoxArrowDown // <-- Ikon baru untuk hasil ZIP
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



const Encode = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('F5');
  const [useReedSolomon, setUseReedSolomon] = useState(true);
  const [resultZipUrl, setResultZipUrl] = useState(null); // <-- Ganti nama state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleImageChange = useCallback((file) => {
    setError(null);
    if (!file) return;

    // Menyesuaikan validasi dengan deskripsi (PNG, JPG, BMP)
    if (!file.name.match(/\.(png|bmp|jpg|jpeg)$/i)) {
      setError('Tipe File Salah! Pilih file PNG, JPG, atau BMP.');
      return;
    }
    if (file.size > 200 * 1024 * 1024) { // 200MB limit
      setError('Ukuran file melebihi batas! Pilih file di bawah 200MB.');
      return;
    }
    setImage(file);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      if (resultZipUrl) { // <-- Tambahkan cleanup untuk URL ZIP
        URL.revokeObjectURL(resultZipUrl);
      }
    };
  }, [imagePreview, resultZipUrl]);
  
  const handleReset = () => {
      setImage(null);
      setImagePreview(null);
      setText('');
      setKey('');
      setAlgorithm('F5');
      setUseReedSolomon(true);
      setResultZipUrl(null); // <-- Ganti nama state
      setError(null);
      setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Silakan pilih file gambar untuk disisipkan pesan.');
      return;
    }
    if (text.trim() === '') {
      setError('Silakan masukkan pesan yang ingin disembunyikan.');
      return;
    }

    setLoading(true);
    setResultZipUrl(null); // <-- Reset hasil sebelumnya
    const formData = new FormData();
    // Menyesuaikan nama field dengan kode yang Anda berikan
    formData.append('cover_image', image);
    formData.append('message', text);
    formData.append('algorithm', algorithm);
    formData.append('use_rs', useReedSolomon);
    if (key.trim() !== '') {
      formData.append('key', key);
    }

    try {
      // Menyesuaikan endpoint dengan kode yang Anda berikan
      const response = await fetch('https://petanihandal-stegano-f5-dmcss-api.hf.space/embed', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: 'Gagal menyisipkan pesan. Respon tidak valid.' }));
        throw new Error(errData.detail || 'Terjadi kesalahan pada server.');
      }
      
      const data = await response.blob();
      const zipUrl = URL.createObjectURL(data);
      setResultZipUrl(zipUrl); // <-- Simpan URL blob ZIP
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke server.');
    }
    setLoading(false);
  };

  // =================================================================================
  // BAGIAN HASIL (UI DIUBAH TOTAL)
  // Kondisi sekarang mengecek `resultZipUrl`
  // =================================================================================
  if (resultZipUrl) {
    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/50 ring-1 ring-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400 mb-4">🎉 Berhasil Diproses!</h2>
                <p className="text-slate-300 mb-6">File gambar dan kunci Anda telah dibundel dalam satu file ZIP. Silakan unduh hasilnya.</p>
                
                {/* Menghapus <img>, menggantinya dengan ikon besar */}
                <div className="flex justify-center">
                  <HiArchiveBoxArrowDown className="w-24 h-24 text-cyan-400 mb-6" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Tombol Download sekarang untuk file .zip */}
                    <a 
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105" 
                      href={resultZipUrl} 
                      download="stego_result.zip" // <-- Nama file download diubah menjadi .zip
                    >
                        Download Hasil (.zip)
                    </a>
                    <button 
                      onClick={handleReset} 
                      className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Buat Baru
                    </button>
                </div>
            </div>
        </div>
    )
  }

  // Sisa dari komponen (form input) tetap sama
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Embed Message</h1>
        <p className="text-slate-400 mt-2">Sembunyikan pesan rahasia Anda ke dalam sebuah gambar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Langkah 1: Upload Gambar" subtitle="Pilih gambar yang akan dijadikan 'wadah'." icon={HiCloudArrowUp}>
          {imagePreview ? (
            <div className="text-center">
                <img src={imagePreview} alt="Pratinjau Gambar" className="w-full max-h-72 object-contain rounded-lg mx-auto mb-4" />
                <button type="button" onClick={() => document.getElementById('dropzone-file').click()} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm px-4 py-2 rounded-lg font-semibold transition-colors">
                    Ganti Gambar
                </button>
            </div>
          ) : (
            <>
              <input id="dropzone-file" type="file" className="hidden" accept=".png,.bmp,.jpg,.jpeg" onChange={(e) => handleImageChange(e.target.files[0])} />
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800/70 transition-colors">
                <HiCloudArrowUp className="w-8 h-8 mb-4 text-slate-500" />
                <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Klik untuk upload</span> atau seret & lepas</p>
                <p className="text-xs text-slate-500">PNG, JPG, BMP (MAX. 200MB)</p>
              </label>
            </>
          )}
        </FormSection>

        <FormSection title="Langkah 2: Tulis Pesan & Kunci" subtitle="Masukkan data yang ingin Anda sembunyikan." icon={HiChatBubbleLeftEllipsis}>
            <div>
              <label htmlFor="secret-text" className="block text-sm font-semibold text-slate-300 mb-2">Pesan Rahasia</label>
              <textarea id="secret-text" rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Tuliskan pesan Anda di sini..." className="w-full bg-slate-900 text-slate-100 p-3 rounded-md ring-1 ring-slate-600 focus:ring-cyan-500 focus:outline-none transition placeholder-slate-500"/>
            </div>
             <div>
              <label htmlFor="secret-key" className="block text-sm font-semibold text-slate-300 mb-2">Kunci Rahasia (Opsional)</label>
              <div className="relative">
                <input id="secret-key" type={showKey ? 'text' : 'password'} value={key} onChange={(e) => setKey(e.target.value)} className="w-full bg-slate-900 text-slate-100 p-3 rounded-md ring-1 ring-slate-600 focus:ring-cyan-500 focus:outline-none transition placeholder-slate-500" placeholder="Kunci enkripsi AES-256"/>
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
        </FormSection>

        <FormSection title="Langkah 3: Konfigurasi" subtitle="Atur parameter teknis penyisipan pesan." icon={HiCog6Tooth}>
            <div className='flex justify-between items-center'>
                <label htmlFor="algorithm" className="block text-sm font-semibold text-slate-300">Algoritma Steganografi</label>
                <select id="algorithm" className="bg-slate-900 text-slate-100 p-2 rounded-md ring-1 ring-slate-600 focus:ring-cyan-500 focus:outline-none transition" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="F5">F5</option>
                    <option value="optimDMCSS">optimDMCSS</option>
                </select>
            </div>
             <div className='flex justify-between items-center'>
                <label htmlFor="reed-solomon" className="block text-sm font-semibold text-slate-300">Gunakan Reed-Solomon?</label>
                <ToggleSwitch enabled={useReedSolomon} setEnabled={setUseReedSolomon} />
            </div>
        </FormSection>

        <div className="pt-4">
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !image || !text}>
            {loading ? 'Memproses...' : 'Mulai Proses Embed'}
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

export default Encode;