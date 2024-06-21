'use client';
import Testimonials from "@/components/others/Testimonials";
import Link from "next/link";
import { useScroll, motion, Variants } from "framer-motion";
import Header from "@/components/others/Header";
import Image from "next/image";
import { useRef } from "react";
import Footer from "@/components/others/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scrollVariants : Variants = {
    offscreen: {
      opacity: 0,
      y: -100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full">
        <Header progress={scrollYProgress}/>
        <motion.div className="h-screen flex flex-col items-center justify-center gap-14" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
            <h1 className="text-5xl font-bold max-md:mt-14">GetHired.com</h1>
            <p className="text-2xl text-slate-500 text-center">Where startups and job seekers connect</p>
            <div className="md:w-2/5 w-full flex items-center md:justify-between md:flex-row flex-col gap-6">
                <Link href='/account/signup/recruiter' className="bg-slate-800 text-white rounded-xl text-lg px-6 py-4">Find your next hire</Link>
                <Link href='/account/signup/candidate' className="border border-slate-500 rounded-xl text-lg px-6 py-4">Find your next job</Link>
            </div>
        </motion.div>
        <motion.div className="md:px-14 px-8 h-screen">
          <p className="font-bold mb-2">Quotes</p>
          <h2 className="text-3xl font-bold mb-6">From our users</h2>
          <Testimonials />
        </motion.div>
        <motion.div className="w-full grid md:grid-cols-2 grid-cols-1 md:px-14 px-8 mb-10" >
          <div className="px-8 py-6 flex flex-col gap-10">
            <h3 className="font-bold">Got talent?</h3>
            <h2 className="font-bold text-4xl">Why job seekers love us</h2>
            <div className="flex flex-col text-sm h-4/5 justify-between max-md:gap-6" ref={scrollRef}>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e6df60830cc7c2b88b_stairs-up.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Connect directly with founders at top startups - no third party recruiters allowed.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e63b04b79dd28c1ca3_books.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Everything you need to know, all upfront. View salary, stock options, and more before applying.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e670c0dd6f22eee061_tap.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Say goodbye to cover letters - your profile is all you need. One click to apply and you&apos;re done.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e7342fe2d5b929e48c_stars.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Unique jobs at startups and tech companies you can&apos;t find anywhere else.
                </p>
              </motion.div>
            </div>
            <div className="flex gap-6 mt-auto">
              <Link href='/' className="px-6 py-2 border border-slate-400 rounded-lg">Learn more</Link>
              <Link href='/' className="px-6 py-2 border bg-black text-white rounded-lg">Sign up</Link>
            </div>
          </div>
          <div className="bg-red-50 px-8 py-6 flex flex-col gap-10">
            <h3 className="font-bold">Need talent?</h3>
            <h2 className="font-bold text-4xl">Why recruiters love us</h2>
            <div className="flex flex-col text-sm gap-6" ref={ref2}>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e6df60830cc7c2b88b_stairs-up.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Tap into a community of 10M+ engaged, startup-ready candidates.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e63b04b79dd28c1ca3_books.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Everything you need to kickstart your recruiting — set up job posts, company branding, and HR tools within 10 minutes, all for free.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center" initial="offscreen" whileInView='onscreen' viewport={{once: true, amount: 0.5}} variants={scrollVariants}>
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e670c0dd6f22eee061_tap.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  A free applicant tracking system, or free integration with any ATS you may already use.
                </p>
              </motion.div>
              <motion.div className="flex gap-6 items-center">
                <div className="bg-orange-200 md:w-1/12 p-2 rounded-full">
                  <Image src='https://assets-global.website-files.com/64626a4a74818ca87606a29e/646574e7342fe2d5b929e48c_stars.svg' alt="" width={30} height={30} className="m-auto"/>
                </div>
                <p className="w-11/12">
                  Let us handle the heavy-lifting with RecruiterCloud. Our new AI-Recruiter scans 500M+ candidates, filters it down based on your unique calibration, and schedules your favorites on your calendar in a matter of days.
                </p>
              </motion.div>
            </div>
            <div className="flex gap-6">
              <Link href='/' className="px-6 py-2 border border-slate-400 rounded-lg">Learn more</Link>
              <Link href='/' className="px-6 py-2 border bg-black text-white rounded-lg">Sign up</Link>
            </div>
          </div>
        </motion.div>
        <Footer />
    </div>
  );
}
