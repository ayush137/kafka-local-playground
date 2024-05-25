import express from "express";
import { Kafka, CompressionTypes } from "kafkajs";

const app = express();
app.use(express.json());

const dbsAreRunning = async () => {
  app.listen(8080);
  const kafka = new Kafka({
    brokers: [`${process.env.KAFKA_BOOTSTRAP_SERVERS}`],
    clientId: "example-producer",
  });

  const producer = kafka.producer();

  await producer.connect();

  const sendMessage = async (message) => {
    return await producer
      .send({
        topic: "hello",
        compression: CompressionTypes.GZIP,
        messages: [
          {
            key: `key-${1}`,
            value: JSON.stringify(message),
          },
        ],
      })
      .then(console.log)
      .catch((e) => console.error(`[example/producer] ${e.message}`, e));
  };

  app.get("/:id", (req, res) => {
    sendMessage(req.params);
    console.log("hit");
    return res.send({ data: JSON.stringify(req.params?.id) });
  });
};
dbsAreRunning();
