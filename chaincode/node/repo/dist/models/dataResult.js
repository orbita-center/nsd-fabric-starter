"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataResult {
    withError(er) {
        this.error = er;
        this.isSuccess = false;
    }
    withData(res) {
        this.isSuccess = true;
        this.data = res;
    }
}
exports.DataResult = DataResult;
//# sourceMappingURL=dataResult.js.map