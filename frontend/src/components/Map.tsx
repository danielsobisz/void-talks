import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import mapbox, { Map as MapType } from "mapbox-gl";
import "./Map.css";
import airports from "./airport.json";

export const Map = () => {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapType | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapbox.Map({
        accessToken: mapboxAccessToken,
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-74.006, 40.7128],
        zoom: 7,
      });

      mapRef.current = map;

      return () => map.remove();
    }
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    airports.forEach((airport: any) => {
      const lat = Number(airport.lat);
      const lon = Number(airport.lon);

      if (Number.isNaN(lat) || Number.isNaN(lon)) return;

      new mapbox.Marker()
        .setLngLat([lon, lat]) // UWAGA: [lng, lat]
        .setPopup(
          new mapbox.Popup().setHTML(`
          <strong>${airport.name}</strong><br/>
          ${airport.city}, ${airport.country}<br/>
          Code: ${airport.code}
        `),
        )
        .addTo(mapRef.current!);
    });
  }, [airports]);

  return <div ref={mapContainerRef} className="map-container" />;
};
