import React from 'react';

const About = () => {
  return (
    <div className="mt-12 px-12 text-left text-gray-300 leading-relaxed max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">Tentang Aplikasi Steganografi Ini</h2>

      <p className="mb-4">
        Aplikasi ini dibuat untuk mendemonstrasikan teknik <strong>steganografi digital</strong> yang menyisipkan pesan rahasia ke dalam file gambar menggunakan transformasi frekuensi.
        Dalam kasus ini, algoritma yang digunakan berbasis transformasi DCT, yaitu:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>F5 Algorithm</strong>: Mengurangi koefisien DCT dengan teknik matrix encoding dan permutasi acak untuk menyembunyikan data secara efisien tanpa merusak kualitas gambar.</li>
        <li><strong>optimDMCSS</strong>: Algoritma penyempurnaan dari DCT-based yang mengoptimalkan penyisipan dan toleransi noise dengan pendekatan strategi distribusi bit adaptif.</li>
      </ul>

      <p className="mb-4">
        Anda dapat mengunggah gambar berformat <strong>.png</strong>, <strong>.bmp</strong>, atau <strong>.jpg</strong> dengan ukuran maksimal 200MB. Setelah itu, tuliskan pesan rahasia dan pilih algoritma steganografi yang diinginkan.
      </p>

      <p className="mb-4">
        Fitur tambahan seperti <strong>penggunaan kunci rahasia</strong> dan <strong>Reed-Solomon Error Correction</strong> disiapkan untuk meningkatkan keamanan dan ketahanan terhadap kerusakan data.
      </p>

      <p className="mb-4">
        Tools ini dirancang untuk keperluan pembelajaran dan eksperimen dalam ranah keamanan data serta pengolahan citra digital.
      </p>

      <p className="mt-8 text-sm text-gray-400 italic">
        Dibuat oleh Serevina Sherly Maulida sebagai bagian dari tugas akhir bidang Keamanan Informasi dan Komputasi Awan.
      </p>
    </div>
  );
};

export default About;
