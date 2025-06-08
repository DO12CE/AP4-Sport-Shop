import { IonContent, IonList, IonLoading, IonItem, IonLabel, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAlert, IonInput } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './compte.css';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteUser, updateUser } from '../back/API';

type User = {
  id_user: string;
  login: string;
  name: string;
  surname: string;
  address: string;
  zip: string;
  city: string;
};

const Compte: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    // Récupère l'utilisateur depuis le localStorage (après login)
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      // Redirige vers /login si pas connecté
      history.replace("/login");
    }
  }, [history]);

  const handleModifyField = () => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (editUser) {
      // Appel API pour mettre à jour côté serveur
      try {
        // Ajoute ici l'id de l'utilisateur si besoin (ex: user.id_user)
        await updateUser((user as any).id_user, editUser);
        setUser(editUser);
        localStorage.setItem("user", JSON.stringify(editUser));
        setIsEditing(false);
      } catch (e) {
        // Optionnel : afficher une erreur
        console.error("Erreur lors de la mise à jour du profil :", e);
      }
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    if (!user) return;
    setIsLoading(true);
    try {
      await deleteUser(user.id_user); 
    } catch (e) {
      // Optionnel : afficher une erreur
      console.error("Erreur lors de la suppression du compte :", e);
    }
    setIsLoading(false);
    localStorage.removeItem("user");
    history.replace("/login");
  };

  const handleDisconnect = (): void => {
    localStorage.removeItem("user"); 
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="compte-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Compte</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Compte page" />
        <IonLoading isOpen={isLoading} message="Chargement..." />

        {isEditing && editUser ? (
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Pseudo</IonLabel>
              <IonInput value={editUser.login} onIonChange={e => setEditUser({ ...editUser, login: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Nom</IonLabel>
              <IonInput value={editUser.name} onIonChange={e => setEditUser({ ...editUser, name: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Prénom</IonLabel>
              <IonInput value={editUser.surname} onIonChange={e => setEditUser({ ...editUser, surname: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Adresse</IonLabel>
              <IonInput value={editUser.address} onIonChange={e => setEditUser({ ...editUser, address: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Code postal</IonLabel>
              <IonInput value={editUser.zip} onIonChange={e => setEditUser({ ...editUser, zip: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Ville</IonLabel>
              <IonInput value={editUser.city} onIonChange={e => setEditUser({ ...editUser, city: e.detail.value! })} />
            </IonItem>
            <IonButton expand="block" onClick={handleSaveEdit} className="ion-margin-top">Enregistrer</IonButton>
            <IonButton expand="block" color="medium" onClick={() => setIsEditing(false)} className="ion-margin-top">Annuler</IonButton>
          </IonList>
        ) : user && (
          <IonList>
            <IonItem>
              <IonLabel>
                <h3>Pseudo</h3>
                <p>{user.login}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Nom</h3>
                <p>{user.name}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Prénom</h3>
                <p>{user.surname}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Adresse</h3>
                <p>{user.address}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Code postal</h3>
                <p>{user.zip}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Ville</h3>
                <p>{user.city}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3>Mot de passe</h3>
                <p>••••••••</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}

        <IonGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center ion-text-center">
            <IonCol size="12" size-sm="3">
              <IonButton
                onClick={handleModifyField}
                className="ion-margin"
              >
                Modifier mes informations
              </IonButton>
            </IonCol>
            <IonCol size="12" size-sm="3">
              <IonButton
                color="secondary"
                id='deco-alert'
                className="ion-margin"
              >
                Me déconnecter
              </IonButton>
            </IonCol>
            <IonCol size="12" size-sm="3">
              <IonButton
                color="danger"
                fill="outline"
                id='suppr-alert'
                className="ion-margin"
              >
                Supprimer mon compte
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          header="Suppression de compte"
          subHeader="Êtes-vous sûr de vouloir supprimer votre compte ?"
          message="Cette action est irréversible et supprimera toutes vos données."
          trigger="suppr-alert"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                console.log('suppr canceled');
              },
            },
            {
              text: 'Supprimer',
              role: 'confirm',
              handler: () => {
                console.log('suppression confirmed');
                handleDeleteAccount()
              },
            },
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>

        <IonAlert
          header="Deconnexion"
          subHeader="Êtes-vous sûr de vouloir vous déconnecter ?"
          trigger="deco-alert"
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                console.log('déconnexion canceled');
              },
            },
            {
              text: 'Me déconnecter',
              role: 'confirm',
              handler: () => {
                console.log('déconnexion confirmed');
                handleDisconnect();
              },
            },
          ]}
          onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        ></IonAlert>
      </IonContent>
    </IonPage >
  );
};

export default Compte;