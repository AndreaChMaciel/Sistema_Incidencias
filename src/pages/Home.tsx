<<<<<<< HEAD
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

=======
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { ApiResponse, Usuarios } from '../types';
import axios from 'axios';

const Home: React.FC = () => {
    // Estado para almacenar los usuarios
    const [data, setUsuarios] = useState<Usuarios[]>([]);
    
    

    // useEffect para hacer la solicitud a la API cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            try {
              
                // Hacer una solicitud GET al endpoint '/usuarios'
                const response = await axios.get('http://localhost:8000/api/usuarios');
              
                
                
                
                // Almacenar los usuarios en el estado
                setUsuarios(response.data);
                

            } catch (error) {
                console.error('Error de data:', error);
            }
        };

        fetchData();
    }, []);
    
    return (

        <div>
          <h2>Usuarios</h2>
            <ul>
            {/* Mapeo de los usuarios para crear una lista */}
             {data.map(usuario => (
               <li key={usuario.cn_id_usuario}>
                <p>Nombre: {usuario.cn_id_usuario}</p>
                <p>Cédula: {usuario.ct_cedula}</p>
                <p>Puesto: {usuario.ct_puesto}</p>
                <p>Celular: {usuario.ct_celular}</p>
                <p>Correo: {usuario.ct_correo}</p>
                {usuario.ct_nombre}</li>      
             ))}
            </ul>
        </div>
    );
  };
                
>>>>>>> 67589e3c990e18e725ae1353d1fb3d61a377968c
export default Home;
