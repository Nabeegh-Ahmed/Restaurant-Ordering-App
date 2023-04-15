export const errorParser = (err: any): string => {
    try {
        err = JSON.parse(err);
        return err[0].message;
    } catch (e) {
        return err
    }
};