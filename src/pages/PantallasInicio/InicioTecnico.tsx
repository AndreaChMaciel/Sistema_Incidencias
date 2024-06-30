import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const InicioTecnico: React.FC = () => {
  const history = useHistory();
  const [incidenciasAsignadas, setIncidenciasAsignadas] = useState<any[]>([]);

  useEffect(() => {
    fetchIncidenciasAsignadas();
  }, []);

  const fetchIncidenciasAsignadas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/incidencias-tecnico', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIncidenciasAsignadas(response.data);
    } catch (error) {
      console.error('Error fetching incidencias asignadas:', error);
    }
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
          <IonTitle>Reparaciones</IonTitle>
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
            <IonCardSubtitle>Incidencias</IonCardSubtitle>
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
                  <IonLabel>{`INCIDENCIA ${incidencia.cn_incidencia}: ${incidencia.ct_descripcion}`}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Otras secciones como "En Revisión", "En Reparación", etc., pueden seguir aquí */}

      </IonContent>
    </IonPage>
  );
};

export default InicioTecnico;
