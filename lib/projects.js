import zevSignedInDesktop from "@/assets/projects/zev/chat-signed-in-desktop.png";
import zevLandingDesktop from "@/assets/projects/zev/landing-desktop.png";
import openstayListingsDesktop from "@/assets/projects/openstay/listings-desktop.jpg";
import openstaySignedInDesktop from "@/assets/projects/openstay/listings-signed-in-desktop.png";
import biteGameDesktop from "@/assets/projects/bitesnake/game-desktop.png";
import biteLeaderboardDesktop from "@/assets/projects/bitesnake/leaderboard-desktop.png";
import nidsPipeline from "@/assets/projects/nids/pipeline.svg";
import nidsPreview from "@/assets/projects/nids/preview.png";

// Numbers come from each project's own README, code or results files.

export const keyNumberKinds = {
  result: "Measured result",
  design: "Design figure",
};

export const projects = [
  {
    slug: "zev",
    title: "Zev",
    tagline: "An AI chatbot with streaming replies, cited web search and saved chats.",
    description:
      "Zev is an AI chatbot I built with Next.js 16 and React 19. It streams replies from Groq, can search the web through Tavily and cite its sources, and saves each user's chats after Google sign-in. Chat queries are scoped to the signed-in user, and integration tests prove one user can't read another's chats.",
    chips: ["Next.js", "Groq", "Auth.js", "Postgres"],
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS",
      "Auth.js (NextAuth)",
      "Prisma",
      "Neon Postgres",
      "Groq SDK",
      "Tavily",
      "Vitest",
      "Vercel",
    ],
    live: {
      url: "https://zev-ten.vercel.app",
      note: "Google sign-in is needed to chat.",
    },
    github: "https://github.com/Anurag-2312/Zev",
    overview:
      "Zev is a chat app for talking to a large language model. After Google sign-in, answers stream in from Groq as they're written, an optional web search adds numbered citations from Tavily, and every conversation is saved at its own URL with an auto-generated title. I moved it from Supabase to Neon, Prisma and NextAuth, which meant rebuilding the per-user data protection in code.",
    features: [
      "Replies stream from Groq, so answers appear as they're written.",
      "Optional web search through Tavily, with numbered source citations in the answer.",
      "Google sign-in through Auth.js, with every chat saved at its own URL and titled automatically.",
      "Per-user rate limits and a daily token budget, both stored in Postgres.",
    ],
    howItWorks: [
      "The chat route first checks that the request comes from Zev's own origin and carries a signed-in session. Then it applies the per-user rate limit and the daily token budget.",
      "With web search on, the route queries Tavily and passes the results to the model, which cites them by number.",
      "Replies stream back as plain text. Saving the messages and generating the chat title run in Next.js after(), which keeps the function alive until the writes finish. Before that change, Vercel could suspend the function once the stream closed and lose the chat history.",
      "Supabase used to enforce per-user access with row-level security. Prisma has no equivalent, so every query in the data layer filters by the user's id, and the integration tests check that one user can't read or delete another's chats.",
      "The rate limiter counts each user's messages in Postgres with an atomic increment, so parallel requests can't race past the limit. It clears old windows in the same call, so no cron job is needed.",
    ],
    keyNumbers: [
      { value: "10", label: "messages per user every 60 seconds", kind: "design" },
      { value: "15,000", label: "tokens per user per day", kind: "design" },
      {
        value: "10",
        label: "integration tests, including one proving a user can't read another user's chats",
        kind: "design",
      },
    ],
    screenshots: [
      {
        src: zevSignedInDesktop,
        alt: "A signed-in Zev chat: the sidebar lists saved conversations, and the assistant answers a greeting, with the web search toggle at the top right.",
        caption: "A signed-in chat, with saved conversations in the sidebar.",
      },
      {
        src: zevLandingDesktop,
        alt: "Zev's landing page with a Log in button and a Continue as guest link.",
        caption: "The landing page.",
      },
    ],
    preview: zevSignedInDesktop,
  },
  {
    slug: "openstay",
    title: "OpenStay",
    tagline: "A vacation-rental web app with photo uploads, maps and reviews.",
    description:
      "OpenStay is a vacation-rental web app: browse stays, list your own with a photo and a location, and review places you've visited. I built it with Express 5, MongoDB and EJS, with Passport sessions stored in MongoDB. Each address is geocoded through Photon and pinned on a Leaflet map.",
    chips: ["Express", "MongoDB", "EJS", "Leaflet"],
    stack: [
      "Node.js",
      "Express 5",
      "MongoDB Atlas",
      "Mongoose",
      "EJS",
      "Passport",
      "Cloudinary",
      "Multer",
      "Joi",
      "Helmet",
      "Photon",
      "Leaflet",
      "Bootstrap",
      "Render",
    ],
    live: {
      url: "https://openstay-74td.onrender.com/listings",
      note: "The free host can take up to a minute to wake up, and opening a listing needs a free account.",
    },
    liveFallback: "If the demo is slow to wake, the screenshots below show the same pages.",
    github: "https://github.com/Anurag-2312/OpenStay",
    overview:
      "OpenStay is a full-stack vacation-rental app I built with Express 5 and MongoDB. Anyone can browse and search the stays. With a free account you can open a listing to see its map and reviews, post your own stay with a photo, and review places you've visited.",
    features: [
      "Listings with a photo uploaded to Cloudinary. Only a listing's owner can edit or delete it.",
      "Reviews with star ratings. Only a review's author can delete it.",
      "Search by title, location, country or description, plus category filters.",
      "Every address geocoded through Photon and shown on a Leaflet map.",
      "Signup, login and password change through Passport, with sessions kept in MongoDB.",
    ],
    howItWorks: [
      "Express 5 renders EJS pages on the server. Passport handles signup and login, and connect-mongo keeps the sessions in MongoDB.",
      "Request bodies are sanitized and checked against Joi schemas before they reach Mongoose, and Helmet sets the security headers. Login, signup and password change are rate-limited, and the redirect after login is checked so it can't send anyone to another site.",
      "Photos go through Multer straight to Cloudinary. When a stay is saved, its location is geocoded with the Photon API and stored as a GeoJSON point, which the listing page draws on a Leaflet map.",
      "A seed script picks 8 sample stays, geocodes them and loads them for the demo.",
      "Browsing is public, but the route for a single listing is guarded by an isLoggedIn check, so opening one needs an account.",
    ],
    keyNumbers: [
      {
        value: "8",
        label: "sample stays geocoded and loaded by the seed script",
        kind: "design",
      },
    ],
    screenshots: [
      {
        src: openstayListingsDesktop,
        alt: "OpenStay's listings page: a search bar, category filters, and cards for stays such as a villa in Tuscany, a loft in New York and a castle in Scotland, each with a nightly price.",
        caption: "The public listings page, with search and category filters.",
      },
      {
        src: openstaySignedInDesktop,
        alt: "OpenStay's listings page while signed in: a Log out button, the account name and cards for stays with nightly prices.",
        caption: "The listings page while signed in.",
      },
    ],
    preview: openstayListingsDesktop,
  },
  {
    slug: "bitesnake",
    title: "BiteSnake",
    tagline: "Snake for the browser, with special fruits, obstacles and a global leaderboard.",
    description:
      "BiteSnake is a Snake game I built in vanilla JavaScript and HTML Canvas, with no build step. Pick Easy, Medium or Hard, steer with the keyboard or by swiping, and chase special fruits that add points, cost points or change your speed. Scores go to a global Firestore leaderboard.",
    chips: ["JavaScript", "HTML Canvas", "Firestore"],
    stack: ["JavaScript (ES modules)", "HTML Canvas", "CSS", "Firebase Firestore", "Vercel"],
    live: { url: "https://bite-snake.vercel.app" },
    github: "https://github.com/Anurag-2312/BiteSnake",
    overview:
      "BiteSnake is classic Snake, rebuilt for the browser with plain JavaScript modules and an HTML canvas. It runs as a static site with no build step, plays with a keyboard or touch swipes, and keeps a global leaderboard for each difficulty in Firebase Firestore.",
    features: [
      "Three difficulties: Easy has no obstacles, Medium starts with 12 and Hard with 25, and Medium and Hard add more as your score climbs.",
      "Special fruits: a golden apple for bonus points, a cherry worth extra, and a poison fruit that slows you down and costs you points.",
      "Arrow keys or WASD on a keyboard, swipes on a phone.",
      "A global top-scores board for each difficulty, plus your best score saved in the browser.",
    ],
    howItWorks: [
      "The code is split into ES modules: an engine for the game loop and input, classes for the snake, fruits and obstacles, a canvas renderer, a screen manager and a leaderboard client.",
      "The board is a 30×30 grid. Each tick moves the snake a cell and checks for walls, obstacles and its own body, and the snake speeds up as the score rises.",
      "Special fruits spawn on a timer and disappear if you don't reach them in time, sooner at higher scores.",
      "When a game ends, you can submit your name and score to Firestore. The leaderboard reads back the top scores for each difficulty.",
    ],
    keyNumbers: [
      { value: "30×30", label: "cells on the board", kind: "design" },
      { value: "3", label: "difficulty levels", kind: "design" },
      { value: "0 / 12 / 25", label: "starting obstacles on Easy, Medium and Hard", kind: "design" },
    ],
    screenshots: [
      {
        src: biteGameDesktop,
        alt: "A Medium game in progress: a green snake, scattered obstacles, an apple and a purple poison fruit, with the score, high score and level above the board.",
        caption: "A Medium game in progress.",
      },
      {
        src: biteLeaderboardDesktop,
        alt: "The Medium leaderboard with five scores; other players' names are blurred.",
        caption: "Top scores for each difficulty, read from Firestore.",
      },
    ],
    preview: biteGameDesktop,
  },
  {
    slug: "nids",
    title: "NIDS",
    tagline: "Network intrusion detection from packet captures, using a 2D CNN with OpenMax.",
    description:
      "NIDS is a network intrusion detection system that classifies traffic from packet captures. A React dashboard sends a PCAP to a FastAPI orchestrator, which runs flow extraction, preprocessing, a 2D CNN with OpenMax, and a decision engine that rates severity. Trained on CICIDS2017, the model reaches 93.82% overall accuracy.",
    chips: ["Python", "FastAPI", "TensorFlow", "React"],
    stack: [
      "Python",
      "FastAPI",
      "TensorFlow / Keras",
      "scikit-learn",
      "CICFlowMeter",
      "Docker",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
    live: null,
    github: "https://github.com/Anurag-2312/NIDS-mini-project",
    overview:
      "NIDS takes a packet capture (PCAP), turns it into network flows, and labels each flow as normal traffic or a known attack: DoS, brute force, port scan, botnet or web attack. An OpenMax layer is meant to flag flows that match no known class as unknown. The model was trained on the CICIDS2017 dataset.",
    features: [
      "PCAP upload from a React dashboard, with the verdict shown in the browser.",
      "Flow extraction with CICFlowMeter, running in Docker.",
      "A 2D CNN that labels each flow as normal traffic or one of the known attack classes.",
      "OpenMax open-set recognition, meant to flag attacks the model was not trained on.",
      "A decision engine that turns the model's findings and network context into a severity verdict and alerts.",
      "A testing page for calling each service on its own.",
    ],
    howItWorks: [
      "The React dashboard uploads a PCAP to the FastAPI orchestrator, which calls each service in turn.",
      "The CICFlowMeter service, running in Docker, converts the capture into a CSV of flow features.",
      "The preprocessing service cleans and scales those features and reports what it found. The model service applies its own feature selection and scaling to the same CSV before inference.",
      "The 2D CNN classifies every flow, and OpenMax checks whether each one is close enough to a known class or should be called unknown.",
      "The decision engine weighs the findings against context such as the network zone and how critical the asset is, and returns a severity verdict and alerts to the dashboard.",
    ],
    diagram: {
      src: nidsPipeline,
      alt: "Diagram of the NIDS pipeline.",
      caption:
        "The six stages, top to bottom: React dashboard, FastAPI orchestrator, CICFlowMeter service, preprocessing service, model service (2D CNN with OpenMax) and decision engine. The orchestrator calls each service in turn.",
    },
    keyNumbers: [
      { value: "93.82%", label: "overall accuracy on the CICIDS2017 test flows", kind: "result" },
      { value: "0.85", label: "macro AUC", kind: "result" },
      { value: "0.86", label: "F1 score for DoS", kind: "result" },
      { value: "0.90", label: "F1 score for PortScan", kind: "result" },
    ],
    // From trained_models/cnn_openmax/performance_metrics.csv.
    classF1: [
      { label: "Normal", f1: 0.96 },
      { label: "PortScan", f1: 0.9 },
      { label: "DoS", f1: 0.86 },
      { label: "Brute Force", f1: 0.67 },
      { label: "Botnet", f1: 0.12 },
    ],
    screenshots: [],
    preview: nidsPreview,
  },
];
