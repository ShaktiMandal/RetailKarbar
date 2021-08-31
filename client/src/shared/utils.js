export const debounceWithPromise = (func, timeDelay) =>
{
    let delayTimer;
    return function(...args){
        clearTimeout(delayTimer);
        new Promise((resolve) => {
            delayTimer = setTimeout(() => {
               return resolve(func.apply(args));
            }, timeDelay) 
        });
    }
}

export function debounce(func, timeDelay)
{
    let delayTimer;
    return function(...args){
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => func.apply(args) , timeDelay) 
    };
}