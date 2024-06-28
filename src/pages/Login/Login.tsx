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

    console.log(email, password);
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
        

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      

      const { roles } = response.data;
      
      if (roles.includes('Usuario')) {
        history.push('/Usuario');
    } else if (roles.includes('Encargado')) {
        history.push('/Encargado'); 
    } else if (roles.includes('Tecnico')) {
        history.push('/Tecnico');
    } else if (roles.includes('Supervisor')) {
        history.push('/Supervisor');
    } else {
        setError('Rol no reconocido');
    }
  } catch (err) {
    console.error(err);
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
