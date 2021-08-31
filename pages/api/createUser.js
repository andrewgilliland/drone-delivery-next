import clientPromise from "@/util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("drone-delivery");

  const data = req.query;

  const response = db.collection("users").insertOne(data);

  res.json(response);
}
