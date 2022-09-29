export const assertPositionBounds = (position: [number, number]) => {
    if (position[0] > 7 || position[0] < 0) {
        throw new Error(`Invalid Position ${position}`);
    }
    if (position[1] > 7 || position[1] < 0) {
        throw new Error(`Invalid Position ${position}`);
    }
};
