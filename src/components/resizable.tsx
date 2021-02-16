import React, { ReactElement, useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}): ReactElement => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 300);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 200,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
