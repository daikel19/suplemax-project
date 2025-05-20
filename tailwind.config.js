export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
   extend: {
  keyframes: {
    cartPulse: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
  },
  animation: {
    'cart-pulse': 'cartPulse 0.3s ease-in-out',
  },
}
},
  plugins: [],
}
