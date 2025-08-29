// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import Breadcrumb from '../Common/Breadcrumb'
// import data from './categories'

// const Categories = () => {
//   return (
//     <>
//       <Breadcrumb title={'categories'} pages={['categories']} />

//       <section className="overflow-hidden py-20 bg-gray-2">
//         <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {data.map((contractor) => (
//               <Link
//                 key={contractor.id}
//                 href={`/kontraktor/${contractor.id}`}
//                 className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="relative h-32 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
//                   <Image
//                     src={contractor.image}
//                     alt={contractor.name}
//                     fill
//                     className="object-contain group-hover:scale-105 transition-transform duration-300"
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <h6 className="text-xl font-bold text-dark mb-2 group-hover:text-blue transition-colors duration-300">
//                     {contractor.name}
//                   </h6>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Categories
