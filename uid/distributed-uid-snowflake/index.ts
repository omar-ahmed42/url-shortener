import { Uid, UidConfiguration, UidGenerator } from "./uid";

const uidConfiguration: UidConfiguration = new UidConfiguration(1, 1);
const uidGenerator: UidGenerator = new UidGenerator(uidConfiguration);

function print(id: Uid) {
  console.log("Timestamp: ", id.getTimestamp());
  console.log("dataCenter: ", id.getDataCenter());
  console.log("node: ", id.getNode());
  console.log("sequence: ", id.getSequence());
  console.log(
    `(${id.getTimestamp()} + ${id.getDataCenter()} + ${id.getNode()} + ${id.getSequence()}) - ${id.getId()}`
  );
  console.log("Id: " + id.getId());
}

for (let i = 0; i < 100; i++) {
  print(uidGenerator.generate());
}
