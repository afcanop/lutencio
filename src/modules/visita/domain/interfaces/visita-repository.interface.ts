import { Entrega } from "@/src/modules/visita/domain/interfaces/vista.interface";
import { ApiResponse } from "@/src/core/api/domain/interfaces/api.interface";

export interface VisitaRepository {
  getLista(
    despachoId: number,
    estadoEntregado: boolean,
    subdominio: string
  ): Promise<ApiResponse<Entrega[]>>;

  setNovedad(
    visita: number, descripcion: string, novedad_tipo: string, imagenes: any
  ):Promise<any>

  setNovedadSolucion(
    id:number, solucion:string
  ): Promise<any>

}
