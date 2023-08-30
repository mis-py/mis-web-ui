module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // theme: {
  //   extend: {
  //     colors: {
        // 'blue': '#1fb6ff',
        // 'purple': '#7e5bef',
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'yellow': '#ffc82c',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
        // 'white': '#FFFFFF',
        // 'backGround': '#FFFFFF',
        // 'primary': '#FFFFFF',
    //   }
    // },
    // fontFamily: {
    //   ubuntu: ["Ubuntu", "sans-serif"],
    // },
    // colors: {
    //   primary: "#1A69DF",
    //   danger: "#F6222E",
    //   warning: "#FBAD15",
    //   success: "#53C41A",
    //   black: "#000000",
    //   white: "#FFFFFF",
    //   focused: "#4A8FF7",
    //   active: "#1255B8",
    //   disabled: "#ADCEFF",
    //   hover: "#4A8FF7",
    //   dangerEasy: "#FF7C84",
    //   warningEasy: "#FFCD6A",
    //   successEasy: "#A3E980",
    //   blackSecond: "#1D1D1D",
    //   gray: "#757575",
    //   backGround: "#2D2D2D",
    //   transparent: "transparent",
  //   },
  // },
  theme: {
    extend: {
      boxShadow: {
        "mis-1": '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 32px rgba(17, 17, 26, 0.05);',
        "mis-tl-1": '0px 4px 16px rgba(17, 17, 26, 0.1) inset, 0px 8px 32px rgba(17, 17, 26, 0.05) inset;',
      },
      flex: {
        '5': '5 0',
        '3': '3 0'
      }
    }
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("@tailwindcss/forms"), require('daisyui')],
};
