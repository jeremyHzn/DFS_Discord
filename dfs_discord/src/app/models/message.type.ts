// models/message.type.ts
export interface Message {
  _id: string;
  contenu: string;
  utilisateurEmail: string;
  utilisateurAvatar: string;
  salon: string;
  date: Date;
}
