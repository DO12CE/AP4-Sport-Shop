import { IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './panier.css';
import { cart as cartIcon, storefront } from 'ionicons/icons';
import { cart, Item } from '../back/cart';
import PanierItem from '../components/PanierItem';
import React from 'react';
// import { use, useEffect, useState } from 'react';
// import { getProducts } from '../back/API';

interface PanierState {
  error: any;
  isLoaded: boolean;
}

class Panier extends React.Component<{}, PanierState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  };

  render() {
    const _cart = cart.Get();

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle><IonIcon aria-hidden="true" icon={cartIcon} /> Panier</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Panier</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              {_cart.items.map(item => {
                return (
                  <PanierItem item={item} key={item.reference} />
                )
              })}
            </IonList>
          </IonContent>

        </IonContent>
      </IonPage>
    )
  }
}

export default Panier;
