export class Item {
  reference: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  images: string[];

  constructor(reference: string, name: string, desc: string, price: number, quantity: number = 1, images: string[] = []) {
    this.reference = reference;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.quantity = quantity;
    this.images = images;
  }
}

export class Cart extends EventTarget {
  items: Item[];
  onUpdateCount: Event = new Event("cartUpdated", { bubbles: true, cancelable: false });

  constructor() {
    super();
    this.items = []
  }


  Get(): Cart {
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) as Cart : this;
    return Object.assign(new Cart(), cart);
  }

  static Get(): Cart {
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) as Cart : new Cart();
    return Object.assign(new Cart(), cart);
  }

  Save() {
    localStorage.setItem("cart", JSON.stringify(this));
  }

  ItemCount(): number {
    let res = 0;

    for (let item of this.items) {
      res += item.quantity;
    }

    return res;

  }

  findCartItemIndex(reference: string): number {
    return this.items.findIndex((el) => el.reference == reference);
  }

  PrixTotal(): number {
    let res = 0;

    for (let item of this.items) {
      res += item.price * item.quantity;
    }

    return res;
  }

  AddProduct(item: Item) {
    const index = this.findCartItemIndex(item.reference);

    if (index == -1) {
      this.items.push(item);
    } else {
      this.items[index].quantity++;
    }

    this.Save();
    this?.dispatchEvent(this?.onUpdateCount);
  }

  RemoveProduct(item: Item) {
    const index = this.findCartItemIndex(item.reference);

    if (index != -1) {
      const item = this.items[index];

      if (--item.quantity == 0) {
        this.items.splice(index, 1);
      }
    }

    this.Save();
    this?.dispatchEvent(this?.onUpdateCount);
  }
}

export let cart: Cart = new Cart();