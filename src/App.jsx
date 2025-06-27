import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import About from "./components/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* Latar belakang utama aplikasi dengan gradien gelap */}
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <Navbar />

        <main className="flex flex-col flex-grow pt-24 px-6">
          <Routes>
            <Route
              path="/"
              element={
                // Kontainer untuk konten utama halaman, dibuat agar berada di tengah
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center w-full max-w-3xl mx-auto">
                    {/* Kartu dengan efek "Glassmorphism" */}
                    <div className="bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 rounded-xl p-8 md:p-12 shadow-2xl shadow-cyan-500/10">
                      {/* Judul Utama dengan Gradien Teks */}
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 inline-block">
                        Image Steganography
                      </h1>

                      {/* Badge/Tag untuk nama algoritma */}
                      <div className="mt-2">
                        <span className="inline-block bg-cyan-900/70 text-cyan-200 text-xs font-semibold px-4 py-1 rounded-full ring-1 ring-cyan-200/30">
                          Modified F5 / optimDMCSS
                        </span>
                      </div>

                      {/* Sub-judul dengan penekanan */}
                      <h2 className="mt-8 text-lg text-slate-300">
                        Sembunyikan pesan rahasia di dalam gambar digital Anda.
                      </h2>

                      {/* Deskripsi teknis */}
                      <h2 className="text-sm text-slate-400 italic mt-2">
                        Menggunakan algoritma berbasis DCT:{" "}
                        <span className="font-semibold text-cyan-400">F5</span>{" "}
                        dan{" "}
                        <span className="font-semibold text-cyan-400">
                          optimDMCSS
                        </span>
                        .
                      </h2>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/encode" element={<Encode />} />
            <Route path="/decode" element={<Decode />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer diposisikan di bagian bawah */}
        <footer className="mt-auto text-center text-xs text-slate-500 py-8 px-4">
          Proyek ini dikembangkan sebagai bagian dari tugas akademis.
          Mengimplementasikan algoritma steganografi domain DCT yang
          dimodifikasi berdasarkan metode F5 dan optimDMCSS.
        </footer>
      </div>
    </Router>
  );
}

export default App;
