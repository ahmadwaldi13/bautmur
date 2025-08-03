import Link from 'next/link'
import React from 'react'

// Definisikan tipe data untuk props agar lebih aman
type BreadcrumbPage = {
  title: string
  path: string
}

type BreadcrumbProps = {
  title: string
  pages: BreadcrumbPage[]
}

const Breadcrumb = ({ title, pages }: BreadcrumbProps) => {
  return (
    <div className="overflow-hidden shadow-breadcrumb pt-[209px] sm:pt-[155px] lg:pt-[95px] xl:pt-[165px]">
      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 py-5 xl:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="font-semibold text-dark text-xl sm:text-2xl xl:text-custom-2">
              {title}
            </h1>

            <ul className="flex flex-wrap items-center gap-2">
              {/* Loop untuk menampilkan breadcrumb yang bisa diklik */}
              {pages.map((page, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-custom-sm capitalize"
                >
                  {/* Jika bukan item terakhir, buat menjadi Link */}
                  {index < pages.length - 1 ? (
                    <Link href={page.path} className="hover:text-blue">
                      {page.title}
                    </Link>
                  ) : (
                    // Item terakhir (halaman aktif) hanya teks dan berwarna biru
                    <span className="text-blue">{page.title}</span>
                  )}

                  {/* Tampilkan pemisah jika bukan item terakhir */}
                  {index < pages.length - 1 && (
                    <span className="text-gray-500">/</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
