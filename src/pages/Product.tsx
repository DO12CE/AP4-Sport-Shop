import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Product.css';
import { cart } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';

interface ProductDetailProps
    extends RouteComponentProps<{
        id: string;
    }> { }

const Product: React.FC<ProductDetailProps> = ({ match }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><IonIcon aria-hidden="true" icon={cart} /> Product</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {match.params.id}

                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Product;
