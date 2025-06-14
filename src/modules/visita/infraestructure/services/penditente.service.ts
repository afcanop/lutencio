import { useAppDispatch } from "@/src/application/store/hooks";
import APIS from "@/src/core/constants/endpoint.constant";
import { Entrega } from "@/src/modules/visita/domain/interfaces/vista.interface";
import { consultarApiFormData } from "@/utils/api";
import * as FileSystem from "expo-file-system";

export class PenditesService {
  static async sincronizarPenditentes(
    entrega: Entrega,
    subdominio: string | null
  ) {
    if (!subdominio) return false;
    const dispatch = useAppDispatch();

    try {
        //Usamos Promise.all para esperar a que todas las imágenes se lean
        const imagenes = await Promise.all(
          entrega.arrImagenes.map(async (imagen) => {
            const base64 = await FileSystem.readAsStringAsync(imagen.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            return { base64: `data:image/jpeg;base64,${base64}` };
          })
        );

        let firmaBase64 = null;
        if (entrega.firmarBase64 !== null) {
          firmaBase64 = await FileSystem.readAsStringAsync(entrega.firmarBase64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          firmaBase64 = `data:image/jpeg;base64,${firmaBase64}`;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("id", `${entrega.id}`);
        formDataToSend.append("fecha_entrega", entrega.fecha_entrega);
        entrega.arrImagenes.forEach((archivo: any, index: number) => {
          // Crear un objeto File-like compatible con FormData
          const file = {
            uri: archivo.uri,
            name: `image-${index}.jpg`, // Usar nombre del archivo o generar uno
            type: "image/jpeg", // Tipo MIME por defecto
          };

          // La forma correcta de adjuntar archivos en React Native
          formDataToSend.append(`imagenes`, file as any, `image-${index}.jpg`); // Usamos 'as any' para evitar el error de tipo
        });

        const filefirma = {
          uri: entrega.firmarBase64,
          name: "firma",
          type: "image/jpeg", // Tipo MIME por defecto
        };
        formDataToSend.append(`firmas`, filefirma as any, `firma.jpg`); // Usamos 'as any' para evitar el error de tipo

        const respuesta = await consultarApiFormData<any>(APIS.ruteo.visitaEntrega, formDataToSend, {
          requiereToken: true,
          subdominio: subdominio!,
        });
      return respuesta.success;
    } catch (error) {
      return false;
    }
  }
}
