'use client';
import Image from 'next/image';
import {motion} from 'framer-motion'
import { testimonals } from '@/constants/testimonials';
import { useEffect, useState } from 'react';

type Testimonials =  {
    id: number;
    content: string;
}

const Testimonials = () => {
  const toShow = Math.min(Math.floor(window.innerWidth/300), 3);
  const [visibles, setVisibles] = useState<Testimonials[]>(testimonals.slice(0, toShow));
  const [index, setIndex] = useState(toShow);
  useEffect(() => {
    const unsub = setInterval(() => {
        visibles.pop();
        visibles.unshift(testimonals[index%6]);
        setVisibles([...visibles]);
        setIndex(index+1);
    }, 3000);
    return () => {
        clearInterval(unsub);
    }
  })
  const getColumns = () => {
    return `grid-cols-${toShow}`;
  }
  return (
    <div className={`w-full grid gap-4 ${getColumns()}`}>
        {visibles?.map((testmony) => (
            <motion.div className='bg-orange-100 px-10 py-8 h-full w-full rounded-lg' key={testmony.id} layout>
                <div className='h-14 w-14 rounded-full bg-orange-300'>
                    <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/6465787f421948a5b1f75eb8_quote.svg' alt='' className='m-auto' width={60} height={60}/>
                </div>
                <p className='my-20 h-20'>{testmony.content}</p>
            </motion.div>
        ))}
    </div>
  )
}

export default Testimonials