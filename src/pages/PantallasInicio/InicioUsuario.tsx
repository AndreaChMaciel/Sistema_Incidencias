import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonList,
  IonIcon,
  IonCardContent,
  IonFabButton,
  IonFab,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { add, createOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const InicioUsuario: React.FC = () => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = (incidencia: number) => {
    history.push(`/incidencia/${incidencia}`);
  };

  const confirm = () => {
    modal.current?.dismiss(input.current?.value, 'confirm');
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Incidencias</IonTitle>
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

        {/* Pendientes */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pendientes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>INCIDENCIA 1: Reparación de tubo</IonLabel>
                <IonLabel slot="end">Estado...</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>INCIDENCIA 2: Corte de árbol</IonLabel>
                <IonLabel slot="end">Estado...</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>INCIDENCIA 3: Revisión computador</IonLabel>
                <IonLabel slot="end">Estado...</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Reparadas */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Reparadas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>INCIDENCIA 4: Revisión infraestructura</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(4)} />
              </IonItem>
              <IonItem>
                <IonLabel>INCIDENCIA 3: Revisión infraestructura</IonLabel>
                <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(5)} />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
    
        
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => setIsOpen(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonModal isOpen={isOpen} ref={modal} onWillDismiss={(ev) => onWillDismiss(ev)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Welcome</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonInput
              label="Enter your name"
              labelPlacement="stacked"
              ref={input}
              type="text"
              placeholder="Your name"
            />
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default InicioUsuario;
