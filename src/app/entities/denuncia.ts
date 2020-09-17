import { compromiso } from './compromiso';
import { hechos } from './hechos';
import { prueba } from './prueba';
import { funcionario } from './funcionario';
import { gestiondenuncia } from './gestiondenuncia';

export class denuncia {
    idDenuncia: number;
    nombreCiudadano: string;
    apellidoCiudadano: string;
    tipoDocumento: string;
    numeroDocumento: number;
    fechaNacimiento: Date;
    departamentoCiudadano: string;
    direccionCiudadano: string;
    telefonoMovil: number;
    telefonoCasa: number;
    emailDenunciante: string;
    noExpediente: string;
    compromiso: compromiso[];
    hechos: hechos[];
    prueba: prueba[];
    funcionario: funcionario[];
    gestionDenuncia: gestiondenuncia[];
}