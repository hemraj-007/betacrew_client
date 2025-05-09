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
git clone [Insert GitHub Link Here]
cd betacrew_exchange_client
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Start the Server:

Navigate to the server directory and run:

```bash
cd /path/to/betacrew_exchange_server
node main.js
```

### 4. Run the Client:

In a separate terminal, run:

```bash
node client.js
```

✅ **Output:**
The received data is stored in `data/output.json`.

Detailed logs are stored in `logs.txt`.
