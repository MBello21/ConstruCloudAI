import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },

  // ── Header: empresa ──
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  empresaInfo: {
    flex: 1,
  },
  empresaNombre: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 2,
  },
  empresaDato: {
    fontSize: 8,
    color: "#666",
    marginBottom: 1,
  },
  codigoContainer: {
    alignItems: "flex-end",
  },
  codigoLabel: {
    fontSize: 8,
    color: "#888",
  },
  codigoValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
  },
  estadoBadge: {
    marginTop: 4,
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#475569",
    textAlign: "center",
  },

  // ── Separador ──
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 12,
  },
  dividerAccent: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    marginVertical: 12,
  },

  // ── Cliente ──
  clienteContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  clienteLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  clienteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clienteField: {
    width: "50%",
    marginBottom: 4,
    flexDirection: "row",
  },
  clienteFieldLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
  },
  clienteFieldValue: {
    fontSize: 9,
    color: "#555",
  },

  // ── Título y descripción del presupuesto ──
  tituloPresupuesto: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  descripcionPresupuesto: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.5,
    marginBottom: 16,
  },

  // ── Capítulo ──
  capituloContainer: {
    marginBottom: 12,
  },
  capituloHeader: {
    backgroundColor: "#1e3a5f",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  capituloSubtotal: {
    fontSize: 9,
    color: "#cbd5e1",
  },

  // ── Tabla detalles ──
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#475569",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 8,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 8,
    backgroundColor: "#fafbfc",
  },

  // Columnas
  colDescripcion: { width: "38%" },
  colUnidad: { width: "8%", textAlign: "center" },
  colCantidad: { width: "10%", textAlign: "center" },
  colPrecio: { width: "14%", textAlign: "right" },
  colSubtotal: {
    width: "16%",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },

  // ── Totales ──
  totalesContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalesBox: {
    width: 240,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1e3a5f",
  },
  totalLabel: {
    fontSize: 9,
    color: "#555",
  },
  totalValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  totalLabelFinal: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
  },
  totalValueFinal: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
  },

  // ── Condiciones (pago + validez) ──
  condicionesContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  condicionesTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  condicionRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  condicionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#555",
    width: 100,
  },
  condicionValue: {
    fontSize: 9,
    color: "#1a1a1a",
    flex: 1,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#aaa",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingTop: 6,
  },
});
