import clientPromise from "@/util/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("drone-delivery");

  const response = await db
    .collection("users")
    .aggregate([
      {
        $search: {
          search: {
            query: req.query.term,
            path: ["name"], // Add the fields you want to be searched to this array
          },
        },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  res.json(response);
}
