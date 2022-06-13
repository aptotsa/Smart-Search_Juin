import { RefObject, useEffect } from "react";

export const useInfiniteScroll = (
  elementRef: RefObject<HTMLElement>,
  callBack: () => void,
  pixelGap?: number
) => {
  const resetScroll = () => {
    const element = elementRef.current;
    if (element) {
      element.scrollTo(0, 0);
    }
  };

  const handleScroll = () => {
    const element = elementRef.current;
    if (element) {
      const { clientHeight, scrollTop, scrollHeight } = element;
      if (clientHeight + scrollTop >= scrollHeight - (pixelGap || 0)) {
        callBack();
      }
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [elementRef.current, handleScroll]);

  return { resetScroll };
};
