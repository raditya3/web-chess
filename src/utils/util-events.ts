const progressElement = document.getElementById(
    'machine_progress_indicator'
) as HTMLProgressElement;
const UPDATE_PROGRESS_EVENT = 'update_progress';
export const setPercentage = (current: number, max: number) => {
    if (current < 0 || current > max) {
        throw new Error(`Invalid values ${current}/${max}`);
    }
    const progress$ = new CustomEvent(UPDATE_PROGRESS_EVENT, {
        detail: {
            max,
            current,
        },
        bubbles: true,
        cancelable: true,
        composed: false,
    });
    document.dispatchEvent(progress$);
};

document.addEventListener(UPDATE_PROGRESS_EVENT, (ev: CustomEvent) => {
    const { max, current } = ev.detail;
    const percentVal = Math.floor((current * 100) / max);
    progressElement.setAttribute('value', percentVal.toString());
});
