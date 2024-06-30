import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSelect, IonSelectOption, IonLabel, IonItem } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const AsignarTecnicos: React.FC = () => {
  const { incidenciaId } = useParams<{ incidenciaId: string }>();
  const history = useHistory();
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [riesgos, setRiesgos] = useState<any[]>([]);
  const [afectaciones, setAfectaciones] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [prioridades, setPrioridades] = useState<any[]>([]);
  const [selectedTecnicos, setSelectedTecnicos] = useState<number[]>([]);
  const [selectedRiesgo, setSelectedRiesgo] = useState<string>('');
  const [selectedAfectacion, setSelectedAfectacion] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');
  const [selectedPrioridad, setSelectedPrioridad] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token: string | null) => {
    try {
      const requests = [
        axios.get('http://localhost:8000/api/tecnicos', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/riesgos', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/afectaciones', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/categorias', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/prioridades', { headers: { Authorization: `Bearer ${token}` } }),
      ];

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        if (response.status === 200) {
          switch (response.config.url) {
            case 'http://localhost:8000/api/tecnicos':
              setTecnicos(response.data);
              break;
            case 'http://localhost:8000/api/riesgos':
              setRiesgos(response.data);
              break;
            case 'http://localhost:8000/api/afectaciones':
              setAfectaciones(response.data);
              break;
            case 'http://localhost:8000/api/categorias':
              setCategorias(response.data);
              break;
            case 'http://localhost:8000/api/prioridades':
              setPrioridades(response.data);
              break;
            default:
              break;
          }
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAsignar = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:8000/api/asignar-tecnicos/${incidenciaId}`, {
        tecnicos: selectedTecnicos,
        riesgo: selectedRiesgo,
        afectacion: selectedAfectacion,
        categoria: selectedCategoria,
        prioridad: selectedPrioridad
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      history.push('/Encargado');
    } catch (error) {
      console.error('Error asignando técnicos:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Asignar Técnicos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Riesgo:</IonLabel>
          <IonSelect value={selectedRiesgo} onIonChange={e => setSelectedRiesgo(e.detail.value)}>
            {riesgos.map(riesgo => (
              <IonSelectOption key={riesgo.cn_id_riesgo} value={riesgo.cn_id_riesgo}>
                {riesgo.ct_descripcion}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Afectación:</IonLabel>
          <IonSelect value={selectedAfectacion} onIonChange={e => setSelectedAfectacion(e.detail.value)}>
            {afectaciones.map(afectacion => (
              <IonSelectOption key={afectacion.cn_id_afectacion} value={afectacion.cn_id_afectacion}>
                {afectacion.ct_descripcion}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Categoría:</IonLabel>
          <IonSelect value={selectedCategoria} onIonChange={e => setSelectedCategoria(e.detail.value)}>
            {categorias.map(categoria => (
              <IonSelectOption key={categoria.cn_id_categoria} value={categoria.cn_id_categoria}>
                {categoria.ct_descripcion}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Prioridad:</IonLabel>
          <IonSelect value={selectedPrioridad} onIonChange={e => setSelectedPrioridad(e.detail.value)}>
            {prioridades.map(prioridad => (
              <IonSelectOption key={prioridad.cn_id_prioridades} value={prioridad.cn_id_prioridades}>
                {prioridad.ct_descripcion}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Técnicos:</IonLabel>
          <IonSelect multiple={true} value={selectedTecnicos} onIonChange={e => setSelectedTecnicos(e.detail.value as number[])}>
            {tecnicos.map(tecnico => (
              <IonSelectOption key={tecnico.cn_id_usuario} value={tecnico.cn_id_usuario}>
                {tecnico.ct_nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonButton onClick={handleAsignar}>Asignar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AsignarTecnicos;
