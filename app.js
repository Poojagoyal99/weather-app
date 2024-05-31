import express from"express";
import axios from "axios";
const app = express();

//set view engine to EJS
app.set("view engine", "ejs");

//serve the public folder as static file
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/",async function (req, res) {
        //get city
        const city = req.query.city;
        const apikey = "bf65654c66e3947b50c6a96928fc7869";

        //add logic
        const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        let weather;
        let error = null;
        try {
            const response = await axios.get(APIUrl);
            weather = response.data;
        }
        catch (error) {
            weather = null;
            error = "Error, Please try again";
        }
        //Render the index template with the weather data and error message
        res.render("index", { weather, error });
    });
//start server
const port = process.env.PORT || 3000;
app.listen(port,()=> {
    console.log(`App is runing on port ${port}`);
});