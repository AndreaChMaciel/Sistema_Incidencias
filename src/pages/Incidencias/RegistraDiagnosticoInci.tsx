import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert, IonTextarea } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegistraDiagnosticoInci: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ct_descripcion, setDescripcion] = useState('');
  const [cn_tiempo_estimado, setTiempoEstimado] = useState('');
  const [ct_observaciones, setObservaciones] = useState('');
  const [imagen, setImagen] = useState('');
  const [cb_compra, setCompra] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const history = useHistory(); // Obtén el objeto history

  const registrarDiagnostico = async () => {
    if (!ct_descripcion || !cn_tiempo_estimado || !ct_observaciones || !imagen || !cb_compra) {
      setError('Por favor, proporcione información en todos los campos');
      return;
    }

    // Convertir el campo booleano a true/false
    const boolValue = cb_compra.toLowerCase() === 'sí' || cb_compra.toLowerCase() === 'si';

    try {
      const response = await axios.post(`http://localhost:8000/api/incidencias/${id}/diagnosticar`, {
        ct_descripcion,
        cn_tiempo_estimado: parseInt(cn_tiempo_estimado),
        ct_observaciones,
        imagen,
        cb_compra: boolValue
      });

      setDescripcion('');
      setTiempoEstimado('');
      setObservaciones('');
      setImagen('');
      setCompra('');
      setSuccess('Diagnóstico registrado con éxito');
      history.push('/login');
    } catch (error) {
      setError('Error al registrar el diagnóstico. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Diagnóstico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            value={ct_descripcion}
            onIonChange={e => setDescripcion(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Tiempo Estimado (Indique hrs o min)</IonLabel>
          <IonInput
            type="number"
            value={cn_tiempo_estimado}
            onIonChange={e => setTiempoEstimado(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Observaciones</IonLabel>
          <IonTextarea
            value={ct_observaciones}
            onIonChange={e => setObservaciones(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">¿Requiere compra? (sí/no)</IonLabel>
          <IonInput
            type="text"
            value={cb_compra}
            onIonChange={e => setCompra(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Imagen</IonLabel>
          <IonInput
            type="text"
            value={imagen}
            onIonChange={e => setImagen(e.detail.value!)}
          />
        </IonItem>
        {error && <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          message={error}
          buttons={['OK']}
        />}
        {success && <IonAlert
          isOpen={!!success}
          onDidDismiss={() => setSuccess('')}
          message={success}
          buttons={['OK']}
        />}
        <IonButton expand="block" onClick={registrarDiagnostico}>Registrar Diagnóstico</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegistraDiagnosticoInci;
