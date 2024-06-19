import Link from "next/link"

const Footer = () => {
  return (
    <div className="w-full bg-fuchsia-950 py-16 md:px-20 px-10 text-white">
        <div className="w-full flex justify-between">
            <h3 className="text-5xl font-bold md:block hidden">GetHired</h3>
            <div className="md:w-2/5 w-full flex justify-between">
                <div className="flex flex-col gap-5">
                    <h4 className="text-2xl font-semibold">For candidates</h4>
                    <Link href='/'>Overview</Link>
                    <Link href='/'>Startup jobs</Link>
                    <Link href='/'>Web3 jobs</Link>
                    <Link href='/'>Remote</Link>
                    <Link href='/'>Featured</Link>
                </div>
                <div className="flex flex-col gap-5">
                    <h4 className="text-2xl font-semibold">For recruiters</h4>
                    <Link href='/'>Overview</Link>
                    <Link href='/'>Recruit pro</Link>
                    <Link href='/'>Curated</Link>
                    <Link href='/'>Hire developers</Link>
                    <Link href='/'>Pricing</Link>
                </div>
            </div>
        </div>
        <div className="w-full flex items-center justify-between mt-14">
            <div className="flex gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M11,4c-3.866,0 -7,3.134 -7,7v28c0,3.866 3.134,7 7,7h28c3.866,0 7,-3.134 7,-7v-28c0,-3.866 -3.134,-7 -7,-7zM13.08594,13h7.9375l5.63672,8.00977l6.83984,-8.00977h2.5l-8.21094,9.61328l10.125,14.38672h-7.93555l-6.54102,-9.29297l-7.9375,9.29297h-2.5l9.30859,-10.89648zM16.91406,15l14.10742,20h3.06445l-14.10742,-20z"></path></g></g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
                </svg>
            </div>
            <p className="text-sm w-1/2 text-right">Designed and developed by Ayyan.</p>
        </div>
    </div>
  )
}

export default Footer