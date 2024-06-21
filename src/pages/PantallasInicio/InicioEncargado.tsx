import React from 'react';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonIcon, IonList, IonSelect, IonSelectOption, IonPage, IonThumbnail } from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

const InicioEncargado: React.FC = () => {
  const history = useHistory();

  const handleIconClick = (incidencia: number) => {
    history.push(`/incidencia/${incidencia}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Asignar Incidencias</IonTitle>
          <IonItem slot="end">
            <IonLabel>Roles: </IonLabel>
            <IonSelect placeholder="">
              <IonSelectOption value="admin">Admin</IonSelectOption>
              <IonSelectOption value="user">User</IonSelectOption>
              <IonSelectOption value="guest">Guest</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pendientes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
              <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                <IonLabel>INCIDENCIA 1: Reparación de tubo</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(1)} />
              </IonItem>
              <IonItem>
              <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                <IonLabel>INCIDENCIA 2: Corte de árbol</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(2)} />
              </IonItem>
              <IonItem>
              <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                <IonLabel>INCIDENCIA 3: Revisión computador</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(3)} />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonCard>

          <IonCardHeader>
            <IonCardTitle>Asignadas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
              <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                <IonLabel>INCIDENCIA 4: Revisión infraestructura</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(4)} />
              </IonItem>
              <IonItem>
              <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                  />
                </IonThumbnail>
                <IonLabel>INCIDENCIA 3: Revisión infraestructura</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(5)} />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        
      </IonContent>
    </IonPage>
  );
};
export default InicioEncargado;
