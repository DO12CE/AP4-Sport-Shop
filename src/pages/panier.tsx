import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './panier.css';
import { cart, storefront } from 'ionicons/icons';
// import { use, useEffect, useState } from 'react';
// import { getProducts } from '../back/API';

const Panier: React.FC = () => {
  // let products = use(getProducts());

  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   // React advises to declare the async function directly inside useEffect
  //   async function getToken() {
  //     const data = await getProducts()
  //     setToken(data);
  //   };

  //   // You need to restrict it at some point
  //   // This is just dummy code and should be replaced by actual
  //   if (!token) {
  //     getToken();
  //   }
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonIcon aria-hidden="true" icon={cart} /> Panier</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>

            <IonTitle size="large">Tab 2</IonTitle>

          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Panier;
