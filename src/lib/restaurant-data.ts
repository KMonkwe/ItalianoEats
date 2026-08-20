import margherita from "@/assets/dish-margherita.jpg";
import ossobuco from "@/assets/dish-ossobuco.jpg";
import burrata from "@/assets/dish-burrata.jpg";
import tiramisu from "@/assets/dish-tiramisu.jpg";
import bistecca from "@/assets/dish-bistecca.jpg";
import truffle from "@/assets/special-truffle.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Antipasti" | "Primi" | "Secondi" | "Dolci";
  image: string;
};

export const heroSpecialImage = truffle;

export const menu: MenuItem[] = [
  {
    id: "burrata",
    name: "Burrata Pugliese",
    description: "Creamy burrata, roasted heirloom tomatoes, basil oil, focaccia.",
    price: 22,
    category: "Antipasti",
    image: burrata,
  },
  {
    id: "tagliatelle",
    name: "Wild Forest Truffle Tagliatelle",
    description: "Hand-rolled pasta, 36-month Parmigiano-Reggiano, Piedmont truffle.",
    price: 34,
    category: "Primi",
    image: truffle,
  },
  {
    id: "margherita",
    name: "Margherita D.O.P.",
    description: "San Marzano tomatoes, mozzarella di bufala, fresh basil.",
    price: 18,
    category: "Primi",
    image: margherita,
  },
  {
    id: "ossobuco",
    name: "Osso Buco Milanese",
    description: "Slow-braised veal shank with saffron risotto and gremolata.",
    price: 32,
    category: "Secondi",
    image: ossobuco,
  },
  {
    id: "bistecca",
    name: "Bistecca alla Fiorentina",
    description: "Dry-aged T-bone, rosemary, Tuscan olive oil, sea salt.",
    price: 85,
    category: "Secondi",
    image: bistecca,
  },
  {
    id: "tiramisu",
    name: "Tiramisù della Casa",
    description: "Espresso-soaked savoiardi, mascarpone cream, bitter cocoa.",
    price: 12,
    category: "Dolci",
    image: tiramisu,
  },
];

export const categories = ["Antipasti", "Primi", "Secondi", "Dolci"] as const;

export type RestaurantEvent = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date
  time: string;
};

const year = new Date().getFullYear();
const month = new Date().getMonth();
const pad = (n: number) => String(n).padStart(2, "0");
const dateIn = (day: number) => `${year}-${pad(month + 1)}-${pad(day)}`;

export const events: RestaurantEvent[] = [
  {
    id: "wine",
    title: "Tuscany Wine Tasting",
    description: "Sommelier-led exploration of Chianti Classico.",
    date: dateIn(8),
    time: "19:30",
  },
  {
    id: "jazz",
    title: "Jazz & Gnocchi Night",
    description: "Live trio performance featuring Luca D'Amico.",
    date: dateIn(14),
    time: "20:00",
  },
  {
    id: "pasta",
    title: "Pasta Masterclass",
    description: "Roll tagliatelle by hand with Chef Marco.",
    date: dateIn(21),
    time: "17:00",
  },
  {
    id: "truffle",
    title: "White Truffle Dinner",
    description: "Five courses built around Alba white truffle.",
    date: dateIn(26),
    time: "19:00",
  },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "order" | "event" | "special";
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Your order is in the oven",
    body: "Chef is finishing the garnish on your Tagliatelle.",
    time: "2 min ago",
    kind: "order",
    unread: true,
  },
  {
    id: "n2",
    title: "Table for two confirmed",
    body: "Friday, 8:00 PM on the terrace.",
    time: "1 hr ago",
    kind: "event",
    unread: true,
  },
  {
    id: "n3",
    title: "New special: White Truffle Dinner",
    body: "Limited to 20 covers — reserve early.",
    time: "Yesterday",
    kind: "special",
    unread: true,
  },
  {
    id: "n4",
    title: "Order #IT-8790 delivered",
    body: "Hope you enjoyed the Osso Buco. Rate your meal?",
    time: "3 days ago",
    kind: "order",
    unread: false,
  },
];

export const orderStages = [
  { label: "Order confirmed", detail: "Kitchen received your order." },
  { label: "In the kitchen", detail: "Chef Marco is preparing your dishes." },
  { label: "Quality check", detail: "Plating and final garnish." },
  { label: "On the way", detail: "Your courier has left Via Roma." },
] as const;
