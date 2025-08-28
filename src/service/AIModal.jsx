// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

const tools = [
  {
    googleSearch: {},
  },
];

export const config = {
  tools,
  responseMimeType: "application/json",
};

export const model = "gemini-2.0-flash";

export const getContents = (userPrompt) => {
  return [
    {
      role: "user",
      parts: [
        {
          text: `Generate travel plan for location: Goa, India for 3 days for A Couple with a Moderate budget. Give me a hotels options list with hotel name, hotel address, price, hotel image URL, geo-coordinates, rating, descriptions, and suggest itinerary with place name. Place details, place image URL, geo-coordinates.  ticket pricing, rating, time travel each of location for 3 days with each day plan with best time to visit only just give in JSON format and nothing else.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `
\`\`\`json
{
  "travelPlan": {
    "destination": "Goa, India",
    "duration": "3 days",
    "budget": "Moderate",
    "travelers": "Couple",
    "bestTimeToVisitGoa": "November to February (pleasant weather) or June to September (lush greenery, fewer tourists, and discounts) [3, 4]",
    "hotelOptions": [
      {
        "hotelName": "Taj Resort & Convention Centre Goa",
        "hotelAddress": "Dona Paula, Goa",
        "price": "₹8,000 - ₹15,000 per night (estimated)",
        "hotelImageURL": "https://example.com/taj_goa.jpg",
        "geoCoordinates": {
          "latitude": 15.4512,
          "longitude": 73.8175
        },
        "rating": 4.6,
        "description": "A luxury resort with stunning views and excellent amenities [15]."
      },
      {
        "hotelName": "Cidade de Goa",
        "hotelAddress": "Vainguinim Beach, Goa",
        "price": "₹6,000 - ₹12,000 per night (estimated)",
        "hotelImageURL": "https://example.com/cidade_de_goa.jpg",
        "geoCoordinates": {
          "latitude": 15.4667,
          "longitude": 73.8
        },
        "rating": 4.4,
        "description": "A charming resort with a Portuguese influence [15]."
      },
      {
        "hotelName": "The Postcard Inn, Candolim",
        "hotelAddress": "Candolim, Goa",
        "price": "₹5,000 - ₹10,000 per night (estimated)",
        "hotelImageURL": "https://example.com/postcard_candolim.jpg",
        "geoCoordinates": {
          "latitude": 15.5167,
          "longitude": 73.75
        },
        "rating": 4.3,
        "description": "A boutique hotel with a focus on personalized service [15]."
      },
      {
        "hotelName": "Radisson Blu Resort Goa Cavelossim",
        "hotelAddress": "Cavelossim, Goa",
        "price": "₹4,000 - ₹8,000 per night (estimated)",
        "hotelImageURL": "https://example.com/radisson_cavelossim.jpg",
        "geoCoordinates": {
          "latitude": 15.2167,
          "longitude": 73.9667
        },
        "rating": 4.2,
        "description": "A comfortable resort with good facilities [15]."
      },
      {
        "hotelName": "Ticlo Resorts",
        "hotelAddress": "Goa",
        "price": "₹2,000 - ₹4,000 per night (estimated)",
        "hotelImageURL": "https://example.com/ticlo_resorts.jpg",
        "geoCoordinates": {
          "latitude": 15.5,
          "longitude": 73.83
        },
        "rating": 4,
        "description": "A good resort with comfortable amenities [16]."
      },
      {
        "hotelName": "Alagoa Resort",
        "hotelAddress": "Betalbatim, Goa",
        "price": "₹1,500 - ₹3,500 per night (estimated)",
        "hotelImageURL": "https://example.com/alagoa_resort.jpg",
        "geoCoordinates": {
          "latitude": 15.2439,
          "longitude": 73.9514
        },
        "rating": 3.8,
        "description": "Located a short walk from Betalbatim Beach [16]."
      },
      {
        "hotelName": "Hotel Z Square",
        "hotelAddress": "Vasco Da Gama, Goa",
        "price": "₹1,200 - ₹3,000 per night (estimated)",
        "hotelImageURL": "https://example.com/hotelzsquare.jpg",
        "geoCoordinates": {
          "latitude": 15.3833,
          "longitude": 73.8333
        },
        "rating": 3.5,
        "description": "Located a short drive from Goa Dabolim International Airport [16]."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "North Goa Exploration",
        "activities": [
          {
            "placeName": "Calangute Beach",
            "placeDetails": "Famous for water sports; can be crowded [5, 13].",
            "placeImageURL": "https://example.com/calangute_beach.jpg",
            "geoCoordinates": {
              "latitude": 15.5318,
              "longitude": 73.7676
            },
            "ticketPricing": "Free entry; water sports extra (₹500-₹1500 per activity)",
            "rating": 4,
            "timeToTravel": "30-45 minutes from Panaji",
            "bestTimeToVisit": "10:00am to 01:00pm"
          },
          {
            "placeName": "Fort Aguada",
            "placeDetails": "Historic Portuguese fort with panoramic views [5, 9].",
            "placeImageURL": "https://example.com/fort_aguada.jpg",
            "geoCoordinates": {
              "latitude": 15.4969,
              "longitude": 73.7568
            },
            "ticketPricing": "Free entry",
            "rating": 4.2,
            "timeToVisit": "03:00pm to 05:00pm",
            "timeToTravel": "15-20 minutes from Calangute Beach",
            "bestTimeToVisit": "03:00pm to 05:00pm"
          },
          {
            "placeName": "Chapora Fort",
            "placeDetails": "Scenic views of Vagator Beach [2].",
            "placeImageURL": "https://example.com/chapora_fort.jpg",
            "geoCoordinates": {
              "latitude": 15.5997,
              "longitude": 73.7367
            },
            "ticketPricing": "Free entry",
            "rating": 4.1,
            "timeToVisit": "05:30pm to 06:30pm",
            "timeToTravel": "30 minutes from Fort Aguada",
            "bestTimeToVisit": "05:00pm to 06:30pm"
          },
          {
            "placeName": "Anjuna Flea Market",
            "placeDetails": "A vibrant flea market [9].",
            "placeImageURL": "https://example.com/anjuna_market.jpg",
            "geoCoordinates": {
              "latitude": 15.5732,
              "longitude": 73.7347
            },
            "ticketPricing": "Free entry",
            "rating": 4.2,
            "timeToVisit": "11:00am to 06:00pm (Wednesday only)",
            "timeToTravel": "15 minutes from Chapora Fort",
            "bestTimeToVisit": "11:00am to 06:00pm"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Historical and Cultural Goa",
        "activities": [
          {
            "placeName": "Basilica of Bom Jesus",
            "placeDetails": "UNESCO World Heritage Site, baroque architecture [5, 9].",
            "placeImageURL": "https://example.com/basilica_bom_jesus.jpg",
            "geoCoordinates": {
              "latitude": 15.5008,
              "longitude": 73.9138
            },
            "ticketPricing": "Free entry",
            "rating": 4.5,
            "timeToTravel": "1 hour from Vagator",
            "bestTimeToVisit": "09:00am to 11:00am"
          },
          {
            "placeName": "Se Cathedral",
            "placeDetails": "One of the largest churches in Asia [11].",
            "placeImageURL": "https://example.com/se_cathedral.jpg",
            "geoCoordinates": {
              "latitude": 15.5,
              "longitude": 73.9167
            },
            "ticketPricing": "Free entry",
            "rating": 4.3,
            "timeToTravel": "5 minutes from Basilica of Bom Jesus",
            "bestTimeToVisit": "11:00am to 12:00pm"
          },
          {
            "placeName": "Fontainhas (Latin Quarter)",
            "placeDetails": "Colorful houses and narrow streets [9, 11].",
            "placeImageURL": "https://example.com/fontainhas.jpg",
            "geoCoordinates": {
              "latitude": 15.4959,
              "longitude": 73.8279
            },
            "ticketPricing": "Free (walking tour may have a cost)",
            "rating": 4.2,
            "timeToTravel": "30 minutes from Se Cathedral",
            "bestTimeToVisit": "04:00pm to 06:00pm"
          },
          {
            "placeName": "Dudhsagar Falls",
            "placeDetails": "A four-tiered waterfall on the Mandovi River [18].",
            "placeImageURL": "https://example.com/dudhsagar_falls.jpg",
            "geoCoordinates": {
              "latitude": 15.3167,
              "longitude": 74.3167
            },
            "ticketPricing": "₹400 per person (Jeep Safari)",
            "rating": 4.4,
            "timeToTravel": "2 hours from Panaji",
            "bestTimeToVisit": "09:00am to 03:00pm"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Relaxation in South Goa",
        "activities": [
          {
            "placeName": "Palolem Beach",
            "placeDetails": "Calm waters and scenic beauty [2, 5, 9].",
            "placeImageURL": "https://example.com/palolem_beach.jpg",
            "geoCoordinates": {
              "latitude": 15.0077,
              "longitude": 74.0258
            },
            "ticketPricing": "Free entry",
            "rating": 4.4,
            "timeToTravel": "1.5-2 hours from Panaji",
            "bestTimeToVisit": "10:00am to 01:00pm"
          },
          {
            "placeName": "Colva Beach",
            "placeDetails": "Adventure sports [2].",
            "placeImageURL": "https://example.com/colva_beach.jpg",
            "geoCoordinates": {
              "latitude": 15.2744,
              "longitude": 73.9576
            },
            "ticketPricing": "Free entry; water sports extra",
            "rating": 4,
            "timeToTravel": "45 minutes - 1 hour from Palolem Beach",
            "bestTimeToVisit": "02:00pm to 04:00pm"
          },
          {
            "placeName": "Benaulim Beach (Sunset)",
            "placeDetails": "Relaxing sunset [2].",
            "placeImageURL": "https://example.com/benaulim_beach.jpg",
            "geoCoordinates": {
              "latitude": 15.2574,
              "longitude": 73.9494
            },
            "ticketPricing": "Free entry",
            "rating": 4.3,
            "timeToTravel": "15 minutes from Colva Beach",
            "bestTimeToVisit": "05:00pm to 06:30pm"
          },
          {
            "placeName": "Saturday Night Market",
            "placeDetails": "A night market [19].",
            "placeImageURL": "https://example.com/saturday_night_market.jpg",
            "geoCoordinates": {
              "latitude": 15.5667,
              "longitude": 73.7333
            },
            "ticketPricing": "Free entry",
            "rating": 4.1,
            "timeToTravel": "1 hour from Benaulim Beach",
            "bestTimeToVisit": "06:00pm to 11:00pm (Saturday only)"
          }
        ]
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: userPrompt,
        },
      ],
    },
  ];
};
