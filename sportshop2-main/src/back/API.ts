import { body } from "ionicons/icons";
import { Item } from "./cart";
import { genSalt, hash, compare } from 'bcryptjs';

const passwordSettings = {
    saltRounds: 12
}

const primaryAddress = "https://sportappi.enzomtp.party/api/";
const fallbackAddress = "http://localhost:3311/api/"; // l'API WAMP locale

async function Get(path: string): Promise<any> {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        },
    };

    try {
        const res = await fetch(primaryAddress + path, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Primary API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Primary API invalid JSON");
        }
    } catch (e) {
        console.warn("Primary API failed, trying fallback:", e);

        const res = await fetch(fallbackAddress + path, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Primary API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Fallback API invalid JSON");
        }
    }
}

async function Post(path: string, body: any): Promise<any> {

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify(body)
    };

    try {
        const res = await fetch(primaryAddress + path, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Primary API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Primary API invalid JSON");
        }
    } catch (e) {
        console.warn("Primary API failed, trying fallback:", e);

        const res = await fetch(fallbackAddress + path, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Primary API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Fallback API invalid JSON");
        }
    }
}

//#region PRODUCTS
export async function getProducts(): Promise<Item[]> {
    let data = await Get("products")

    let items: Item[] = []

    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].reference, data[i].name, data[i].desc, data[i].price, data[i].quantity)

        let img = await getProductImages(data[i].reference);
        item.images = img;

        items.push(item)
    }
    console.log(items)
    return items
}

export async function getProduct(id: string): Promise<Item> {
    let product = await Get("products/" + id)
    let images = await getProductImages(id);

    let item = new Item(product.reference, product.name, product.desc, product.price, product.quantity, images);

    return item;
}

export async function getProductsCount(): Promise<number> {
    let products = await Get("products")
    return products.length;
}

export async function getProductImages(id: string) {
    let images = await Get("products/" + id + "/images")

    if (images === null || images.length === 0) {
        images = ["https://ionicframework.com/docs/img/demos/card-media.png"];
    }
    else {
        images = images.map((el: any) => el.name);
    }

    return images;
}

//#endregion PRODUCTS

//#region USER
export async function getUsers() {
    return await Get("users")
}

export async function getUser(id: number) {
    return await Get("users/" + id)
}

export async function createUser(name: string, surname: string, address: string, zip: string, city: string, password: string, login: string) {

    const salt = await genSalt(passwordSettings.saltRounds)
    password = await hash(password, salt);

    let body = {
        name: name,
        surname: surname,
        address: address,
        zip: zip,
        city: city,
        password: password,
        login: login
    }

    return await Post("users", body)
}

export function getUserLogin(login: string) {
    return Get("users/login/" + login)
}

export async function Login(login: string, password: string): Promise<boolean> {
    let user = await getUserLogin(login);

    if (user === null) {
        return false;
    }

    let isValid = await compare(password, user.password);
    if (!isValid) {
        console.log("Invalid password");
        return false;
    }

    localStorage.setItem("user", JSON.stringify(user));
    return true;
}
export async function deleteUser(id: string) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        }
    };

    try {
        const res = await fetch(primaryAddress + "users/" + id, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Primary API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Primary API invalid JSON");
        }
    } catch (e) {
        console.warn("Primary API failed, trying fallback:", e);

        const res = await fetch(fallbackAddress + "users/" + id, options);

        if (res.status === 401) {
            throw new Error("Unauthorized access. Please check your API key.");
        }
        else if (!res.ok) throw new Error("Fallback API failed: " + res.status);

        try {
            return await res.json();
        } catch (jsonErr) {
            throw new Error("Fallback API invalid JSON");
        }
    }
}

export async function updateUser(id: number, userData: any) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify(userData)
    };

}

//#endregion USER

//#region ORDERS
export async function getOrder(id: number) {
    return await Get("orders/" + id)
}

export async function createOrder(delivery_address: string, price: number, id_user: string, products: Item[]) {
    let body = {
        delivery_address: delivery_address,
        price: price,
        id_user: id_user,
        products: products.map(item => ({
            reference: item.reference,
            quantity: item.quantity,
        }))
    }

    return await Post("orders", body)
}
//#endregion ORDERS