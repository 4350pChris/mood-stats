module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./src/**/*.svelte", "./public/*.html"],
  theme: {
    extend: {},
    spinner: (theme) => ({
      default: {
        color: theme('colors.blue.500', 'blue'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      md: {
        color: theme('colors.blue.500', 'blue'), // color you want to make the spinner
        size: '2em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      lg: {
        color: theme('colors.blue.500', 'blue'), // color you want to make the spinner
        size: '4em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      xl: {
        color: theme('colors.blue.500', 'blue'), // color you want to make the spinner
        size: '6em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      }
    }),
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-spinner')]
};