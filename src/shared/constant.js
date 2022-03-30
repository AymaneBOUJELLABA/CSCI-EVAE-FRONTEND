import { message } from "antd";

export const RUBRIQUES_WARNING_MESSAGES = {
  EMPTY: "Merci de remplir et valider votre rubrique",
  EXISTED: "Cette rubrique existe déjà",
  MODIFIED: "Modification effectuée avec succès",
};
export const RUBRIQUES_SUCCESS_MESSAGES = {
  ADDED: "Rubrique est bien ajoutée",
};
export const QUESTIONNAIRE_SUCCESS_MESSAGES = {
  ADDED: "Votre réponse a été envoyée ",
};

export const ALERT_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
};

export const onShowAlert = (msg, type) => message[type](msg);
