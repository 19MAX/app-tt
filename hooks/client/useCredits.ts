import { useEffect, useState } from "react";

export function useCredits() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de créditos desde API
    const fetchCredits = async () => {
      try {
        // Reemplaza con tu llamada a la API
        // const response = await api.getCredits();
        // setCredits(response.data.credits);

        // Simulación
        setTimeout(() => {
          setCredits(1250);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error al cargar créditos:", error);
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return { credits, loading, setCredits };
}
