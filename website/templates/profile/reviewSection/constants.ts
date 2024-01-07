export const reviews = [
  {
    name: "Rahul",
    url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
    review:
      "The class was amazing. Megha explains everything in depth and is truly a master in the art",
    rating: 4.5,
    heading: "Masterclass experience",
  },
  {
    name: "David",
    url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
    review:
      "Megha gives great personal attention. The only issue for me is the timezone",
    rating: 5,
    heading: "Personal experience",
  },
];

export interface review {
  name: string;
  url: string;
  review: string;
  rating: number;
  heading: string;
}

export const totalRating = 4.9;
export const ratingSplit = [0.67, 0.14, 0.05, 0.03, 0.01];
export const numRatings = 224;
