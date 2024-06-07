import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';

const Login: React.FC = () => {
  const [ct_correo, setCorreo] = useState('');
  const [ct_contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const validaLogin = async () => {
    // Validar que los campos de correo y contraseña no estén vacíos
    if (!ct_correo || !ct_contrasena) {
      setError('Por favor, proporcione un correo y una contraseña');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        ct_correo,
        ct_contrasena
      });
      const { mensaje } = response.data;
      
      // Verificar si el mensaje indica que las credenciales son incorrectas
      if (mensaje === 'La contraseña es incorrecta' || mensaje === 'No se encontró ningún usuario con ese correo electrónico') {
        setError('Credenciales inválidas');
      } else {
        // Las credenciales son válidas, haz lo que necesites hacer aquí
        setError('Inicio de sesión exitoso!!');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
        {error && <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          message={error}
          buttons={['OK']}
        />}
        <IonButton expand="block" onClick={validaLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
