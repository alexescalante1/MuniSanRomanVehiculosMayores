// No cargar en dispositivos moviles, hacer un condicional con el width
$(document).ready(function () {
  particlesJS("particles-js", {
    particles: {
      color: "#1AC90C",
      shape: "circle", // "circle", "edge" or "triangle"
      opacity: 1,
      size: 6,
      size_random: true,
      nb: 150,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: "#1AC90C",
        opacity: 1,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600,
        },
      },
      anim: {
        enable: true,
        speed: 2,
      },
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 300,
      },
      detect_on: "canvas", // "canvas" or "window"
      mode: "grab",
      line_linked: {
        opacity: 0.5,
      },
      events: {
        onclick: {
          enable: true,
          mode: "push", // "push" or "remove"
          nb: 4,
        },
      },
    },
    /* Retina Display Support */
    retina_detect: true,
  });
});
