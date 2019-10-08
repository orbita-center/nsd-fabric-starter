

export  class ValidationFunc {
    public static stringIsValid(data:string,maxLen=-1): boolean{
        if(!data || maxLen>0 && data.length>maxLen)
            return false;
        return true;
    }

    public static numberIsValid(data:number,maxLenToComma=-1,maxLenAfterComma=-1): boolean{
        var splitData = data.toString().split(".");
        if(data == null || data == undefined || maxLenToComma>0 && splitData[0].length>maxLenToComma 
            || splitData.length==2 && splitData[1].length>maxLenAfterComma )//maxLenAfterComma>0 && 
            return false;
        return true;
    }
}
