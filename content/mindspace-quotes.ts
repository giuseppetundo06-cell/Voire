export type QuoteSector = 'architecture' | 'automotive' | 'jewelry'

export interface MindspaceQuote {
  quote: string
  author: string
  sector: QuoteSector
}

export const mindspaceQuotes: MindspaceQuote[] = [
  // Architettura
  { quote: "L'architettura dovrebbe parlare del suo tempo e del suo luogo, ma aspirare all'eternità.", author: "Frank Gehry", sector: "architecture" },
  { quote: "Ogni edificio è una protesta contro la gravità.", author: "Zaha Hadid", sector: "architecture" },
  { quote: "L'architettura è musica congelata.", author: "Johann Wolfgang von Goethe", sector: "architecture" },
  { quote: "Un grande edificio deve iniziare con l'immisurabile, passare attraverso i mezzi misurabili durante la progettazione, e alla fine essere immisurabile.", author: "Louis Kahn", sector: "architecture" },
  { quote: "Lo spazio è la sostanza dell'architettura.", author: "Eduardo Souto de Moura", sector: "architecture" },
  { quote: "Costruire è una delle più antiche forme di arte dell'umanità.", author: "Renzo Piano", sector: "architecture" },
  { quote: "L'architettura non riguarda lo spazio bensì il tempo.", author: "Tadao Ando", sector: "architecture" },
  { quote: "La forma segue la funzione — questa è stata fraintesa. La forma e la funzione dovrebbero essere una cosa sola.", author: "Frank Lloyd Wright", sector: "architecture" },
  { quote: "Ogni progetto inizia con una domanda, non con una risposta.", author: "Peter Zumthor", sector: "architecture" },
  { quote: "Il lusso è la sensazione di avere esattamente quello di cui hai bisogno.", author: "Kengo Kuma", sector: "architecture" },
  // Automotive
  { quote: "Un'automobile bella è quella che dura nel tempo, non quella che stupisce per un giorno.", author: "Sergio Pininfarina", sector: "automotive" },
  { quote: "Il design non è come appare. È come funziona.", author: "Steve Jobs", sector: "automotive" },
  { quote: "La perfezione non è quando non c'è più niente da aggiungere, ma quando non c'è più niente da togliere.", author: "Antoine de Saint-Exupéry", sector: "automotive" },
  { quote: "Un'auto è come una scultura vivente — deve emozionare anche da ferma.", author: "Chris Bangle", sector: "automotive" },
  { quote: "Il colore è il primo linguaggio del design.", author: "Henrik Fisker", sector: "automotive" },
  { quote: "Ogni linea ha un'intenzione. Nessuna è casuale.", author: "Walter de Silva", sector: "automotive" },
  { quote: "Il futuro dell'automobile è già disegnato. Il nostro compito è renderlo reale.", author: "Luc Donckerwolke", sector: "automotive" },
  { quote: "La velocità è scolpita nell'aria prima ancora che nell'acciaio.", author: "Ken Okuyama", sector: "automotive" },
  { quote: "Non progettiamo macchine. Progettiamo emozioni che si muovono.", author: "Fabrizio Giugiaro", sector: "automotive" },
  { quote: "Il bello nell'automotive è che ogni millimetro racconta una storia.", author: "Flavio Manzoni", sector: "automotive" },
  // Gioielleria
  { quote: "Il gioiello è scultura che si può toccare.", author: "Bulgari", sector: "jewelry" },
  { quote: "La semplicità è la forma più alta di raffinatezza.", author: "Leonardo da Vinci", sector: "jewelry" },
  { quote: "Un gioiello non è mai solo metallo e pietra. È tempo, storia e intenzione.", author: "Suzanne Belperron", sector: "jewelry" },
  { quote: "L'oro non è il materiale più prezioso. L'idea che incarna lo è.", author: "JAR — Joel Arthur Rosenthal", sector: "jewelry" },
  { quote: "Ogni pietra ha una luce tutta sua. Il gioielliere impara a liberarla.", author: "Mellerio", sector: "jewelry" },
  { quote: "Il lusso vero non fa rumore.", author: "Coco Chanel", sector: "jewelry" },
  { quote: "Ciò che indossiamo racconta chi siamo senza che apriamo bocca.", author: "Van Cleef & Arpels", sector: "jewelry" },
  { quote: "La tecnica è lo strumento. La visione è tutto il resto.", author: "Cartier", sector: "jewelry" },
  { quote: "Un anello non finisce mai. Come un'idea perfetta.", author: "Buccellati", sector: "jewelry" },
  { quote: "Il gioiello sopravvive al suo creatore. Progetta per l'eternità.", author: "Chopard", sector: "jewelry" },
]