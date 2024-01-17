import { useCallback, useEffect, useState } from "react";
import {
  MOVIES_COLS_DESKTOP,
  MOVIES_COLS_TABLET,
  MOVIES_COLS_MOBILE,
  TABLET_SCREEN,
  MOBILE_SCREEN,
} from "../utils/constants";
export default function useScreenWidth() {
  const countColumns = useCallback((screenWidth) => {
    if (screenWidth >= TABLET_SCREEN) {
      return MOVIES_COLS_DESKTOP;
    } else if (screenWidth >= MOBILE_SCREEN && screenWidth < TABLET_SCREEN) {
      return MOVIES_COLS_TABLET;
    } else if (screenWidth < MOBILE_SCREEN) {
      return MOVIES_COLS_MOBILE;
    }
  }, []);
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [columnsCount, setColumnsCount] = useState(
    countColumns(getScreenWidth())
  );
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    }
    window.addEventListener("resize", resizeController, false);

    let resizeTimer;

    function resizeController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleScreenResize();
        }, 1000);
      }
    }

    return () => window.removeEventListener("resize", handleScreenResize);
  }, [getScreenWidth]);

  useEffect(() => {
    setColumnsCount(countColumns(screenWidth));
  }, [countColumns, screenWidth]);
  return { screenWidth, columnsCount };
}
