import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonNav } from "@ionic/react";
import Product from "../pages/Product";

import "./ShopItem.css";
import { cart, Item } from "../back/cart"

interface ContainerProps {
    ItemID: string;
}

const ShopItem: React.FC<ContainerProps> = ({ ItemID }) => {
    return (
        <a href={"/products/" + ItemID} className="card">
            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>{ItemID}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
        </a>
    );
};

export default ShopItem;
