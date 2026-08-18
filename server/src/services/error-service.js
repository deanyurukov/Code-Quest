export const getErrorMessage = (err) => {
    switch (err.name) {
        case 'ValidationError':
            return Object.values(err.errors).at(0).message;
            break;
        default:
            return err.message;
            break;
    }
}