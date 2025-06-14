import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cart as cartIcon, cartOutline, cogSharp, ellipse, person, square, storefront, triangle } from 'ionicons/icons';

import Shop from './pages/shop';
import Panier from './pages/panier';
import Compte from './pages/compte';
import Product from "./pages/Product";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

import { Cart } from './back/cart';
import React from 'react';
import PanierCount from './components/PanierCount';

export const PanierUpdateEvent = new Event("cartUpdated")
class App extends React.Component<{}, { cartCount: number }> {
  private cart: Cart = Cart.Get();

  constructor(props: any) {
    super(props);
    this.state = { cartCount: this.cart.ItemCount() };
    document.dispatchEvent(PanierUpdateEvent); // Dispatch the event to initialize the cart count


  }

  
  componentDidMount() {
    document.addEventListener('cartUpdated', this.updateCartCount);
  }

  componentWillUnmount() {
    document.removeEventListener('cartUpdated', this.updateCartCount);
  }

  updateCartCount = () => {
    this.cart = Cart.Get(); // Refresh the cart instance to get the latest data
    this.setState({ cartCount: this.cart.ItemCount() });
    console.log("Cart count updated:", this.cart.ItemCount());
  };

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/shop">
                <Shop />
              </Route>
              <Route exact path="/panier">
                <Panier />
              </Route>
              <Route path="/compte">
                <Compte />
              </Route>
              <Route exact path="/">
                <Redirect to="/shop" />
              </Route>
              <Route>
                <RegisterPage />
              </Route>

              <Route path="/products/:id" component={Product} />
              <Route exact path="/login">
                <LoginPage />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="shop" href="/shop">
                <IonIcon aria-hidden="true" icon={storefront} />
                <IonLabel>Magasin</IonLabel>
              </IonTabButton>
              <IonTabButton tab="panier" href="/panier">
                <IonIcon aria-hidden="true" icon={cartIcon} />
                <IonLabel>Panier</IonLabel>
                <PanierCount />
              </IonTabButton>
              <IonTabButton tab="compte" href={"/compte"}>
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Compte</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp >
    );
  }
}

export default App;
