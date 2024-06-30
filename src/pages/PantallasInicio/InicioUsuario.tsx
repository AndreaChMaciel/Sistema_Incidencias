import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardTitle, IonCardHeader, IonList, IonIcon, IonCardContent, IonFabButton, IonFab, IonModal, IonButtons, IonButton, IonInput } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core';
import { add, createOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import RegistraIncidencia from '../Incidencias/RegistraIncidencia';
import axios from 'axios';

const InicioUsuario: React.FC = () => {
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);

  const [message, setMessage] = useState('This modal example uses triggers to automatically open a modal when the button is clicked.');
  const [roles, setRoles] = useState<string[]>([]); // Estado para almacenar los roles del usuario
  const [selectedRole, setSelectedRole] = useState<string>(''); // Estado para almacenar el rol seleccionado
  const [incidenciasPendientes, setIncidenciasPendientes] = useState<any[]>([]); // Estado para almacenar las incidencias pendientes
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Cargar los roles del usuario al montar el componente
    fetchRoles();
    // Cargar las incidencias pendientes del usuario al montar el componente
    fetchIncidenciasPendientes();
  }, []);

  const fetchRoles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/roles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchIncidenciasPendientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/incidencias-usuario', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        // params: {
        //   cn_id_estado: 0 // Filtrar por incidencias en estado 0
        // }
      });
      setIncidenciasPendientes(response.data);
    } catch (error) {
      console.error('Error obteniendo incidencias pendientes:', error);
    }
  };

  const handleIconClick = (incidencia: number) => {
    history.push(`/incidencia/${incidencia}`);
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  };

  const handleRoleChange = (event: CustomEvent) => {
    setSelectedRole(event.detail.value);
    // Aquí puedes realizar acciones adicionales cuando se cambie el rol seleccionado
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
          <IonTitle>Incidencias</IonTitle>
         
          <IonItem slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonButton>
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
      {incidenciasPendientes.map((incidencia, index) => (
        <IonItem key={index}>
          <IonLabel>{`INCIDENCIA ${incidencia.cn_incidencia}: ${incidencia.titulo}`}</IonLabel>
          <IonLabel slot="end">{incidencia.ct_descripcion}</IonLabel>
          <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(incidencia.cn_id_incidencia)} />
        </IonItem>
      ))}
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
              <IonButton onClick={() => setIsOpen(false)}>Cancelar</IonButton>
            </IonButtons>
            <IonTitle>Registra una incidencia</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <RegistraIncidencia />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default InicioUsuario;
