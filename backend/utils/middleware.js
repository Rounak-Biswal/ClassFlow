import respStructure from "./response.js"

export function validate(req, res, next) {
    console.log("inside validate");
    let formatResp = new respStructure()
    if (!req.body || Object.keys(req.body).length === 0) {
        formatResp.title = "Failure"
        formatResp.msg = "Request body is empty.."
        return res.status(400).json(formatResp);
    }
    let { brand, model, year, price, manufactured } = req.body

    if (
        validStr(brand) &&
        validStr(model) &&
        validInt(year) &&
        validInt(price) &&
        (manufactured === undefined || validDate(manufactured)))
        next()
    else {
        formatResp.title = "Failure"
        formatResp.msg = "One or more required fields are missing or invalid value.."
        return res.status(400).json(formatResp)
    }
}

export function validStr(s) {
    return (typeof s === "string" && s.trim().length > 0)
}

export function validInt(n) {
    return (Number.isFinite(Number(n)) && Number(n) >= 0)
}

export function validDate(d) {
    console.log("inside validDate");
    const date = new Date(d)
    const now = new Date()
    console.log("datetime : ", date.getTime);
    console.log("is NAN : ", isNaN(date.getTime));
    console.log("date <= now : ", date <= now);
    return !isNaN(date.getTime()) && date <= now
}