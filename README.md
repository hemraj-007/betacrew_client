# BetaCrew Exchange Client - Node.js Take Home Test

A Node.js client application that connects to the BetaCrew Mock Exchange Server, receives stock ticker data, handles missing sequences, and outputs the data to a JSON file.

---

## 🚀 Tech Stack

* **Node.js**
* **TCP Socket Communication**
* **Big Endian Data Handling**
* **Data Parsing and Sequence Management**
* **Error Handling and Logging**

---

## ⚡ Approach

* The client connects to the BetaCrew Exchange Server over a TCP connection.
* Requests all packets using the `Stream All Packets` request.
* Identifies missing sequences after the initial data stream.
* Requests missing packets using the `Resend Packet` request.
* Outputs the complete data to `data/output.json`.

---

## 🛠️ Setup and Running the Project

### 1. Clone the Repository:

```bash
git clone https://github.com/hemraj-007/betacrew_client.git
cd betacrew_exchange_client
```

### 2. Install Dependencies:

```bash
npm install
```

### **1. Start the Server:**

* The server is provided as a zip file named `betacrew_exchange_server.zip` in the assignment description.
* Extract the zip file to a separate directory.
* Open a terminal and navigate to the extracted server folder:

```bash
cd /path/to/betacrew_exchange_server
```

Initialize the server project with:

```bash
npm init -y
```

Then, run the server using:

```bash
node main.js
```

Ensure the server is running before starting the client.

### 4. Run the Client:

In a separate terminal, run:

```bash
node client.js
```

✅ **Output:** The received data is stored in `data/output.json`.

Detailed logs are stored in `logs.txt`.
