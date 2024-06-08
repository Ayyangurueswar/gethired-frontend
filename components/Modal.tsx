'use client';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {AnimatePresence, motion} from 'framer-motion'

const Modal = ({show, onClose, children}: {
  show: boolean,
  onClose: () => void,
  children: React.ReactNode,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, [show]);
  const modalContent = 
  <AnimatePresence>
    {show ? (
      <motion.div className="w-full h-full bg-black bg-opacity-70 flex flex-col justify-center 
      fixed top-0 left-0" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <motion.div className="bg-white w-3/4 h-[90%] self-center p-5 z-50 rounded-lg" initial={{y: -200}} animate={{y: 0}} exit={{y: -200}}>
            <div className="w-full flex justify-end">
              <button onClick={(e) => {
                  e.preventDefault();
                  onClose();
              }}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" width={30} height={30}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg></button>
            </div>
            {children}
          </motion.div>
      </motion.div>
    ): null}
  </AnimatePresence>
  if(isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  }
  else{
    return null;
  }
}

export default Modal