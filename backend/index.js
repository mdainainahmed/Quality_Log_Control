const express = require("express");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = 8000;

// Log directory
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Use the cors middleware to allow all CORS requests
app.use(cors());
// app.use(cors(
//   {
//     origin: ["https://deploy-quality-log-control-api.app"],
//     methods: ["GET"],
//     credentials: true
//   }
// ));

app.get("/", (req, res) => {
  res.send("Hello! Server is Up")
})

// Middleware to log requests
app.use((req, res, next) => {
  const logData = {
    level: "info",
    log_string: `Request received: ${req.method} ${req.url}`,
    timestamp: new Date().toISOString(),
    metadata: {
      source: "request.log",
    },
  };
  const logFilePath = path.join(logDir, "request.log");
  fs.appendFileSync(logFilePath, JSON.stringify(logData) + "\n");
  next();
});

// Mock API routes
app.get("/api_1", (req, res) => {
  const response = logAPICall("api1", "API 1 called", getRandomLogLevel());
  res.send(`API 1 response\n${response}`);
});

app.get("/api_2", (req, res) => {
  const response = logAPICall("api2", "API 2 called", getRandomLogLevel());
  res.send(`API 2 response\n${response}`);
});

app.get("/api_3", (req, res) => {
  const response = logAPICall("api3", "API 3 called", getRandomLogLevel());
  res.send(`API 3 response\n${response}`);
});

app.get("/api_4", (req, res) => {
  const response = logAPICall("api4", "API 4 called", getRandomLogLevel());
  res.send(`API 4 response\n${response}`);
});

app.get("/api_5", (req, res) => {
  const response = logAPICall("api5", "API 5 called", getRandomLogLevel());
  res.send(`API 5 response\n${response}`);
});

app.get("/api_6", (req, res) => {
  const response = logAPICall("api6", "API 6 called", getRandomLogLevel());
  res.send(`API 6 response\n${response}`);
});

app.get("/api_7", (req, res) => {
  const response = logAPICall("api7", "API 7 called", getRandomLogLevel());
  res.send(`API 7 response\n${response}`);
});

app.get("/api_8", (req, res) => {
  const response = logAPICall("api8", "API 8 called", getRandomLogLevel());
  res.send(`API 8 response\n${response}`);
});

app.get("/api_9", (req, res) => {
  const response = logAPICall("api9", "API 9 called", getRandomLogLevel());
  res.send(`API 9 response\n${response}`);
});

// Function to log API calls
function logAPICall(apiName, message, level = "info") {
  const logData = {
    level: level,
    log_string: message,
    timestamp: new Date().toISOString(),
    metadata: {
      source: `${apiName}.log`,
    },
  };
  const logFilePath = path.join(logDir, `${apiName}.log`);
  fs.appendFileSync(logFilePath, JSON.stringify(logData) + "\n");
  // sending log data
  return JSON.stringify(logData);
}

// Function to get random log level (error, success, or info)
function getRandomLogLevel() {
  const random = Math.random();
  if (random < 0.3) {
    return "error";
  } else if (random < 0.6) {
    return "success";
  } else {
    return "info";
  }
}

// Query logs route
app.get("/logs", (req, res) => {
  const logs = [];
  const logFiles = fs.readdirSync(logDir);
  for (const logFile of logFiles) {
    const fileStream = fs.createReadStream(path.join(logDir, logFile));
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      logs.push(JSON.parse(line));
    });
  }
  res.json(logs);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
