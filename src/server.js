const { connectDb } = require("../config/db");
const app = require("./index,js");

const PORT = 5454;
app.listen(PORT, async () => {
  await connectDb();
  console.log("ecommerce api listening on PORT: ", PORT);
});
