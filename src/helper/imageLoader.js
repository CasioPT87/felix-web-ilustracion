// Helper function to import all images from a folder
const importImages = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

// Importing images from all folders
const informatica = importImages(require.context('../static/informatica', false, /\.(png|jpe?g|svg)$/));
const biologia = importImages(require.context('../static/biologia', false, /\.(png|jpe?g|svg)$/));
const fisicayquimica = importImages(require.context('../static/fisicayquimica', false, /\.(png|jpe?g|svg)$/));
const geografiaehistoria = importImages(require.context('../static/geografiaehistoria', false, /\.(png|jpe?g|svg)$/));
const geologia = importImages(require.context('../static/geologia', false, /\.(png|jpe?g|svg)$/));
const otros = importImages(require.context('../static/otros', false, /\.(png|jpe?g|svg)$/));
const tecnologia = importImages(require.context('../static/tecnologia', false, /\.(png|jpe?g|svg)$/));
const portada = importImages(require.context('../static/portada', false, /\.(png|jpe?g|svg)$/));
const ilustraciones = importImages(require.context('../static/ilustraciones', false, /\.(png|jpe?g|svg)$/));
const videosPortada = importImages(require.context('../static/videosPortada', false, /\.(png|jpe?g|svg)$/));


// Exporting the images as an object
export const images = {
    informatica,
    biologia,
    fisicayquimica,
    geografiaehistoria,
    geologia,
    otros,
    tecnologia,
    portada,
    ilustraciones,
    videosPortada
};