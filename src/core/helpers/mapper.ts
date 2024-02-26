import { parseDate } from "./parseDate";
import { translatePriceType } from "./translate";

export function converToType<T>(obj: any | any[], targetType: new () => T): T | any{
    const createInstance = (target: any): T => {
        const newObject = new targetType();
        Object.keys(target).forEach(key => {
            if(target[key] instanceof Date){
                newObject[key] = parseDate(target[key]);
                return
            }
            if(key === "priceType"){
                const priceTypeTranslated = translatePriceType(target[key].priceType);
                newObject[key] = {
                    ...target[key],
                    priceType: priceTypeTranslated
                };
                return
            }
            newObject[key] = target[key];
        });
        return newObject;
    }
    if(Array.isArray(obj)){
        return obj.map((item: any) => createInstance(item));
    }
    return createInstance(obj);
}