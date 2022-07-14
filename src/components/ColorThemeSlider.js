import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import createPersistedState from 'use-persisted-state';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const useColorSchemeState = createPersistedState('colorScheme');


export default function ColorThemeSlider() {
  const systemPrefersDark = useMediaQuery({query: '(prefers-color-scheme: dark)'});
  const [ prevTheme, setPrevTheme ] = useState(systemPrefersDark ? 'dark' : 'light');
  const [ activeTheme, setActiveTheme ] = useColorSchemeState();

  const colorThemes = {
    1: "sunrise",
    2: "light",
    3: "sunset",
    4: "night",
    5: "dark"
  }

  useEffect(() => {
    let timerId;
    if (timerId) {
      clearTimeout(timerId);
    }

    document.body.classList.add(activeTheme);

    if (activeTheme !== prevTheme) {
      const gradient = document.getElementById("gradient-background");
      gradient.classList.remove('gradient-background-on');
      document.body.classList.remove(prevTheme);
      timerId = setTimeout(() => {
        gradient.classList.add('gradient-background-on');
      }, 2000);
      
    }
  }, [activeTheme]);

  function getColorThemeKey(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
 const handleColorThemeChange = (theme) => {
  setActiveTheme(colorThemes[theme]);
 }

  return (
    <React.Fragment>
      <Slider
          className='color-theme-slider'
          value={getColorThemeKey(colorThemes, activeTheme)}
          min={1}
          max={5}
          step={1}
          onChange={(theme) => {
            setPrevTheme(activeTheme);
            handleColorThemeChange(theme);
          }}
          marks={colorThemes}
          included={false}
        />
    </React.Fragment>
      
  );
};