// frontend_sgi/src/pages/Login/api.d.ts

declare module './api' {
    import axios, { AxiosInstance } from 'axios';
  
    const api: AxiosInstance;
    function setCSRFToken(token: string): void;
  
    export { api, setCSRFToken };
  }
  