import React, { useState } from "react";
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

  const [userId, setUserId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const estimateRide = async () => {
    try {
      console.log("Função estimate ride");
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: userId,
        origin,
        destination,
      });
      console.log("origin", origin);
      console.log("response data.destination", response);
      const googleData = response.data;
      console.log(googleData);
      const originCoords = googleData.routes[0]?.legs[0]?.startLocation;
      console.log("origincoords do front", originCoords);
      // const destinationCoords = googleData.routes[0]?.legs[0]?.endLocation
      setRideData(response.data);
      setRideOptions(response.data.options);
      setStep("options");
    } catch {
      alert("Erro ao estimar a viagem.");
    }
  };

  console.log("Estado atual de rideData:", rideData);

  const generateMapUrl = () => {
    console.log("Chamando funcao generateMapurl");
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

    console.log("Conteúdo de routeResponse:", rideData.routeResponse);

    if (!routeResponse.routes) {
      console.error("Dados de rota inválidos:", routeResponse);
      return "";
    }
    console.log("ANtes de polyline");
    // const polyline = routeResponse.routes[0]?.polyline?.encodedPolyline;
    console.log("Depois de polyline");
    const GOOGLE_API_KEY = "AIzaSyB3ZvNoJM3ybECWOAzeai-zHmPja-sKamA";
    // const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";

    console.log(
      "Origem (latitude, longitude):",
      origin.latitude,
      origin.longitude
    );
    console.log(
      "Destino (latitude, longitude):",
      destination.latitude,
      destination.longitude
    );

    // const url = `${baseUrl}?size=600x400&path=weight:5|color:blue|enc:${encodeURIComponent(
    //   polyline
    // )}&markers=size:mid%7Ccolor:blue%7Clabel:A%7C${origin.latitude},${
    //   origin.longitude
    // }&markers=size:mid%7Ccolor:red%7Clabel:B%7C${destination.latitude},${
    //   destination.longitude
    // }&key=${GOOGLE_API_KEY}`;

    const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=weight:5|color:blue|enc:<POLILINHA_CODIFICADA>&markers=size:mid%7Ccolor:blue%7Clabel:A%7C-23.55052,-46.633308&markers=size:mid%7Ccolor:red%7Clabel:B%7C-22.906847,-43.172896&key=${GOOGLE_API_KEY}`;

    console.log("URL gerado:", url);
    return url;
  };

  console.log("Dados de rideData:", rideData);

  const confirmRide = async (driver: Driver) => {
    try {
      if (!rideData) {
        alert("Erro: Dados da viagem não encontrados.");
        return;
      }

      await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: userId,
        origin,
        destination,
        distance: rideData.distance,
        duration: rideData.duration,
        driver,
        value: driver.value,
      });
      alert("Viagem confirmada!");
      fetchHistory();
      setStep("history");
    } catch {
      alert("Erro ao confirmar a viagem.");
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
            {rideData && <img src={generateMapUrl()} alt="Mapa da Rota" />}
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
