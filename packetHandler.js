// I-am-autogenerated

import net from "net";
import { parsePacket, writeToJSON } from "./utils.js";
import { log } from "./logger.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath));

const { serverHost, serverPort, maxRetries, resendTimeout } = config;

/**
 * Request missing packets with retry logic and exponential backoff
 * @param {Array} missingSequences - Array of missing sequence numbers
 * @param {Array} receivedPackets - Array of already received packets
 */
export function requestMissingPackets(missingSequences, receivedPackets) {
  log("INFO", "Requesting missing packets...", { missingSequences });

  let retries = {};
  missingSequences.forEach((seq) => (retries[seq] = 0));

  function requestPacket(seq) {
    if (retries[seq] >= maxRetries) {
      log("WARN", `Max retries reached for sequence ${seq}. Skipping.`);
      return;
    }

    const backoff = Math.min(resendTimeout * (2 ** retries[seq]), 10000);  // Exponential backoff
    setTimeout(() => {
      const client = net.createConnection({ host: serverHost, port: serverPort }, () => {
        const requestBuffer = Buffer.alloc(2);
        requestBuffer.writeUInt8(2, 0);
        requestBuffer.writeUInt8(seq, 1);

        log("INFO", `Requesting missing packet for sequence ${seq}`);
        client.write(requestBuffer);
      });

      let buffer = Buffer.alloc(0);

      client.on("data", (data) => {
        buffer = Buffer.concat([buffer, data]);

        while (buffer.length >= 17) {
          const packet = parsePacket(buffer.slice(0, 17));
          if (packet) {
            log("INFO", `Received missing packet for sequence ${packet.sequence}`);
            receivedPackets.push(packet);
          }
          buffer = buffer.slice(17);
        }
      });

      client.on("end", () => {
        log("INFO", `Completed request for sequence ${seq}`);
        client.destroy();

        if (missingSequences.every((s) => receivedPackets.some((p) => p.sequence === s))) {
          writeToJSON(receivedPackets);
        }
      });

      client.on("error", (err) => {
        log("ERROR", `Error requesting packet ${seq}`, { error: err.message });
        retries[seq]++;
        requestPacket(seq);  // Retry the request
      });
    }, backoff);
  }

  missingSequences.forEach(requestPacket);
}
