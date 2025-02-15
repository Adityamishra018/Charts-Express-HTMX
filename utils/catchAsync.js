export function catchAsync(fn) {
    return async function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    };
}