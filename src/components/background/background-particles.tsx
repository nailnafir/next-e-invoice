"use client";

import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { loadAll } from "@tsparticles/all";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const BackgroundParticles = () => {
  const { theme } = useTheme();
  
  const [init, setInit] = useState(false);

  const { backgroundColor, linksColor, particlesColor } = useMemo(() => {
    const themeColors = {
      light: {
        backgroundColor: "#F5F5F5FF",
        linksColor: "#181818FF",
        particlesColor: "#181818FF",
      },
      dark: {
        backgroundColor: "#181818FF",
        linksColor: "#F5F5F5FF",
        particlesColor: "#F5F5F5FF",
      },
    };
    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  }, [theme]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: backgroundColor,
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: particlesColor,
        },
        links: {
          color: linksColor,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 4,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [backgroundColor, linksColor, particlesColor]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default BackgroundParticles;