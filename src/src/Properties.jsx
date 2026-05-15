import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // or ../supabase depending on your setup

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setProperties(data);
    }
  }

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <p>{property.location}</p>
          <p>${property.price}</p>
        </div>
      ))}
    </div>
  );
}