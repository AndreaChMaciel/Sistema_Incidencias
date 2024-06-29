import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonIcon, IonList, IonThumbnail, IonSelect, IonSelectOption } from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const InicioEncargado: React.FC = () => {
  const history = useHistory();
  const [incidencias, setIncidencias] = useState<any[]>([]);

  useEffect(() => {
    fetchIncidencias();
  }, []);

  const fetchIncidencias = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/api/incidencias-encargado', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIncidencias(response.data);
    } catch (error) {
      console.error('Error fetching incidencias:', error);
    }
  };

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
              {incidencias.filter(incidencia => incidencia.cn_id_estado === 0).map((incidencia, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <img
                      alt={`Imagen de la incidencia ${incidencia.cn_incidencia}`}
                      src={`http://localhost:8000/imagenes/${incidencia.imagen}`}
                    />
                  </IonThumbnail>
                  <IonLabel>{`INCIDENCIA ${incidencia.cn_incidencia}: ${incidencia.ct_descripcion}`}</IonLabel>
                  <IonIcon icon={createOutline} slot="end" onClick={() => handleIconClick(incidencia.cn_id_incidencia)} />
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
              {incidencias.filter(incidencia => incidencia.cn_id_estado !== 0).map((incidencia, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <img
                      alt={`Imagen de la incidencia ${incidencia.cn_incidencia}`}
                      src={`http://localhost:8000/imagenes/${incidencia.imagen}`}
                    />
                  </IonThumbnail>
                  <IonLabel>{incidencia.ct_nombre}: {incidencia.ct_descripcion}</IonLabel>
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
