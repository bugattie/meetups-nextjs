import { connectToDatabase } from "../../utils/mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { client, db } = await connectToDatabase();

    const meetupsCollection = db.collection("meetup");
    const result = await meetupsCollection.insertOne(req.body);

    res.status(200).json({ message: "Meetup Inserted successfully!" });
  }
}

export default handler;
