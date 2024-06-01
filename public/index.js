const  express = require("express") 
const  axios = require ("axios")
const bodyParser = require ("body-parser")

let app = express();
let port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=favorite"
  );
  const result = response.data.data;
  res.render("index.ejs", { data: result });
});

app.get("/popularity", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
  );
  const result = response.data.data;
  res.render("index.ejs", { data: result });
});

app.get("/upcoming", async (req, res) => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/anime?filter=upcoming"
    );
    const result = response.data.data;
    res.render("index.ejs", { data: result });
  });

app.get("/characters", async (req, res) => {
  const response = await axios.get("https://api.jikan.moe/v4/top/characters");
  const result = response.data.data;
  res.render("characters.ejs", { characters: result });
});

app.get("/random", async (req, res) => {
  const response = await axios.get("https://api.jikan.moe/v4/random/anime");
  const result = response.data.data;
  console.log(result);
  res.render("random.ejs", { randomdata: result });
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.search;
    const response = await axios.get(
      "https://api.jikan.moe/v4/anime?q=" + query
    );
    const result = response.data.data;
    console.log(result);
    res.render("index.ejs", { searchdata: result, query });
  } catch (error) {
    console.error("Error fetching anime data:", error);
    res.render("index.ejs", { query: query });
  }
});

app.get("/anime/:id",async(req,res)=>{
  const id = req.params.id
  const response = await axios.get("https://api.jikan.moe/v4/anime/"+id)
  const response2 = await axios.get("https://api.jikan.moe/v4/anime/"+id+"/characters");
  const result = response.data.data
  const result2 = response2.data.data
  res.render("anime.ejs",{anime:result,character:result2,id:id})
})


app.get("/char/:id",async(req,res)=>{
  const id = req.params.id
  const response = await axios.get("https://api.jikan.moe/v4/characters/"+id)
  const result = response.data.data
  res.render("char.ejs",{char:result,id:id})
})

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
