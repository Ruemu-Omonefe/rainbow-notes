import { useEffect, useState } from "react";
import style from "../styles/footer.module.css";

function Footer() {
  const [count, setCount] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 468) {
        setCount(10);
      } else if (window.innerWidth < 768) {
        setCount(20);
      } else if (window.innerWidth < 1200) {
        setCount(30);
      } else {
        setCount(40);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
     <div className=" h-1.5 mb-0.5" style={{
          background: "linear-gradient(90deg,#ff4f31 0%,#f5a620 20%,#7ed950 35%,#38c9b0 50%,#60b8ff 65%,#7b72f0 80%,#ff7eb3 100%)"
        }} />
      <div className={style.foot }>
        <div className={style.curve}>
          {[...Array(count)].map((_, index) => (
            <div key={index} className={style.c}></div>
          ))}
        </div>
        <footer className=" px-5 pb-5 pt-2">
          <div className={style.main}>
            <p className="text-white text-center text-xs">
              Copyright © 2025 by Rainbow | All Right Reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
