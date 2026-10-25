// backend/src/controllers/adherentsController.js
import * as adherentsModel from '../models/adherentsModel.js';
import pool from '../config/database.js';

/** GET /api/v1/adherents */
export const getAdherents = async (req, res) => {
  const adherents = await adherentsModel.findAll();
  res.json(adherents);
};

/** GET /api/v1/adherents/:id */
export const getAdherentById = async (req, res) => {
  const adherent = await adherentsModel.findById(req.params.id);
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};

/** POST /api/v1/adherents */
export const createAdherent = async (req, res) => {
  const { nom, prenom, email } = req.body;
  const manquants = ['nom','prenom','email'].filter(k => !req.body[k]);
  if (manquants.length > 0)
    return res.status(400).json({ erreur: 'Champs manquants', champs: manquants });
  const nouveau = await adherentsModel.create({ nom, prenom, email });
  res.status(201).json(nouveau);
};

/** DELETE /api/v1/adherents/:id — soft delete */
export const desactiverAdherent = async (req, res) => {
  const adherent = await adherentsModel.desactiver(req.params.id);
  if (!adherent)
    return res.status(404).json({ erreur: `Adhérent id:${req.params.id} introuvable` });
  res.json(adherent);
};

// GET /api/v1/emprunts/retards
export const getRetards = async (req, res) => {
  const result = await pool.query(`
    SELECT e.id, l.titre, a.nom || ' ' || a.prenom AS adherent,
           e.date_retour_prevue,
           CURRENT_DATE - e.date_retour_prevue AS jours_retard
    FROM emprunts e
    JOIN livres    l ON e.livre_id    = l.id
    JOIN adherents a ON e.adherent_id = a.id
    WHERE e.date_retour_effective IS NULL
      AND e.date_retour_prevue < CURRENT_DATE
    ORDER BY jours_retard DESC
  `);
  res.json(result.rows);
};