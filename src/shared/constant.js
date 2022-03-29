import { message } from "antd";

export const RUBRIQUES_WARNING_MESSAGES = {
  EMPTY: "Merci de remplir et valider votre rubrique",
  EXISTED: "Cette rubrique existe déjà",
  MODIFIED: "Modification effectuée avec succès",
};
export const RUBRIQUES_SUCCESS_MESSAGES = {
  ADDED: "Rubrique est bien ajoutée",
};

export const USER_SUCCESS_LOGIN_MESSAGE = {
  LOGGED: "Connexion réussie",
};

export const USER_FAILED_LOGIN_MESSAGE = {
  FAILED:
    "Connexion échouée. Vérifiez votre email et mot de passe et réessayez!",
};

export const ALERT_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export const onShowAlert = (msg, type) => message[type](msg);
