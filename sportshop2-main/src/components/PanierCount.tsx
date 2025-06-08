import { IonBadge, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Cart, cart } from '../back/cart';

interface AppState {
    itemCount: number;
}

class PanierCount extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            itemCount: 0
        };

        Cart.onUpdateCount = () => {
            this.setState({ itemCount: cart.Get().ItemCount() });
        }
    }

    componentDidMount() {

        this.setState({ itemCount: cart.Get().ItemCount() });
    }


    render() {
        const itemCount = this.state.itemCount;
        return (itemCount > 0 ? <IonBadge color="danger">{itemCount}</IonBadge> : null);
    };
}

export default PanierCount;