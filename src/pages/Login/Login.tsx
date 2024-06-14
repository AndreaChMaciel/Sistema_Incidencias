import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [ct_correo, setCorreo] = useState('');
  const [ct_contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();

  const validaLogin = async () => {
    if (!ct_correo || !ct_contrasena) {
      setError('Por favor, proporcione un correo y una contraseña');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        ct_correo,
        ct_contrasena
      });

      const { success, mensaje } = response.data;

      if (!success) {
        setError(mensaje === 'La contraseña es incorrecta' || mensaje === 'No se encontró ningún usuario con ese correo electrónico' ? 'Credenciales inválidas' : mensaje);
      } else {
        history.push('/incidencias');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión en SGI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Correo</IonLabel>
          <IonInput
            type="email"
            value={ct_correo}
            onIonChange={e => setCorreo(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={ct_contrasena}
            onIonChange={e => setContrasena(e.detail.value!)}
          />
        </IonItem>
        {error && (
          <IonAlert
            isOpen={!!error}
            onDidDismiss={() => setError('')}
            message={error}
            buttons={['OK']}
          />
        )}
        <IonButton expand="block" onClick={validaLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
