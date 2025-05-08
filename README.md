BetaCrew Exchange Client - Node.js Take Home Test
A Node.js client application that connects to the BetaCrew Mock Exchange Server, receives stock ticker data, handles missing sequences, and outputs the data to a JSON file.

✅ Table of Contents

Introduction
Features
Requirements
Installation
Configuration
Running the Application
Output and Logs
Implementation Details
Error Handling and Logging
Future Enhancements
Contact


📦 Introduction
The BetaCrew Exchange Client is a Node.js application designed to interact with the BetaCrew Mock Exchange Server, simulate real-time stock data streaming, and handle missing data packets by requesting specific sequences.

🌟 Features

Connects to the BetaCrew Exchange Server via TCP.
Streams all available data packets using the Stream All Packets request.
Identifies missing sequences and requests them using the Resend Packet request.
Implements robust error handling with exponential backoff for resend requests.
Outputs complete data to a JSON file, ensuring no missing sequences.
Detailed logging with timestamps and context.


🛠️ Requirements

Node.js v16.17.0 or higher
Git
A terminal/command prompt


📂 Installation

Clone the Repository:

git clone https://github.com/hemraj-007/betacrew_exchange_client.git
cd betacrew_exchange_client


Install Dependencies:

npm install


⚙️ Configuration
Configuration is managed through the config.json file. The default configuration is:
{
  "serverHost": "localhost",
  "serverPort": 3000,
  "maxRetries": 3,
  "resendTimeout": 2000
}


serverHost: Hostname of the BetaCrew Exchange Server.
serverPort: Port number for the server connection.
maxRetries: Maximum number of resend attempts for missing packets.
resendTimeout: Time in milliseconds between resend attempts (with exponential backoff).


🚀 Running the Application
Start the Server
Navigate to the betacrew_exchange_server directory and run:
node main.js

Run the Client
In a separate terminal, navigate to the client directory and execute:
node client.js


📦 Output and Logs
The client outputs the received data to data/output.json in the following format:
[
  {
    "symbol": "AAPL",
    "indicator": "B",
    "quantity": 50,
    "price": 100,
    "sequence": 1
  },
  {
    "symbol": "META",
    "indicator": "S",
    "quantity": 30,
    "price": 55,
    "sequence": 6
  }
]

Detailed logs are stored in logs.txt with the following structure:
2025-05-08T17:19:33.640Z [INFO] Connected to server {}
2025-05-08T17:19:33.643Z [INFO] Missing Sequences {"missingSequences":[6,7,8]}
2025-05-08T17:19:35.648Z [INFO] Requesting missing packet for sequence 6 {}
2025-05-08T17:19:35.650Z [INFO] Received missing packet for sequence 6 {}


🛠️ Implementation Details
The project is divided into the following modules:

client.js: Main entry point for the application.
packetHandler.js: Handles resend logic and missing sequence processing.
utils.js: Utility functions for data parsing and file writing.
logger.js: Structured logging with timestamps and context.


⚡ Error Handling and Logging

Implements exponential backoff strategy for resend requests.
Handles server disconnections and unexpected errors gracefully.
Logs all operations with structured context in logs.txt.


🚀 Future Enhancements

Implement data integrity checks to handle conflicting data packets.
Add configurable logging levels (INFO, WARN, ERROR).
Implement user notifications for critical errors.
Enhance packet validation to detect malformed data.


📞 Contact
For any queries or further assistance, please contact:
Hemraj Bhatia📧 hemrajbhatia38@gmail.com📞 +91 91191 24953🔗 GitHub | LinkedIn
