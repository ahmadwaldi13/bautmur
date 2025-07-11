// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, Pagination } from 'swiper/modules'

// // Import Swiper styles
// import 'swiper/css/pagination'
// import 'swiper/css'
// import { carousel } from './Carousel'

// import Image from 'next/image'

// const HeroCarousal = () => {
//   return (
//     <Swiper
//       spaceBetween={30}
//       centeredSlides={true}
//       autoplay={{
//         delay: 2500,
//         disableOnInteraction: false,
//       }}
//       pagination={{
//         clickable: true,
//       }}
//       modules={[Autoplay, Pagination]}
//       className="hero-carousel"
//     >
//       <SwiperSlide>
//         <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
//           <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
//             <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
//               <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
//                 30%
//               </span>
//               <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
//                 Sale
//                 <br />
//                 Off
//               </span>
//             </div>

//             <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
//               <a href="#">True Wireless Noise Cancelling Headphone</a>
//             </h1>

//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
//               ipsum at risus euismod lobortis in lllllll
//             </p>

//             <a
//               href="#"
//               className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
//             >
//               Shop Now
//             </a>
//           </div>

//           <div>
//             <Image
//               src="/images/hero/hero-01.png"
//               alt="headphone"
//               width={351}
//               height={358}
//             />
//           </div>
//         </div>
//       </SwiperSlide>
//       <SwiperSlide>
//         {' '}
//         <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
//           <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
//             <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
//               <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
//                 30%
//               </span>
//               <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
//                 Sale
//                 <br />
//                 Off
//               </span>
//             </div>

//             <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
//               <a href="#">True Wireless Noise Cancelling Headphone</a>
//             </h1>

//             <p>
//               Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
//               nec suscipit.
//             </p>

//             <a
//               href="#"
//               className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
//             >
//               Shop Now
//             </a>
//           </div>

//           <div>
//             <Image
//               src="/images/hero/hero-01.png"
//               alt="headphone"
//               width={351}
//               height={358}
//             />
//           </div>
//         </div>
//       </SwiperSlide>
//     </Swiper>
//   )
// }

// export default HeroCarousal

'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css/pagination'
import 'swiper/css'

// Import data
import { carousel } from './Carousel'

const HeroCarousel = () => {
  // Function to check if title is long
  const isLongTitle = (title: string) => {
    return title.length > 25 // Adjust threshold as needed
  }

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
      loop={true}
      speed={800}
    >
      {carousel.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="hero-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.path})`,
            }}
          >
            <div className="hero-content">
              {/* Main Title & Description */}
              {item.descriptions && item.descriptions.length > 0 && (
                <>
                  <h1
                    className={`hero-title ${
                      isLongTitle(item.descriptions[0].title)
                        ? 'long-title'
                        : ''
                    }`}
                  >
                    {item.descriptions[0].title}
                  </h1>

                  <p className="hero-description">
                    {item.descriptions[0].description}
                  </p>
                </>
              )}

              {/* Additional descriptions untuk VISI/MISI */}
              {item.descriptions && item.descriptions.length > 1 && (
                <div className="hero-additional-content">
                  {item.descriptions.slice(1).map((desc) => (
                    <div key={desc.id} className="hero-additional-item">
                      <h3 className="hero-subtitle">{desc.title}</h3>
                      <p className="hero-subdescription">{desc.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button - Uncomment if needed */}
              {/* 
              <div className="hero-button-container">
                <a href="#" className="hero-button">
                  Learn More
                </a>
              </div>
              */}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroCarousel
