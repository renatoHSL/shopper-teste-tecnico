import React, { useState, useEffect } from "react";
import axios from "axios";

interface Driver {
  id: number;
  name: string;
  description: string;
  rating: string;
  vehicle: string;
  value: number;
}

interface RouteResponse {
  routes: {
    polyline: {
      encodedPolyline: string;
    };
  }[];
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RideData {
  distance: number;
  duration: string;
  options: Driver[];
  origin: Coordinates;
  destination: Coordinates;
  routeResponse: RouteResponse;
}

interface RideHistoryItem {
  id: number;
  origin: string;
  destination: string;
  value: number;
}

function App() {
  const [step, setStep] = useState<"request" | "options" | "history">(
    "request"
  );
  const [rideOptions, setRideOptions] = useState<Driver[]>([]);
  const [rideHistory, setRideHistory] = useState<RideHistoryItem[]>([]);
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const [userId, setUserId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const fetchApiKey = async (): Promise<string> => {
    try {
      const response = await axios.get(
        "http://localhost:8080/config/google-api-key"
      );
      return response.data.googleApiKey;
    } catch (error) {
      console.error("Erro ao buscar a Google API Key:", error);
      throw new Error("Não foi possível obter a Google API Key.");
    }
  };

  const estimateRide = async () => {
    try {
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: userId,
        origin,
        destination,
      });
      const googleData = response.data;
      setRideData(googleData);
      setRideOptions(googleData.options);
      setStep("options");
    } catch {
      alert("Erro ao estimar a viagem.");
    }
  };

  // Função para gerar a URL do mapa
  const generateMapUrl = async (): Promise<string> => {
    if (
      !rideData ||
      !rideData.origin ||
      !rideData.destination ||
      !rideData.routeResponse
    ) {
      console.error("Dados incompletos em rideData.");
      return "";
    }

    const { origin, destination, routeResponse } = rideData;

    if (!routeResponse.routes) {
      console.error("Dados de rota inválidos:", routeResponse);
      return "";
    }

    const polyline = routeResponse.routes[0]?.polyline?.encodedPolyline;
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";

    const googleApiKey = await fetchApiKey();

    const url = `${baseUrl}?size=600x400&path=weight:5|color:blue|enc:${encodeURIComponent(
      polyline
    )}&markers=size:mid%7Ccolor:blue%7Clabel:A%7C${origin.latitude},${
      origin.longitude
    }&markers=size:mid%7Ccolor:red%7Clabel:B%7C${destination.latitude},${
      destination.longitude
    }&key=${googleApiKey}`;

    return url;
  };

  // Atualiza o URL do mapa sempre que o rideData muda
  useEffect(() => {
    const fetchMap = async () => {
      if (rideData) {
        const url = await generateMapUrl();
        setMapUrl(url);
      }
    };

    fetchMap();
  }, [rideData]);

  const confirmRide = async (driver: Driver) => {
    try {
      console.log("Iniciando confirmRide");
      if (!rideData) {
        alert("Erro: Dados da viagem não encontrados.");
        console.error("rideData está vazio:", rideData);
        return;
      }

      console.log("Confirmando viagem com o motorista:", driver);
      console.log("Dados da viagem:", rideData);

      const response = await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: userId,
        origin,
        destination,
        distance: rideData.distance,
        duration: rideData.duration,
        driver,
        value: driver.value,
      });

      console.log("Resposta do servidor:", response.data);
      alert("Viagem confirmada!");

      fetchHistory();
      setStep("history");
    } catch (error) {
      console.error("Erro ao confirmar a viagem:", error);
      alert(
        "Erro ao confirmar a viagem. Verifique o console para mais detalhes."
      );
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get<{ rides: RideHistoryItem[] }>(
        `http://localhost:8080/ride/${userId}`
      );
      setRideHistory(response.data.rides);
    } catch {
      alert("Erro ao buscar histórico.");
    }
  };

  return (
    <div>
      {step === "request" && (
        <div>
          <h1>Solicitar Viagem</h1>
          <label htmlFor="userId">ID do Usuário:</label>
          <input
            type="text"
            placeholder="ID do Usuário"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <label htmlFor="origin">Origem:</label>
          <input
            type="text"
            placeholder="Origem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <label htmlFor="destination">Destino:</label>
          <input
            type="text"
            placeholder="Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={estimateRide}>Estimar Viagem</button>
        </div>
      )}

      {step === "options" && (
        <div>
          <h1>Opções de Motoristas</h1>
          {rideOptions.map((driver) => (
            <div key={driver.id}>
              <p>{driver.name}</p>
              <p>{driver.description}</p>
              <p>{driver.vehicle}</p>
              <p>{driver.rating}</p>
              <p>R$ {driver.value.toFixed(2)}</p>
              <button onClick={() => confirmRide(driver)}>Escolher</button>
            </div>
          ))}
          <button onClick={() => setStep("request")}>Voltar</button>
          <div>
            <h1>Mapa da Rota</h1>
            {mapUrl ? (
              <img src={mapUrl} alt="Mapa da Rota" />
            ) : (
              <p>Carregando mapa...</p>
            )}
          </div>
        </div>
      )}

      {step === "history" && (
        <div>
          <h1>Histórico de Viagens</h1>
          {rideHistory.length === 0 ? (
            <p>Nenhuma viagem encontrada.</p>
          ) : (
            rideHistory.map((ride) => (
              <div key={ride.id}>
                <p>Origem: {ride.origin}</p>
                <p>Destino: {ride.destination}</p>
                <p>Valor: R$ {ride.value.toFixed(2)}</p>
              </div>
            ))
          )}
          <button onClick={() => setStep("request")}>Nova Viagem</button>
        </div>
      )}
    </div>
  );
}

export default App;
