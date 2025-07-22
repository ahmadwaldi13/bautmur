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
