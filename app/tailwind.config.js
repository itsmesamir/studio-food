module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true, // Centers the container horizontally
      margin: {
        DEFAULT: "0rem", // Default padding
        sm: "2rem", // Padding for small screens and up
        md: "4rem", // Padding for medium screens and up
        lg: "6rem", // Padding for large screens and up
        xl: "8rem", // Padding for extra-large screens and up
      },
      screens: {
        // Optionally, define custom breakpoints
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      // You can extend other theme properties here
      colors: {
        breakfast: "#FFD700", // Gold
        lunch: "#FF6347", // Tomato
        dinner: "#4682B4", // SteelBlue
        "midnight-snack": "#2E8B57", // SeaGreen
      },
    },
  },
  variants: {},
  plugins: [],
};
