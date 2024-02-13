export function converToType<T>(obj: any | any[], targetType: new () => T): T | any{
    const createInstance = (targe: any): T => {
        const newObject = new targetType();
        Object.keys(targe).forEach(key => {
            newObject[key] = targe[key];
        });
        return newObject;
    }
    if(Array.isArray(obj)){
        return obj.map((item: any) => createInstance(item));
    }
    return createInstance(obj);
}