import { Milk } from "types";

export const standardReturn = (datas: Milk[]) => {
    return {
        count: datas.length,
        results: datas
    }
}

export const standardResponseWithPagination = (datas: Milk[], page=1) => {
    const responseData = datas.slice((page - 1) * 9 , (page - 1) * 9 + 9);
    // Should I add a check to see if page is out of bounds?
    // Should I return current page and total pages?
    return {
        count: datas.length,
        page: page,
        results: responseData
    }
}

