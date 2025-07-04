
````markdown
# 🧠 AI Code Explainer using Generative AI (Gemini API)

This project is a simple and interactive web application that takes a code snippet as input and returns an AI-generated explanation. It uses Google's **Gemini API** to provide clear and beginner-friendly descriptions of code, helping users—especially students or self-learners—better understand programming logic.

---

## 🚀 Features

- ✍️ Paste any code snippet (Python, JavaScript, etc.)
- 🔍 Get a natural language explanation of the code
- ⚡ Fast and responsive UI built with React
- 🔁 Handles API loading and error states
- 📋 Copy explanation with one click

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript (optional), TailwindCSS (or plain CSS)
- **Backend/API**: Google Gemini API (via API key)
- **Icons/UI**: Lucide-react (for icons), simple loading animation

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-code-explainer.git
   cd ai-code-explainer
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your Gemini API key**
   Create a `.env` file in the root directory and add:

   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser 🎉

---

## 🧪 How It Works

* The user inputs a code snippet.
* The app sends this code to the Gemini API along with a custom prompt.
* Gemini returns a detailed explanation of what the code does.
* The explanation is displayed below the input box in a readable format.

---

## 📂 Project Structure

```
ai-code-explainer/
├── public/
├── src/
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── vite.config.ts
```

---

## 🧪 Testing

* Tested with various input types: loops, conditionals, functions.
* Handles incomplete or invalid code with fallback messaging.
* Responsive on desktop and mobile screens.

---

## 📌 Limitations

* Only supports plain-text code input (no syntax highlighting yet).
* Explanations may vary depending on the Gemini model's understanding.
* Requires a working internet connection and a valid API key.

---

## 🌱 Future Improvements

* 🔍 Automatic programming language detection
* 🪄 Line-by-line or inline explanations
* 💬 User feedback system (rate or improve responses)
* 💾 Export explanations as PDF or Markdown

---

## 🤝 Contributing

Pull requests are welcome! If you find bugs or want to suggest improvements, feel free to open an issue or fork the repo.

---


## 🙋‍♂️ Author

**Vaibhav Lokunde**
[LinkedIn](https://linkedin.com/in/vaibhav-lokunde) | [GitHub](https://github.com/vaibhavlokunde)

---

## 📬 Contact

If you'd like to discuss improvements, feel free to reach out at:
📧 [vaibhav72004@gmail.com](mailto:vaibhav72004@gmail.com)

```

---

```
