export const delay = async (millis: number): Promise<null> => {
    return new Promise((res) => setTimeout(res, millis));
};
