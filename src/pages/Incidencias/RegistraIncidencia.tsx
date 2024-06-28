
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert, IonTextarea, IonImg } from '@ionic/react';
import axios from 'axios';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useHistory } from 'react-router-dom';


const RegistraIncidencia: React.FC = () => {
  const [ct_nombre, setNombre] = useState('');
  const [ct_descripcion, setDescripcion] = useState('');
  const [ct_lugar, setLugar] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  

  const tomarFoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Usar 'dataUrl' como tipo de resultado
        source: CameraSource.Camera
      });
  
      if (image && image.dataUrl) {
        setImagen(image.dataUrl);
      }
    } catch (error) {
      console.error('Error al tomar la foto', error);
      setError('Error al tomar la foto. Por favor, inténtelo de nuevo.');
    }
  };

  const history = useHistory(); // Obtén el objeto history

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

        // Redirigir a la vista de incidencias
      history.push('/incidencias');
        
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
              <IonLabel position="stacked">Nombre completo de usuario:</IonLabel>
              <IonInput
                type="text"
                value={ct_nombre}
                onIonChange={e => setNombre(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción de la incidencia:</IonLabel>
              <IonTextarea
                value={ct_descripcion}
                onIonChange={e => setDescripcion(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Lugar de incidencia:</IonLabel>
              <IonInput
                type="text"
                value={ct_lugar}
                onIonChange={e => setLugar(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
          <IonLabel position="stacked">Adjuntar foto:</IonLabel>
          <IonButton onClick={tomarFoto}>Tomar Foto</IonButton>
          {imagen && <IonImg src={imagen} />}
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