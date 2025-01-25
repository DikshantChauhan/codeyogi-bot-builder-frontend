import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { memo, useState } from 'react'
import { getRandomId } from '../utils'

interface VideoCardStackProps {
  videoLinks: string[]
  className?: string
}

const VideoCardStack: React.FC<VideoCardStackProps> = ({ videoLinks, className = '' }) => {
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(null)

  const handlePlayPause = (videoRef: HTMLVideoElement) => {
    if (videoRef.paused) {
      videoRef.play()
      setCurrentVideo(videoRef)
    } else {
      videoRef.pause()
      setCurrentVideo(null)
    }
  }
  return (
    <Swiper
      direction="vertical"
      spaceBetween={10}
      slidesPerView={1}
      mousewheel
      onSlideChange={() => {
        if (currentVideo) currentVideo.pause()
      }}
      className={className}
    >
      {videoLinks.map((link) => {
        // const sortsLeft = videoLinks.length - videoLinks.indexOf(link) - 1
        return (
          <SwiperSlide key={getRandomId()} className="w-full h-full cursor-pointer">
            <video
              src={link}  
              controls={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onClick={(e) => handlePlayPause(e.currentTarget)}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default memo(VideoCardStack)
