import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MuestraIncidencias: React.FC = () => {
  const [incidencias, setIncidencias] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/incidencias');
        setIncidencias(response.data);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  const manejaSeleccionIncidencia = (id: string) => {
    history.push(`/incidencias/${id}/diagnosticar`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Listar Incidencias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID Incidencia</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Lugar</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Descripción</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {incidencias.map((incidencia: any) => (
                    <tr key={incidencia.id}>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incidencia.ct_id_incidencia}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incidencia.ct_lugar}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>{incidencia.ct_descripcion}</td>
                      <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                        <IonButton onClick={() => manejaSeleccionIncidencia(incidencia.id)}>Diagnóstico</IonButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MuestraIncidencias;
