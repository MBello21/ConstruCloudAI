import { construcloudAPI } from "../../../shared/services/construcloud.api";
import { getPresupuestosByID } from "../../presupuestos/services/get-presupuesto-by-id.action";
import type { Capitulo } from "../../capitulos/capitulo.types";

export interface PresupuestoIARequest {
  titulo: string;
  descripcion: string;
  materiales_por_cliente: boolean;
}

export interface PresupuestoIAResponse {
  capitulos: Capitulo[];
}

export const postPresupuesto = async (
  data: PresupuestoIARequest,
): Promise<PresupuestoIAResponse> => {
  try {
    console.log("🔄 Calling POST /presupuestos/ia-rag...");
    const response = await construcloudAPI.post("/presupuestos/ia-rag", data);
    console.log("📥 Raw response from /presupuestos/ia-rag:", response.data);

    // Estructura 1: { presupuesto: { capitulos: [...], ... }, referencias_usadas, ...}
    if (response.data.presupuesto && response.data.presupuesto.capitulos) {
      console.log("✅ Response has presupuesto.capitulos (IA generation with metadata)");
      const { capitulos } = response.data.presupuesto;
      if (Array.isArray(capitulos)) {
        console.log(`📊 Extracted ${capitulos.length} capitulos from presupuesto`);
        return { capitulos };
      }
    }

    // Estructura 2: { capitulos: [...], ... } (capitulos en la raíz)
    if (response.data.capitulos && Array.isArray(response.data.capitulos)) {
      console.log("✅ Response already has capitulos array in root");
      return response.data;
    }

    // Estructura 3: { presupuesto_id: number, ... } (antigua: obtener via GET)
    if (response.data.presupuesto_id) {
      console.log("🔄 Response has presupuesto_id, fetching full presupuesto...");
      const fullPresupuesto = await getPresupuestosByID(
        response.data.presupuesto_id,
      );
      console.log("✅ Full presupuesto fetched:", fullPresupuesto);
      return {
        capitulos: fullPresupuesto.capitulos,
      };
    }

    // Estructura 4: Array directo de capitulos
    if (Array.isArray(response.data)) {
      console.log("✅ Response is direct array of capitulos");
      return {
        capitulos: response.data,
      };
    }

    console.warn("⚠️ Unexpected response structure:", response.data);
    throw new Error(
      "Response structure not recognized. Expected one of: response.presupuesto.capitulos, response.capitulos, response.presupuesto_id, or array",
    );
  } catch (error) {
    console.error("❌ Error in postPresupuesto:", error);
    throw new Error(`Error obteniendo presupuestos`, { cause: error });
  }
};
