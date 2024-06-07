import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import api from '../api';
import { ApiResponse, Usuarios } from '../types';

const Home: React.FC = () => {
    // Estado para almacenar los usuarios
    const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
    
    

    // useEffect para hacer la solicitud a la API cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Hacer una solicitud GET al endpoint '/usuarios'
                const response = await api.get<ApiResponse>('/usuarios');
                
                
                // Almacenar los usuarios en el estado
                setUsuarios(response.data.usuarios);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {usuarios && usuarios.length > 0 ? (
                    <div>
                        <h2>Usuarios</h2>
                        <ul>
                            {/* Mapeo de los usuarios para crear una lista */}
                            {usuarios.map(usuario => (
                                <li key={usuario.cn_id_usuario}>
                                    <p>Nombre: {usuario.ct_nombre}</p>
                                    <p>Cédula: {usuario.ct_cedula}</p>
                                    <p>Puesto: {usuario.ct_puesto}</p>
                                    <p>Celular: {usuario.ct_celular}</p>
                                    <p>Correo: {usuario.ct_correo}</p>
                                    {/* Renderiza más propiedades aquí si es necesario */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;