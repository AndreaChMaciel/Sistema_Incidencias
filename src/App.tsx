import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login/Login';
import RegistrarIncidencia from './pages/Incidencias/RegistraIncidencia';
import ListaIncidencias from './pages/Incidencias/MuestraIncidencias';
import DiagnosticaIncidencia from './pages/Incidencias/RegistraDiagnosticoInci';
import InicioEncargado from './pages/PantallasInicio/InicioEncargado';
import InicioUsuario from './pages/PantallasInicio/InicioUsuario';
import InicioTecnico from './pages/PantallasInicio/InicioTecnico';
import InicioSupervisor from './pages/PantallasInicio/InicioSupervisor';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet >
      <Route path="/login" component={Login} exact />
      <Route path="/registrar-incidencia" component={RegistrarIncidencia} />
      <Route path="/incidencias" component={ListaIncidencias} exact />
      <Route path="/incidencias/:id/diagnosticar" component={DiagnosticaIncidencia} exact />
      <Route path="/Encargado" component={InicioEncargado} exact />
      <Route path="/Usuario" component={InicioUsuario} exact />
      <Route path="/Tecnico" component={InicioTecnico} exact />
      <Route path="/Supervisor" component={InicioSupervisor} exact />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;