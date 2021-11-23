import { createContext, FC, useCallback, useContext, useState } from "react";
import { getLogoProgressSvg } from "./LogoProgress";

type Context = {
  progress: number;
  setLogoProgress: (progress: number) => void;
};
const LogoContext = createContext<Context>({
  progress: 60,
  setLogoProgress: () => {},
});

export const useLogoContext = () => useContext(LogoContext);

export const LogoProvider: FC = (props) => {
  const [progress, setProgress] = useState(60);

  const setLogoProgress = useCallback((progress: number) => {
    setProgress(progress);
    const favEl: HTMLLinkElement | null = document.querySelector(
      'link[rel=icon][type="image/svg+xml"]'
    );
    const svg = getLogoProgressSvg({ progress, size: 64 });
    const encodedSvg = btoa(svg);
    if (favEl) {
      favEl.href = `data:image/svg+xml;base64,${encodedSvg}`;
    }
  }, []);

  return (
    <LogoContext.Provider value={{ progress, setLogoProgress }}>
      {props.children}
    </LogoContext.Provider>
  );
};
