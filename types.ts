export enum MessageType {
  SYSTEM_GREEN = 'SYSTEM_GREEN', // The green status boxes
  USER = 'USER',                 // The user of the app
  PARTNER = 'PARTNER'            // The other person (AI)
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isDateSeparator?: boolean; // For "Hoje, 22 de novembro..."
}

export interface ProductDetails {
  title: string;
  price: string;
  imageUrl: string;
  sellerName: string;
  sellerSince: string;
}