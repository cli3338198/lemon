import { NextApiRequest, NextApiResponse } from "next";
// This hack works!
const ivm = eval("require")("isolated-vm");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { code } = req.body;
      const isolate = new ivm.Isolate({ memoryLimit: 128 });
      const context = isolate.createContextSync();
      const script = isolate.compileScriptSync(code);
      const result = script.runSync(context);
      res.status(200).json({ result });
    } catch (err: unknown) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
