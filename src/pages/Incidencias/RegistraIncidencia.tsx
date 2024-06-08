
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert, IonTextarea } from '@ionic/react';
import axios from 'axios';

const RegistraIncidencia: React.FC = () => {
  const [ct_nombre, setNombre] = useState('');
  const [ct_descripcion, setDescripcion] = useState('');
  const [ct_lugar, setLugar] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const registrarIncidencia = async () => {
    // Validar que los campos de correo y contraseña no estén vacíos
    if (!ct_nombre || !ct_descripcion || !ct_lugar || !imagen) {
      setError('Por favor, proporcione información en todos los campos');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/incidencias/crear', {
        ct_nombre,
        ct_descripcion,
        ct_lugar,
        imagen
      });
    
     // Limpiar los campos después de registrar la incidencia
        setNombre('');
        setDescripcion('');
        setLugar('');
        setImagen('');
        
        setSuccess('Incidencia registrada con éxito!!')
    } catch (error) {
        setSuccess('Error al registrar la incidencia. Por favor, inténtelo de nuevo.');
      }
    };
  

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Registrar Incidencia</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                type="text"
                value={ct_nombre}
                onIonChange={e => setNombre(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea
                value={ct_descripcion}
                onIonChange={e => setDescripcion(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Lugar</IonLabel>
              <IonInput
                type="text"
                value={ct_lugar}
                onIonChange={e => setLugar(e.detail.value!)}
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
            {success && <IonAlert
              isOpen={!!success}
              onDidDismiss={() => setSuccess('')}
              message={success}
              buttons={['OK']}
            />}
            <IonButton expand="block" onClick={registrarIncidencia}>Registrar</IonButton>
          </IonContent>
        </IonPage>
      );
};

export default RegistraIncidencia;
