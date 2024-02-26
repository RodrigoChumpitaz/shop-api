enum Translate {
    unit = "Por Unidad",
    weight = "Peso"
}

export function translatePriceType(value: string): string{
    return Translate[value] || value;
}