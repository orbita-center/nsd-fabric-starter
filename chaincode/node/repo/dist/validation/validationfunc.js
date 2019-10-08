"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationFunc {
    static stringIsValid(data, maxLen = -1) {
        if (!data || maxLen > 0 && data.length > maxLen)
            return false;
        return true;
    }
    static numberIsValid(data, maxLenToComma = -1, maxLenAfterComma = -1) {
        var splitData = data.toString().split(".");
        if (data == null || data == undefined || maxLenToComma > 0 && splitData[0].length > maxLenToComma
            || splitData.length == 2 && splitData[1].length > maxLenAfterComma) //maxLenAfterComma>0 && 
            return false;
        return true;
    }
}
exports.ValidationFunc = ValidationFunc;
//# sourceMappingURL=validationfunc.js.map