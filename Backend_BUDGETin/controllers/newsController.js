const axios = require("axios");

exports.getNews = async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "finance",
        apiKey: process.env.NEWS_API_KEY, // API key from newsapi.org
      },
    });

    res.status(200).json({ articles: response.data.articles });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news.", error: error.message });
  }
};
