import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import "./locomotive-scroll.css";
import gsap from 'gsap';

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    // Cleanup on unmount
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
              gsap.to("body", {
                backgroundColor: "#fd2c2a",
                duration: 0,
                ease: "linear",
              })
            },
          });
        } else {
          gsap.to("body", {
            backgroundColor: "#fffafa",
            duration: 1.2,
            delay: 0,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span ref={growingSpan} className="growing block top-[-10px] left-[-10px] w-[10px] h-[10px] bg-[#fd2c2a] absolute rounded-full"></span>
      <div
        className='w-full relative min-h-screen 
        transition-all duration-500 ease-in-out'
      >
        {showCanvas && 
          data[0].map((canvasdets, i) => (
            <Canvas 
              key={i} 
              details={canvasdets}
            />
          ))
        }

        <div className="w-full relative z-[1] min-h-screen">
          <nav className="w-full pl-[10px] pr-[14px] pt-[10px] pb-[10px] flex justify-between items-center z-50 border-b border-gray-200">
            <div className="brand text-[14px] font-md">Thirtysixstudio</div>
            <div className="links flex gap-10 ml-auto mr-[6.065rem]">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-[14.3px] font-light tracking-[-0.005em]"
                >
                  {link}
                </a>
              ))}
            </div>
            <button type="button">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle opacity="0.1" cx="15" cy="15" r="14.5" stroke="black"></circle>
                <path d="M11.9091 9V21M9 13.3636V16.6364M15 11.9091V18.0909M18.0909 10.4545V19.5455M21 13.3636V16.6364" stroke="black" strokeLinecap="round"></path>
              </svg>
            </button>
          </nav>
          <div className="textcontainer w-full px-8 py-12">
            <div className="text w-[360px] ml-[24.7%]">
              <h3 className="text-[34px] leading-[1.065] font-[300]">
                At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
              </h3>
              <p className="text-[13.75px] w-[345px] mt-8 font-light leading-[1.25]">
                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
              </p>
              <p className="text-md mt-7">Scroll</p>
            </div>
          </div>
          <div className="w-full mt-[9rem] px-[10px]">
            <h1
              ref={headingref}
              className="text-[16.5vw] font-normal tracking-tight leading-none pl-2 mb-[4rem]"
            >
              Thirtysixstudio
            </h1>
            <div className="border-b border-gray-200 w-full m-0"></div>
          </div>
        </div>

        {showCanvas && 
          data[1].map((canvasdets, i) => (
            <Canvas 
              key={i} 
              details={canvasdets}
            />
          ))
        }
        <div className="w-full relative z-[1] min-h-screen">
          <div className="w-full px-8 py-12">
            <div className="text w-[335px] ml-auto mr-[13.785rem]">
              <h3 className="text-[34px] leading-[1.065] font-[300]">
                We aim to elevate digital production in the advertising space, bringing your ideas to life.
              </h3>
              <p className="text-[13.75px] w-[340px] mt-[11.75rem] font-light leading-[1.25]">
                As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.
                <br /><br />
                Our commitment to innovation and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
