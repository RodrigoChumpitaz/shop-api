export const getSlug = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 11; i++) {
        const char = characters.charAt(Math.floor(Math.random() * charactersLength));
        if (i % 2 === 0) {
            result += char.toUpperCase();
        } else {
            result += char.toLowerCase();
        }
    }
    return result;
}