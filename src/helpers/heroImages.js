// (path base, incluir subdirectorios)
const imagePath = require.context('../assets/heroes', true);

export const heroImages = ( idImage, extension ) => {
  // default podría no ser necesario
  return imagePath( `./${ idImage }.${ extension }` ).default;
}