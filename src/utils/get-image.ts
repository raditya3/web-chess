const imageCache: { [key: string]: HTMLImageElement } = {};
const images = require.context('../../assets/pieces', true);
export const getImage = (
    color: 'black' | 'white',
    name: string
): Promise<HTMLImageElement> => {
    if (imageCache[`${color}_${name}`]) {
        return new Promise((resolve) => {
            resolve(imageCache[`${color}_${name}`]);
        });
    }

    const res: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache[`${color}_${name}`] = img;
            resolve(img);
        };
        img.onerror = () => reject(new Error(`Failed to load ${img.src}`));
        img.src = images(`./${color}/${name}.png`).default;
    });
    return res;
};
