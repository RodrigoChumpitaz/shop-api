export function converToType<T>(obj: any | any[], targetType: new () => T): T | any{
    const newObject = new targetType();
    if(obj instanceof Array){
        return obj.map((item: any) => {
            Object.keys(item).forEach(key => {
                newObject[key] = item[key];
            });
            return newObject;
        });
    }
    Object.keys(obj).forEach(key => {
        newObject[key] = obj[key];
    });
    return newObject;
}