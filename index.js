import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline"; // Import the readline module

const genAI = new GoogleGenerativeAI("API_KEY"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to generate content based on user input
const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log("Bot: "+result.response.text()); // Print the response from the model
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

// Function to prompt user input
const askQuestion = () => {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Exiting the chat. Goodbye!");
      rl.close();
      return;
    }
    await generateContent(input); // Generate content based on user input
    askQuestion(); // Ask for the next input
  });
};

// Start the conversation
askQuestion();
