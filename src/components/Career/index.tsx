import React from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Link from 'next/link'

const breadcrumbData = [
  { title: 'Home', path: '/' },
  { title: 'Career', path: '/career' },
]

const jobListings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    location: 'Jakarta, Indonesia',
    type: 'Full-Time',
    description:
      'Kami mencari pengembang frontend berpengalaman yang menguasai React.js dan Next.js untuk bergabung dengan tim kami.',
  },
  {
    id: 2,
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    type: 'Full-Time',
    description:
      'Membangun dan mengelola kampanye pemasaran digital untuk meningkatkan brand awareness dan akuisisi pelanggan.',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    location: 'Bandung, Indonesia',
    type: 'Full-Time',
    description:
      'Merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang luar biasa untuk produk kami.',
  },
]

const Career = () => {
  const hasJobs = jobListings.length > 0

  return (
    <>
      <Breadcrumb title={'Career'} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4">
              Bergabunglah dengan Tim Kami
            </h1>
            <p className="text-base sm:text-lg text-gray-7 max-w-2xl mx-auto">
              Kami selalu mencari individu berbakat dan bersemangat untuk tumbuh
              bersama. Mari bangun masa depan yang lebih baik bersama-sama.
            </p>
          </div>

          {/* Job Listings atau Pesan Data Kosong */}
          <div className="mt-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark">
                Posisi yang Tersedia
              </h2>
            </div>

            {hasJobs ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-dark mb-2">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-6 mb-1">
                      <span className="font-medium">{job.location}</span> &bull;{' '}
                      {job.type}
                    </p>
                    <p className="text-gray-7 mb-4">{job.description}</p>
                    <Link
                      href={`/career/${job.id}`}
                      className="inline-block bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      Pelajari Selengkapnya
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl font-medium text-gray-7">
                  Saat ini tidak ada lowongan pekerjaan yang tersedia.
                </p>
                <p className="text-base text-gray-7 mt-2">
                  Terus pantau halaman ini untuk pembaruan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
export default Career
