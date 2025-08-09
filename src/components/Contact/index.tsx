import React from 'react'
import Breadcrumb from '../Common/Breadcrumb'

const breadcrumbData = [
  { title: 'Home', path: '/' },
  { title: 'contact', path: '/contact' },
]

const Contact = () => {
  // Data lokasi
  const locations = [
    {
      id: 'karapitan',
      title: 'Toko Karapitan',
      address:
        'Jl. Karapitan No.16B, Paledang, Kec. Lengkong, Kota Bandung, Jawa Barat 40261',
      whatsapp: '+62 898 7882 778 & +6289607019252',
      phone: '[022] 4219357 – 4213866 & [022] 4206610 ',
      email: 'sinarterang16b@gmail.com',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7134579107797!2d107.61461646007096!3d-6.924815493046008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c7b94c8f05%3A0x5f8cf9de98da91!2sToko%20Baut%20Sinar%20Terang%20Bandung%20Pusat%20Jual%20Grosir%20Angkur%2C%20Baja%208.8%20A325%2C%20Asdrat%2C%20Skrup%20Dll%20For%20Sale%20and%20Supplier%20Bolt%20Nut!5e0!3m2!1sid!2sid!4v1719809032022!5m2!1sid!2sid',
    },
    {
      id: 'toha',
      title: 'Toko M. Toha',
      address:
        'Jl. Moch. Toha No.266, Karasak, Kec. Astanaanyar, Kota Bandung, Jawa Barat 40243',
      whatsapp: '+62 838 2082 8672 & +62 8555 9283 526',
      phone: '[022] 5200269 – 5225539 & [022] 5209516 – 5210599',
      email: 'sinarterang266bdg@gmail.com',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.413254574434!2d107.60249243196554!3d-6.937922238528843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8f2878d3b37%3A0x355af479f7c40046!2sToko%20Baut%20Sinar%20Terang%20Bandung%20Pusat%20Jual%20Grosir%20Baut%20Roofing%2C%20Skrup%20Tapping%20Philip%2C%20Dll%20For%20Sale%20and%20supplier%20Bolt%20and%20Nut!5e0!3m2!1sid!2sid!4v1719809072708!5m2!1sid!2sid',
    },
  ]

  return (
    <>
      <Breadcrumb title={'Contact'} pages={breadcrumbData} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Header Section */}
          <div className="text-center mb-12">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sinar Terang (ST) hadir sebagai penyedia pasokan produk fastener
              untuk kontruksi, otomotif, furniture dan manufaktur, serta
              perlangkapan dan peralatan untuk building materials di Jawa Barat
              dan Indonesia dengan mapan, lengkap, cepat dan harga fleksibel.
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="bg-white rounded-xl shadow-1 overflow-hidden"
              >
                {/* Location Header */}
                <div className="py-5 px-6 border-b border-gray-3 bg-gradient-to-r from-red-dark to-red-dark">
                  <h3 className="font-semibold text-xl text-white">
                    {location.title}
                  </h3>
                </div>

                {/* Contact Info */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {/* WhatsApp */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-1 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          fill="#25D366"
                          className="w-full h-full"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-dark">WhatsApp</p>
                        <div className="text-gray-600 text-sm">
                          {location.whatsapp.split('&').map((number, index) => (
                            <a
                              key={index}
                              href={`https://wa.me/${number.replace(
                                /\D/g,
                                ''
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              // Class 'block' akan membuat setiap link menjadi baris baru
                              // 'py-0.5' memberi sedikit jarak vertikal antar nomor
                              className="block py-0.5 hover:text-red-dark"
                            >
                              {number.trim()}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-1 flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Telepon</p>
                        <div className="text-gray-600 text-sm">
                          {location.phone.split('&').map((number, index) => (
                            <span
                              key={index}
                              rel="noopener noreferrer"
                              // Class 'block' akan membuat setiap link menjadi baris baru
                              // 'py-0.5' memberi sedikit jarak vertikal antar nomor
                              className="block py-0.5"
                            >
                              {number.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-1 flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Email</p>
                        {/* Email yang bisa diklik */}
                        <a
                          href={`mailto:${location.email}`}
                          className="text-gray-600 text-sm hover:text-red-dark transition-colors"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-1 flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-dark">Alamat</p>
                        <p className="text-gray-600 text-sm">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        location.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-red-dark text-white px-4 py-2.5 rounded-lg hover:bg-red transition-colors duration-200 text-sm font-medium"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Lihat Maps
                    </a>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        location.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                      </svg>
                      Arah
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="px-6 pb-6">
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={location.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map ${location.title}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
