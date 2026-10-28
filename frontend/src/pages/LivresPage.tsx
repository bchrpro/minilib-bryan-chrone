// frontend/src/pages/LivresPage.tsx
import { useState, useEffect } from "react";
import type { Livre } from "../types";
import { getLivres } from "../services/livreService";
import LivreCard from "../components/LivreCard";

function LivresPage() {
  // Les 3 états pour tout fetch : données, chargement, erreur
  const [livres,     setLivres]     = useState<Livre[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur,     setErreur]     = useState<string | null>(null);
  const [recherche,  setRecherche]  = useState<string>("");
  const [disponible, setDisponible] = useState<string>("");

  // Chargement au montage du composant
  useEffect(() => {
    const chargerLivres = async () => {
      try {
        setChargement(true);
        setErreur(null);
        const data = await getLivres({ recherche, disponible: disponible === "" ? undefined : disponible === "true" });
        setLivres(data);
      } catch (err) {
        setErreur(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setChargement(false);
      }
    };

    chargerLivres();
  }, [recherche, disponible]); 

  // ── Rendu conditionnel ──────────────────────────────────────
  if (chargement) {
    return (
      <div className="loading-container">
        <span className="loader"></span>
        <p>Chargement du catalogue...</p>
      </div>);
  }

  if (erreur) {
    return (
      <div>
        <p style={{ color: "red" }}>Erreur : {erreur}</p>
        <p>Vérifiez que le backend tourne sur http://localhost:8080</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Catalogue de livres</h1>
        <input
          type="text"
          placeholder="Rechercher un titre ou un auteur..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <label style={{ marginBottom: "16px", color: "#555" }} htmlFor="filtre">Filtre de disponibilité&nbsp;:</label>
        <select 
          id="filtre"
          value={disponible}
          onChange={(e) => setDisponible(e.target.value)}
          >
          <option value="">Tous</option>
          <option value="true">Disponible</option>
          <option value="false">Empruntés</option>
        </select>
        
      <p style={{ marginBottom: "16px", color: "#555" }}>
        {livres.length} livre{livres.length > 1 ? "s" : ""} dans la bibliothèque
      </p>
      {livres.length === 0 ? (
        <p>Aucun livre dans le catalogue.</p>
      ) : (
        livres.map((livre) => (
          <LivreCard key={livre.id} livre={livre} />
        ))
      )}
    </div>
  );
}

export default LivresPage;