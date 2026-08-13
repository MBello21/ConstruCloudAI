import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./PresupuestoPDFStyles";
import type { Detalle } from "../../../detalles/detalle.types";
import type { Capitulo } from "../../../capitulos/capitulo.types";
import type { PresupuestoDetalle } from "../../types/presupuesto.types";
import type { Cliente } from "../../../clientes/cliente.types";

// TODO: importar tu tipo real

interface PresupuestoPDFProps {
  presupuesto: PresupuestoDetalle; // TODO: reemplazar con PresupuestoDetalle
  cliente?: Cliente | null;
  empresa?: {
    razon_social: string;
    direccion_fiscal?: string;
    telefono?: string;
    email?: string;
    documento?: string;
  };
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);

const PresupuestoPDF = ({
  presupuesto,
  cliente,
  empresa,
}: PresupuestoPDFProps) => {
  // Calcular subtotal por capítulo
  const getCapituloSubtotal = (detalles: Detalle[]): number =>
    detalles?.reduce((acc: number, d: Detalle) => acc + (d.subtotal ?? 0), 0) ??
    0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── 1. HEADER: Empresa + Código ── */}
        <View style={styles.headerContainer}>
          <View style={styles.empresaInfo}>
            {/* TODO: Logo con <Image src={logoUrl} style={{ width: 120 }} /> */}
            <Text style={styles.empresaNombre}>{empresa?.razon_social}</Text>
            {empresa?.direccion_fiscal && (
              <Text style={styles.empresaDato}>{empresa.direccion_fiscal}</Text>
            )}
            {empresa?.telefono && (
              <Text style={styles.empresaDato}>Tel: {empresa.telefono}</Text>
            )}
            {empresa?.email && (
              <Text style={styles.empresaDato}>{empresa.email}</Text>
            )}
            {empresa?.documento && (
              <Text style={styles.empresaDato}>NIF: {empresa.documento}</Text>
            )}
          </View>
          <View style={styles.codigoContainer}>
            <Text style={styles.codigoLabel}>PRESUPUESTO</Text>
            <Text style={styles.codigoValue}>{presupuesto.codigo}</Text>
            <Text style={styles.estadoBadge}>{presupuesto.estado}</Text>
          </View>
        </View>

        <View style={styles.dividerAccent} />

        {/* ── 2. DATOS DEL CLIENTE ── */}
        <View style={styles.clienteContainer}>
          <Text style={styles.clienteLabel}>Datos del cliente</Text>
          <View style={styles.clienteGrid}>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>Nombre: </Text>
              <Text style={styles.clienteFieldValue}>
                {cliente?.nombre_cliente ?? "—"}
              </Text>
            </View>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>NIF/CIF: </Text>
              <Text style={styles.clienteFieldValue}>{cliente?.id ?? "—"}</Text>
            </View>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>Dirección: </Text>
              <Text style={styles.clienteFieldValue}>
                {cliente?.direccion ?? "—"}
              </Text>
            </View>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>Localidad: </Text>
              <Text style={styles.clienteFieldValue}>
                {cliente?.poblacion ?? "—"}
              </Text>
            </View>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>Email: </Text>
              <Text style={styles.clienteFieldValue}>
                {cliente?.email ?? "—"}
              </Text>
            </View>
            <View style={styles.clienteField}>
              <Text style={styles.clienteFieldLabel}>Teléfono: </Text>
              <Text style={styles.clienteFieldValue}>
                {cliente?.telefono ?? "—"}
              </Text>
            </View>
          </View>
        </View>

        {/* ── 3. TÍTULO + DESCRIPCIÓN ── */}
        <Text style={styles.tituloPresupuesto}>{presupuesto.titulo}</Text>
        {presupuesto.descripcion && (
          <Text style={styles.descripcionPresupuesto}>
            {presupuesto.descripcion}
          </Text>
        )}

        {/* ── 4. CAPÍTULOS + DETALLES ── */}
        {presupuesto.capitulos?.map((capitulo: Capitulo, idx: number) => (
          <View
            key={capitulo.id ?? idx}
            style={styles.capituloContainer}
            wrap={false}
          >
            <View style={styles.capituloHeader}>
              <Text>
                {idx + 1}. {capitulo.nombre}
              </Text>
              <Text style={styles.capituloSubtotal}>
                {formatCurrency(getCapituloSubtotal(capitulo.detalles))}
              </Text>
            </View>

            <View style={styles.tableHeader}>
              <Text style={styles.colDescripcion}>Descripción</Text>
              <Text style={styles.colUnidad}>Ud.</Text>
              <Text style={styles.colCantidad}>Cant.</Text>
              <Text style={styles.colPrecio}>Precio</Text>
              <Text style={styles.colSubtotal}>Subtotal</Text>
            </View>

            {capitulo.detalles?.map((detalle: Detalle, dIdx: number) => (
              <View
                key={detalle.id ?? dIdx}
                style={dIdx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
              >
                <Text style={styles.colDescripcion}>{detalle.descripcion}</Text>
                <Text style={styles.colUnidad}>{detalle.unidad}</Text>
                <Text style={styles.colCantidad}>{detalle.cantidad}</Text>
                <Text style={styles.colPrecio}>
                  {formatCurrency(detalle.precio_unitario)}
                </Text>
                <Text style={styles.colSubtotal}>
                  {formatCurrency(detalle.subtotal)}
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* ── 5. TOTALES ── */}
        <View style={styles.totalesContainer}>
          <View style={styles.totalesBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(presupuesto.subtotal)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IVA ({presupuesto.iva}%)</Text>
              <Text style={styles.totalValue}>
                {formatCurrency((presupuesto.subtotal * presupuesto.iva) / 100)}
              </Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>TOTAL</Text>
              <Text style={styles.totalValueFinal}>
                {formatCurrency(presupuesto.total)}
              </Text>
            </View>
          </View>
        </View>

        {/* ── 6. CONDICIONES: Pago + Validez ── */}
        <View style={styles.condicionesContainer}>
          <Text style={styles.condicionesTitle}>Condiciones</Text>
          {presupuesto.condiciones_pago && (
            <View style={styles.condicionRow}>
              <Text style={styles.condicionLabel}>Forma de pago:</Text>
              <Text style={styles.condicionValue}>
                {presupuesto.condiciones_pago}
              </Text>
            </View>
          )}
          {presupuesto.validez_dias && (
            <View style={styles.condicionRow}>
              <Text style={styles.condicionLabel}>Validez:</Text>
              <Text style={styles.condicionValue}>
                {presupuesto.validez_dias} días
              </Text>
            </View>
          )}
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <Text>{empresa?.razon_social} — Generado con ConstruCloudAI</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default PresupuestoPDF;
