import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: './.env'
})


connectDb()
  .then(() => {

    app.on("error", (error) => {
      console.log("Error:", error);
      process.exit(1);

    })

    app.listen(process.env.PORT || 4800, () => {
      console.log("Server is running at port: ", process.env.PORT);

    })

  })
  .catch((error) => {

    console.log("MOndodb Connection failed!!", error);

  })


