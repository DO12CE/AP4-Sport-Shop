import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Product.css';
import { cart as cartIcon } from 'ionicons/icons';
import { Cart, Item } from '../back/cart';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../back/API';



export default function Product(props: any) {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Item>(new Item("", "", "", 0, 0));
    const cart = Cart.Get();

    useEffect(() => {
        getProduct(id).then((data) => {
            setProduct(data);
        }).catch((error) => {
            console.error("Error fetching product:", error);
        });
    }, [id]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><IonIcon aria-hidden="true" icon={cartIcon} /> Product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <h1>{product?.name}</h1>
                    <p>{product?.desc}</p>
                    <p>Price: {product?.price}€</p>

                    <IonButton onClick={() => {
                        cart.AddProduct(product ? new Item(product.reference, product.name, product.desc, product.price, 1) : new Item("", "", "", 0, 0));
                        console.log(cart.Get())
                    }}>Add to Cart</IonButton>
                </IonContent>
            </IonContent>
        </IonPage >
    );
}

