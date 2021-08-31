import clientPromise from "@/util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("drone-delivery");
  const data = await db.collection("users").find({}).limit(20).toArray();

  res.json(data);
}
