/* eslint-disable react/prop-types */
import React from 'react';
// Impor ikon yang akan kita gunakan
import { HiUserCircle, HiCubeTransparent, HiShieldCheck } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';

// Komponen kecil untuk membuat item list lebih menarik
const FeatureListItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="text-cyan-400 mt-1">{React.createElement(icon, { className: 'w-5 h-5' })}</div>
    <div>
      <h4 className="font-semibold text-slate-100">{title}</h4>
      <p className="text-slate-400 text-sm">{children}</p>
    </div>
  </div>
);

const About = () => {
  const teamMembers = [
    { name: 'Nama Anggota 1', role: 'Project Manager' },
    { name: 'Nama Anggota 2', role: 'Frontend Developer' },
    { name: 'Nama Anggota 3', role: 'Backend Developer' },
    { name: 'Serevina Sherly Maulida', role: 'Algorithm & Research' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 inline-block">
          Tentang Proyek Ini
        </h1>
        <p className="text-slate-400 mt-3 text-lg">Mengenal lebih dalam teknologi di balik layar.</p>
      </div>

      <div className="bg-slate-800/50 ring-1 ring-white/10 rounded-2xl p-6 md:p-8 space-y-10">

        {/* --- TENTANG APLIKASI --- */}
        <section>
          <p className="text-slate-300 leading-relaxed">
            Aplikasi web ini adalah sebuah demonstrasi dari teknik <strong>steganografi digital</strong>, yaitu seni dan ilmu menyembunyikan pesan rahasia di dalam sebuah media digital—dalam kasus ini, file gambar. Kami memanfaatkan transformasi frekuensi pada gambar untuk menyisipkan data tanpa menimbulkan kecurigaan secara visual.
          </p>
        </section>

        {/* --- TEKNOLOGI INTI --- */}
        <section>
           <h3 className="text-xl font-bold text-slate-100 mb-4 border-l-4 border-cyan-400 pl-4">Teknologi Inti</h3>
           <div className="space-y-4">
               <FeatureListItem icon={HiCubeTransparent} title="Algoritma F5">
                   Salah satu algoritma steganografi JPEG yang populer. F5 menyisipkan bit pesan dengan memodifikasi koefisien DCT (Discrete Cosine Transform) non-nol, dan menggunakan matrix encoding untuk meningkatkan efisiensi penyisipan.
               </FeatureListItem>
               <FeatureListItem icon={HiCubeTransparent} title="optimDMCSS">
                   Sebuah pendekatan steganografi modern yang merupakan penyempurnaan dari metode berbasis DCT. Algoritma ini dirancang untuk mengoptimalkan distribusi bit pesan secara adaptif, sehingga menghasilkan ketahanan yang lebih baik terhadap deteksi statistik.
               </FeatureListItem>
           </div>
        </section>
        
        {/* --- FITUR UTAMA --- */}
        <section>
           <h3 className="text-xl font-bold text-slate-100 mb-4 border-l-4 border-cyan-400 pl-4">Fitur Utama</h3>
            <div className="space-y-4">
               <FeatureListItem icon={HiShieldCheck} title="Enkripsi AES">
                   Sebelum disisipkan, pesan rahasia dienkripsi terlebih dahulu menggunakan AES (Advanced Encryption Standard) dengan kunci yang Anda berikan, menambahkan lapisan keamanan kedua.
               </FeatureListItem>
               <FeatureListItem icon={HiShieldCheck} title="Koreksi Kesalahan Reed-Solomon">
                   Untuk melindungi data dari potensi kerusakan minor selama proses kompresi atau transmisi, kami mengimplementasikan kode Reed-Solomon yang dapat memulihkan bit yang hilang atau rusak.
               </FeatureListItem>
           </div>
        </section>

        {/* --- SUMBER & APRESIASI --- */}
        <section>
           <h3 className="text-xl font-bold text-slate-100 mb-4 border-l-4 border-cyan-400 pl-4">Sumber & Apresiasi</h3>
           <div className="bg-slate-900/70 p-4 rounded-lg ring-1 ring-slate-700 flex items-center gap-4">
                <FaGithub className="w-8 h-8 text-slate-400 flex-shrink-0"/>
                <div>
                    <p className="text-slate-300 text-sm">
                        Modul inti untuk algoritma steganografi F5 pada proyek ini diadaptasi dari repositori sumber terbuka yang luar biasa oleh Eamou.
                    </p>
                    <a href="https://github.com/Eamou/drF5" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                        github.com/Eamou/drF5
                    </a>
                </div>
           </div>
        </section>

        {/* --- TIM PENGEMBANG --- */}
        <section>
          <h3 className="text-xl font-bold text-slate-100 mb-6 border-l-4 border-cyan-400 pl-4">Tim Pengembang</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-900/70 p-4 rounded-lg ring-1 ring-slate-700">
                <HiUserCircle className="w-16 h-16 mx-auto text-slate-500 mb-3" />
                <h5 className="font-bold text-slate-100 text-sm">{member.name}</h5>
                <p className="text-xs text-cyan-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;