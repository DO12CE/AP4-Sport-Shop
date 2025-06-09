import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonNav, IonRow } from "@ionic/react";
import "./PanierItem.css";
import { Cart, Item } from "../back/cart"
import { addCircleOutline, car, removeCircleOutline } from "ionicons/icons";
interface ContainerProps {
    item: Item;
}

const PanierItem: React.FC<ContainerProps> = ({ item }) => {

    const cart = Cart.Get();

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
                        <IonRow>
                            <IonCol size="6">
                                <IonButton expand="block" fill="clear" color="danger" onClick={() => {
                                    console.log("reduire", item.reference);
                                    cart.RemoveProduct(item);
                                }
                                }><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton expand="block" fill="clear" color="success" onClick={() => {
                                    console.log("ajouter", item.reference);
                                    cart.AddProduct(item);
                                }
                                }><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid >
        </IonItem >
    );
};

export default PanierItem;
