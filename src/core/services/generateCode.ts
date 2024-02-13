export const generateSaleCode = (length: number) => {
    return length.toString().padStart(6, '0');
}