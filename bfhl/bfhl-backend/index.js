const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet =
    alphabets.length > 0
      ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
      : [];
  const response = {
    is_success: true,
    user_id: "shivam_gupta_02031999", // replace with your actual format
    email: "shivam@example.com", // replace with your actual email
    roll_number: "ABCD123", // replace with your actual roll number
    numbers,
    alphabets,
    highest_alphabet,
  };
  res.json(response);
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
