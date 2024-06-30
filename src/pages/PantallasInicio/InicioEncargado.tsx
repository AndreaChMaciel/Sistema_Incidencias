import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonList,
  IonThumbnail,
  IonButton
} from '@ionic/react';
import { createOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const InicioEncargado: React.FC = () => {
  const history = useHistory();
  const [incidenciasPendientes, setIncidenciasPendientes] = useState<any[]>([]);
  const [incidenciasAsignadas, setIncidenciasAsignadas] = useState<any[]>([]);

  useEffect(() => {
    fetchIncidenciasPendientes();
    fetchIncidenciasAsignadas();
  }, []);

  const fetchIncidenciasPendientes = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/incidencias-encargado', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIncidenciasPendientes(response.data);
    } catch (error) {
      console.error('Error fetching incidencias pendientes:', error);
    }
  };

  const fetchIncidenciasAsignadas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/incidencias-asignadas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIncidenciasAsignadas(response.data);
    } catch (error) {
      console.error('Error fetching incidencias asignadas:', error);
    }
  };

  const handleIconClick = (incidenciaId: any) => {
    history.push(`/asignar-tecnicos/${incidenciaId}`);
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
          <IonTitle>Asignar Incidencias</IonTitle>
          
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
            <IonCardTitle>Pendientes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {incidenciasPendientes.map((incidencia, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <img
                      alt={`Imagen de la incidencia ${incidencia.cn_incidencia}`}
                      src={`http://localhost:8000/imagenes/${incidencia.imagen}`}
                    />
                  </IonThumbnail>
                  <IonLabel>{`INCIDENCIA ${incidencia.cn_incidencia}: ${incidencia.titulo}`}</IonLabel>
                  <IonButton onClick={() => handleIconClick(incidencia.cn_id_incidencia)} slot="end">
                    Asignar
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Asignadas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {incidenciasAsignadas.map((incidencia, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <img
                      alt={`Imagen de la incidencia ${incidencia.cn_incidencia}`}
                      src={`http://localhost:8000/imagenes/${incidencia.imagen}`}
                    />
                  </IonThumbnail>
                  <IonLabel>{`INCIDENCIA ${incidencia.cn_incidencia}: ${incidencia.titulo}`}</IonLabel>
                  <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(incidencia.cn_id_incidencia)} />
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default InicioEncargado;
