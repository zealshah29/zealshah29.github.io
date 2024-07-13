import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type AndroidMenuBlogType = {
  className?: string;
  onClose?: () => void;
};

const AndroidMenuBlog: FunctionComponent<AndroidMenuBlogType> = ({
  className = "",
  onClose,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onHOMETextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onWORKTextClick = useCallback(() => {
    navigate("/work");
  }, [navigate]);

  return (
    <div
      className={`w-[360px] h-full relative bg-white overflow-hidden [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-right] opacity-[0] max-w-[90%] text-center text-lg text-black font-nunito ${className}`}
      data-animate-on-scroll
    >
      <div className="absolute top-[61px] left-[121px] w-[117px] h-[116px] text-51xl font-cinzel-decorative">
        <b className="absolute h-[77.41%] w-[38.72%] top-[11.47%] left-[22.99%] inline-block">
          Z
        </b>
      </div>
      <div className="absolute top-[177px] left-[103px] text-5xl tracking-[0.1em] leading-[40px] font-semibold font-nunito-sans">
        ZEAL SHAH
      </div>
      <div
        className="absolute top-[286px] left-[152px] cursor-pointer"
        onClick={onHOMETextClick}
      >
        HOME
      </div>
      <div
        className="absolute top-[364px] left-[151px] cursor-pointer"
        onClick={onWORKTextClick}
      >
        WORK
      </div>
      <b className="absolute top-[442px] left-[154px]">BLOG</b>
    </div>
  );
};

export default AndroidMenuBlog;
