import { useState, useEffect, useRef } from "react";
import theBirds from "/imgs/the-birds.svg";
import steadyBird from "/imgs/steady-bird.svg";
import tree from "/imgs/tree.svg";
import palm from "/imgs/palm.svg";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";

import "./App.scss";

function App() {
  const windowWidth = useRef(window.innerWidth);
  const [bird, setBird] = useState(steadyBird);
  const [birdDir, setBirdDir] = useState("forward");
  let lastStop = 0;

  useEffect(() => {
    const onScroll = () => {
      setBird(window.pageYOffset > 0 ? theBirds : steadyBird);

      if (window.scrollY > lastStop && window.pageYOffset > 0) {
        setBirdDir("forward");
      } else {
        setBirdDir("back");
      }

      lastStop = window.scrollY;
    };

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  console.log(windowWidth);
  return (
    <>
      <Controller>
        {/* <div className="spacer"></div> */}
        <Scene duration={3000} triggerHook="onLeave">
          <Timeline wrapper={<div className="spacer"></div>}>
            <div className="parallax">
              <Tween
                position={0}
                from={{ left: "0px" }}
                to={{ left: `-200px` }}
              >
                <div className={`level level--bg`}></div>
              </Tween>
              <Tween
                position={0}
                from={{ left: "0px" }}
                to={{ left: `-1000px` }}
              >
                <div className={`level level--mountain`}></div>
              </Tween>
              <Tween
                position={0}
                from={{ left: "0px" }}
                to={{ left: `-${4274.14 - windowWidth.current}px` }}
              >
                <div className={`level`}>
                  <img
                    src={tree}
                    alt="a running party corgi"
                    className={`tree`}
                  />
                </div>
              </Tween>
              <Tween
			  	position={0}
                from={{ left: "126px" }}
                to={{ left: `120%` }}
              >
                <div className="container">
                  <img
                    src={bird}
                    alt="a running party corgi"
                    className={`bird ${birdDir}`}
                  />
                </div>
              </Tween>
              <Tween
                position={0}
                from={{ left: "-100px" }}
                to={{ left: `-${4274.14 - windowWidth.current}px` }}
              >
                <div className={`level level--grass`}>
                  <img
                    src={palm}
                    alt="a running party corgi"
                    className={`palm`}
                  />
                </div>
              </Tween>
            </div>
          </Timeline>
        </Scene>
      </Controller>
    </>
  );
}

export default App;
