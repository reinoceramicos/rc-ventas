// supabase/functions/sync-from-sap/index.ts

import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Iniciando la función para sincronizar datos con SAP HANA")

// Función que obtiene datos desde la API de SAP HANA
async function getDatosDesdeSAP() {
  const response = await fetch("https://tu-servidor-sap-hana/api/datos", {
    method: "GET",
    headers: {
      "Authorization": "Bearer TU_TOKEN_DE_ACCESO", // Cambia por tu token de autenticación de SAP HANA
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener datos desde SAP HANA");
  }

  return await response.json();
}

// Función que maneja la solicitud HTTP y sincroniza los datos con Supabase
Deno.serve(async (req) => {
  try {
    // Obtén los datos de SAP HANA
    const sapDatos = await getDatosDesdeSAP();

    // Aquí insertamos los datos en la base de datos de Supabase
    const insertResponse = await fetch(Deno.env.get("SUPABASE_URL") + "/rest/v1/tu_tabla", {
      method: "POST",
      headers: {
        "apikey": Deno.env.get("SUPABASE_ANON_KEY")!,
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sapDatos),  // Aquí asumimos que los datos de SAP son directamente insertables
    });

    if (!insertResponse.ok) {
      throw new Error("Error al insertar datos en Supabase");
    }

    // Responde con éxito
    return new Response(
      JSON.stringify({ message: "Datos sincronizados exitosamente" }),
      { headers: { "Content-Type": "application/json" } },
    );

  } catch (error) {
    // En caso de error, retorna un mensaje adecuado
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
})
