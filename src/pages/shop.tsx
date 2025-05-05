import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './shop.css';
import { storefront } from 'ionicons/icons';
import ShopItem from "../components/ShopItem";
// import { getProducts } from "../back/API";
// let products = getProducts()

const Shop: React.FC = () => {
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
          {/* {products} */}

          <ShopItem ItemID="2" />
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Shop;
