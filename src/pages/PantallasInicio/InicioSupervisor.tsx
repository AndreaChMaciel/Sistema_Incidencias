import React from 'react';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonIcon, IonList, IonSelect, IonSelectOption, IonPage, IonThumbnail, IonButton } from '@ionic/react';
import { createOutline, logOutOutline } from 'ionicons/icons';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

const InicioSupervisor: React.FC = () => {
  const history = useHistory();

  const handleIconClick = (incidencia: number) => {
    history.push(`/incidencia/${incidencia}`);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      history.push('/login'); // Redirige a la página de inicio de sesión o la página principal
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Incidencias</IonTitle>
          
          <IonItem slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Revisar</IonCardTitle>
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
            <IonCardTitle>Cerradas</IonCardTitle>
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
export default InicioSupervisor;
