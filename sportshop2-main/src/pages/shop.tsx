import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './shop.css';
import { create, storefront } from 'ionicons/icons';
import ShopItem from "../components/ShopItem";
import React from 'react';
import { createUser, getProducts } from "../back/API";
import { Item } from '../back/cart';
// let products = getProducts()

interface ShopState {
  error: any;
  isLoaded: boolean;
  items: Item[];
}

class Shop extends React.Component<{}, ShopState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    getProducts()
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle><IonIcon aria-hidden="true" icon={storefront} /> Magasin</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Magasin</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {items.map((item: Item) => (
                <div key={item.reference}>
                  <ShopItem item={item} />
                </div>
              ))}

              {items.length == 0 && <IonItem><IonLabel>Aucun produit disponible</IonLabel></IonItem>}

            </IonContent>
          </IonContent>
        </IonPage >
      );
    }
  }
};

export default Shop;
