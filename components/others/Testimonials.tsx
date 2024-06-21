'use client';
import Image from 'next/image';
import { testimonals } from '@/constants/testimonials';
import Slider from 'react-slick';

type Testimonials =  {
    id: number;
    content: string;
}

const Testimonials = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows: false,
    className: 'w-full h-2/3',
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Slider {...settings}>
        {testimonals.map((testmony) => (
            <div className='bg-orange-100 px-10 py-8 h-full w-full rounded-lg' key={testmony.id}>
                <div className='h-14 w-14 rounded-full bg-orange-300'>
                    <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/6465787f421948a5b1f75eb8_quote.svg' alt='' className='m-auto' width={60} height={60}/>
                </div>
                <p className='my-20 h-20'>{testmony.content}</p>
            </div>
        ))}
    </Slider>
  )
}

export default Testimonials