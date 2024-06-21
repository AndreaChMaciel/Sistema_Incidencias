import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const history = useHistory();

  const validaLogin = async () => {
    if (!email || !password) {
      setError('Por favor, proporcione un correo y una contraseña');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      const { success, token, message } = response.data;

      if (success) {
        // Guarda el token en localStorage
        localStorage.setItem('token', token);
        //history.push('/registrar-incidencia');
      } else {
        setError(message || 'Credenciales inválidas');
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
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
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
