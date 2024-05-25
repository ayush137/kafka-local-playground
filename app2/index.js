import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: [`${process.env.KAFKA_BOOTSTRAP_SERVERS}`],
  clientId: "example-consumer",
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "hello", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`- ${topic}#${message.value}`);
    },
  });
};

run().catch((e) => console.error(`[example/consumer] ${e.message}`, e));
