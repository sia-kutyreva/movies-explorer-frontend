import { useState, useEffect } from 'react';

function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    function handleWidthChange() {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleWidthChange);

    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  return { width };

}

export default useViewportWidth;
