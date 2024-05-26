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
// const biologia = importImages(require.context('"../biologia"', false, /\.(png|jpe?g|svg)$/));

// Exporting the images as an object
export const images = {
    informatica,
    // biologia
};