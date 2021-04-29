const Arweave = require("arweave");
const { interactWrite } = require("smartweave");
const fs = require("fs");

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const wallet = JSON.parse(fs.readFileSync("./arweave.json"));

(async () => {
  const id = await interactWrite(
    client,
    wallet,
    "Z9cS3JWfTAjO44oLTBueyJKb0C9PxpH0XrblzA5O94Q",
    {
      function: "claim",
      username: "", // TODO
      name: "", // TODO
      addresses: [], // TODO (optional)
      image: "", // TODO
    }
  );
  console.log(id);
})();
