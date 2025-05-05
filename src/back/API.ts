import { Item } from "./cart";

const address = "https://sportappi.enzomtp.party/api/";

async function Get(path: string) {
    const json = await fetch(address + path);
    return JSON.parse(await json.json())
}

//#region PRODUCTS
export async function getProducts() {
    return await Get("products")
}

export async function getProduct(id: number) {
    return await Get("products/" + id)
}
//#endregion PRODUCTS

//#region USER
export async function getUsers() {
    return await Get("users")
}

export async function getUser(id: number) {
    return await Get("users/" + id)
}
//#endregion USER

//#region PRODUCTS
export async function getOrders() {
    return await Get("orders")
}

export async function getOrder(id: number) {
    return await Get("orders/" + id)
}
//#endregion PRODUCTS