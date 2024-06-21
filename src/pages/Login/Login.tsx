import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [ct_correo, setCorreo] = useState<string>('');
  const [ct_contrasena, setContrasena] = useState<string>('');
  const [error, setError] = useState<string>('');

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

      const { success, token, mensaje } = response.data;

      if (success) {
        // Guarda el token en localStorage
        localStorage.setItem('token', token);
        //history.push('/registrar-incidencia');
      } else {
        setError(mensaje || 'Credenciales inválidas');
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
          <IonLabel position="stacked">Correo electrónico</IonLabel>
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
        <IonButton expand="block" onClick={validaLogin}>Iniciar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
