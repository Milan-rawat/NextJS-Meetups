import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const DB = process.env.DATABASE_URL.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    const client = await MongoClient.connect(DB);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      status: "success",
      message: "Meetup Created!",
    });
  }
}

export default handler;
