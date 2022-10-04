const imageCache: { [key: string]: HTMLImageElement } = {};
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
        import(`../../assets/pieces/${color}/${name}.png`).then((im) => {
            img.src = im.default;
        });
    });
    return res;
};
