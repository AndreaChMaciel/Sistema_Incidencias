import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Tecnico {
    cn_id_usuario: number;
    nombre: string;
}

const AsignarTecnicos: React.FC = () => {
    const { incidenciaId } = useParams<{ incidenciaId: string }>();
    const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
    const [selectedTecnicos, setSelectedTecnicos] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/api/tecnicos')
            .then(response => setTecnicos(response.data))
            .catch(error => console.error("Error al obtener los técnicos", error));
    }, []);

    const handleAsignar = () => {
        const selectedTecnicosNumeros = selectedTecnicos.map(Number);

        axios.post(`/api/encargado/asignar-tecnicos/${incidenciaId}`, {
            tecnicos: selectedTecnicosNumeros
        })
        .then(response => {
            alert('Incidencia asignada correctamente');
        })
        .catch(error => {
            console.error("Error al asignar la incidencia", error);
        });
    };

    return (
        <div>
            <h3>Asignar Técnicos</h3>
            <select 
                multiple 
                value={selectedTecnicos} 
                onChange={e => setSelectedTecnicos(
                    Array.from(e.target.selectedOptions, option => option.value)
                )}
            >
                {tecnicos.map(tecnico => (
                    <option key={tecnico.cn_id_usuario} value={tecnico.cn_id_usuario.toString()}>
                        {tecnico.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleAsignar}>Asignar</button>
        </div>
    );
};

export default AsignarTecnicos;
