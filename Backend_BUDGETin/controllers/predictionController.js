const axios = require('axios'); // Pastikan axios diinstal dan di-import

// URL untuk model yang sudah di-deploy di Cloud Run
const PREDICTION_MODEL_URL = 'https://prediction-ml-540109747934.asia-southeast2.run.app'; // Ganti dengan URL model prediksi di Cloud Run
const STATISTICS_MODEL_URL = 'https://statistic-ml-540109747934.asia-southeast2.run.app'; // Ganti dengan URL model statistik di Cloud Run

// Fungsi untuk mendapatkan prediksi dari model di Cloud Run
exports.predict = async (req, res) => {
  try {
    // Ambil data fitur dari request body
    const { features } = req.body;

    if (!features) {
      return res.status(400).json({ message: 'Features are required.' });
    }

    // Kirim request POST ke API Cloud Run untuk mendapatkan prediksi
    const response = await axios.post(PREDICTION_MODEL_URL, {
      features: features // Data fitur yang dikirim ke Cloud Run
    });

    // Mengambil hasil prediksi dari response Cloud Run
    const prediction = response.data.prediction;

    // Kirimkan hasil prediksi ke client
    res.status(200).json({
      message: 'Prediction generated successfully.',
      prediction: prediction, // Hasil prediksi
    });
  } catch (error) {
    console.error('Error during prediction request:', error);
    res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};

// Fungsi untuk mendapatkan statistik dari model di Cloud Run
exports.getStatistics = async (req, res) => {
  try {
    // Ambil data dari request body
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: 'Data is required.' });
    }

    // Kirim request POST ke API Cloud Run untuk mendapatkan statistik
    const response = await axios.post(STATISTICS_MODEL_URL, {
      data: data // Data yang dikirim ke Cloud Run untuk analisis statistik
    });

    // Mengambil hasil statistik dari response Cloud Run
    const statistics = response.data.statistics;

    // Kirimkan hasil statistik ke client
    res.status(200).json({
      message: 'Statistics generated successfully.',
      statistics: statistics, // Hasil statistik
    });
  } catch (error) {
    console.error('Error during statistics request:', error);
    res.status(500).json({
      message: 'Server error.',
      error: error.message,
    });
  }
};