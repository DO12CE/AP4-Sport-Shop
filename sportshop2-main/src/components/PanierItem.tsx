import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonNav, IonRow } from "@ionic/react";

import "./PanierItem.css";
import { Item } from "../back/cart"

interface ContainerProps {
    item: Item;
}

const PanierItem: React.FC<ContainerProps> = ({ item }) => {
    return (
        <IonItem>
            <IonGrid>
                <IonRow>
                    <IonCol offset-sm="2">
                        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                    </IonCol>
                    <IonCol class="ion-align-items-stretch">
                        <IonRow>
                            <IonLabel>
                                <IonCardTitle>{item.name}</IonCardTitle>
                                <p>
                                    {item.desc}
                                </p>
                            </IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonCardSubtitle>Prix unitaire</IonCardSubtitle>
                                <p>{item.price} €</p>
                            </IonCol>
                            <IonCol size="6">
                                <IonCardSubtitle>Quantité</IonCardSubtitle>
                                <p>{item.quantity}</p>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid >
        </IonItem >
    );
};

export default PanierItem;
