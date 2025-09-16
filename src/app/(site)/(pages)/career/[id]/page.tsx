import React from 'react'

import Breadcrumb from '@/components/Common/Breadcrumb'

// Data pekerjaan statis sebagai contoh
const allJobDetails = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'Jakarta, Indonesia',
    type: 'Full-Time',
    description:
      'Kami mencari pengembang frontend berpengalaman yang menguasai React.js dan Next.js untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk membangun antarmuka pengguna yang skalabel dan efisien.',
    responsibilities: [
      'Mengembangkan fitur baru menggunakan React.js dan Next.js.',
      'Memastikan kode berkualitas tinggi, teruji, dan terdokumentasi dengan baik.',
      'Bekerja sama dengan tim backend dan desainer UI/UX.',
      'Mengoptimalkan aplikasi untuk kecepatan dan skalabilitas.',
    ],
    requirements: [
      'Pengalaman kerja minimal 3 tahun sebagai Frontend Developer.',
      'Keahlian mendalam dalam JavaScript, React.js, dan Next.js.',
      'Memahami konsep RESTful API dan GraphQL.',
      'Familiar dengan Tailwind CSS atau framework CSS modern lainnya.',
      'Kemampuan memecahkan masalah yang kuat dan proaktif.',
    ],
  },
  {
    id: '2',
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    type: 'Full-Time',
    description:
      'Membangun dan mengelola kampanye pemasaran digital untuk meningkatkan brand awareness dan akuisisi pelanggan. Posisi ini cocok untuk individu yang kreatif dan berorientasi pada data.',
    responsibilities: [
      'Merencanakan dan mengeksekusi semua kampanye pemasaran digital, termasuk SEO/SEM, email marketing, dan media sosial.',
      'Mengukur dan melaporkan performa kampanye pemasaran digital.',
      'Melakukan riset tren pasar dan analisis kompetitor.',
    ],
    requirements: [
      'Pengalaman kerja minimal 2 tahun di bidang Digital Marketing.',
      'Keahlian dalam Google Ads, Facebook Ads, dan Google Analytics.',
      'Pemahaman kuat tentang strategi SEO dan SEM.',
    ],
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    location: 'Bandung, Indonesia',
    type: 'Full-Time',
    description:
      'Merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang luar biasa untuk produk kami. Anda akan bekerja dari konsep hingga implementasi untuk menciptakan desain yang menarik dan fungsional.',
    responsibilities: [
      'Merancang wireframe, mockup, dan prototype.',
      'Melakukan user research dan pengujian usability.',
      'Bekerja sama dengan tim developer untuk memastikan implementasi desain yang akurat.',
    ],
    requirements: [
      'Portofolio yang kuat dalam desain UI/UX.',
      'Pengalaman menggunakan Figma, Sketch, atau Adobe XD.',
      'Memahami prinsip-prinsip desain web dan mobile.',
    ],
  },
]

// Terima `params` sebagai argumen. Next.js secara otomatis akan menyediakannya.
const CareerDetail = ({ params }) => {
  const { id } = params // Ambil id langsung dari params

  // Temukan data pekerjaan berdasarkan id
  const job = allJobDetails.find((job) => job.id === id)

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-lg font-medium text-gray-700">
        Posisi pekerjaan tidak ditemukan.
      </div>
    )
  }

  const breadcrumbData = [
    { title: 'Home', path: '/' },
    { title: 'Career', path: '/career' },
    { title: job.title, path: `/career/${id}` },
  ]

  return (
    <>
      <Breadcrumb title={job.title} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="max-w-[1170px] mx-auto bg-white rounded-lg shadow-md p-8 sm:p-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-dark">
              {job.title}
            </h1>
            {/* Menggunakan Link biasa dari next/link */}
            <a
              href="/apply"
              className="inline-block bg-blue text-white py-3 px-8 rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium"
            >
              Lamar Sekarang
            </a>
          </div>

          <div className="text-gray-600 text-base mb-6 flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5h-2V13h2v4.5zm0-5.5H9V8h2v4z" />
              </svg>
              <span>{job.type}</span>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-8">{job.description}</p>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-dark mb-4">
              Tanggung Jawab
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-dark mb-4">
              Persyaratan
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default CareerDetail
