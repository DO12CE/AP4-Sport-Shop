import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonNav } from "@ionic/react";
import Product from "../pages/Product";

import "./ShopItem.css";
import { cart, Item } from "../back/cart"

interface ContainerProps {
    item: Item;
}

const ShopItem: React.FC<ContainerProps> = ({ item }) => {
    return (
        <a href={"/products/" + item.reference} className="card">
            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>{item.name}</IonCardTitle>
                    <IonCardSubtitle>{item.reference}</IonCardSubtitle>
                    <IonCardSubtitle>{item.price}€</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>{item.desc}</IonCardContent>
            </IonCard>
        </a>
    );
};

export default ShopItem;
