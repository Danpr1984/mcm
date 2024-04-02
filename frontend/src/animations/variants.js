export const staggeredFadeUp = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.15,
      opacity: {
        duration: 0.3,
      },
    },
  }),
};
