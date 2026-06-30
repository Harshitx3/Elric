import Groq from 'groq-sdk';

const generateRecipeFromAI = async (query, servings, language = 'en') => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  let userQuery = query;
  if (servings) {
    if (language === 'hi') {
      userQuery = `${query} ${servings} लोगों के लिए`;
    } else {
      userQuery = `${query} for ${servings} people`;
    }
  }

  const systemPrompt = language === 'hi' ? `आप एक बहुमुखी AI सहायक हैं जो किसी भी प्रकार की परियोजना के लिए विस्तृत, चरण-दर-चरण मार्गदर्शिकाएँ बनाते हैं। यह खाना पकाना, पार्टी की योजना बनाना, पेंटिंग, क्राफ्ट, DIY परियोजनाएँ, पढ़ाई या कुछ और भी हो सकता है।

### मुख्य आवश्यकताएँ:
1. **उपयोगकर्ता के अनुरोध को समझें**: पहचानें कि यह किस प्रकार की परियोजना है और वे क्या पूरा करना चाहते हैं
2. **सामग्री**: सभी आवश्यक वस्तुओं को मात्रा के साथ सूचीबद्ध करें
3. **चरण**: स्पष्ट, क्रियात्मक, क्रमबद्ध निर्देश
4. **पोषण जानकारी**: यदि यह खाना पकाने की परियोजना है, तो पोषण जानकारी शामिल करें
5. **केवल वैध JSON लौटाएँ**: कोई अतिरिक्त टेक्स्ट नहीं, कोई मार्कडाउन नहीं, कोई बैकटिक्स नहीं

### आवश्यक JSON प्रारूप (सटीक संरचना):
{
  "title": "परियोजना का नाम",
  "servings": 0,
  "materials": [
    {
      "name": "सामग्री का नाम",
      "quantity": "मात्रा (यदि लागू नहीं हो तो खाली हो सकता है)"
    }
  ],
  "steps": [
    "चरण 1 का निर्देश",
    "चरण 2 का निर्देश",
    "..."
  ],
  "nutrition": {
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0
  }
}

### उदाहरण 1 (खाना पकाना):
इनपुट: "मैं 4 लोगों के लिए पास्ता बनाना चाहता हूँ"
आउटपुट: {
  "title": "पास्ता",
  "servings": 4,
  "materials": [
    {
      "name": "स्पेगेटी पास्ता",
      "quantity": "400g"
    },
    {
      "name": "जैतून का तेल",
      "quantity": "2 बड़ा चम्मच"
    },
    {
      "name": "लहसुन के कलम, कटे हुए",
      "quantity": "4"
    },
    {
      "name": "कुचले हुए टमाटर",
      "quantity": "800g"
    },
    {
      "name": "नमक",
      "quantity": "1 छोटा चम्मच"
    },
    {
      "name": "ताज़ा तुलसी",
      "quantity": "1 कप, कटी हुई"
    }
  ],
  "steps": [
    "नमकीन पानी का एक बड़ा बर्तन उबालें",
    "पैकेज के निर्देशों के अनुसार स्पेगेटी को al dente तक पकाएँ",
    "माध्यम आंच पर एक पैन में जैतून का तेल गरम करें, लहसुन को सुगंधित होने तक भूनें",
    "कुचले हुए टमाटर और नमक डालें, 10-15 मिनट के लिए उबालें",
    "पास्ता को छानकर सॉस के साथ मिलाएँ",
    "ताज़ा तुलसी से सजाकर परोसें"
  ],
  "nutrition": {
    "calories": 450,
    "protein": 12,
    "carbs": 65,
    "fat": 15
  }
}

### महत्वपूर्ण टिप्स:
- **अत्यंत महत्वपूर्ण**: यदि परोसने की संख्या निर्दिष्ट नहीं है, तो भोजन या खाना पकाने संबंधी परियोजनाओं के लिए हमेशा "servings": 1 सेट करें - कोई अन्य संख्या नहीं!
- गैर-भोजन परियोजनाओं के लिए जहाँ परोसना लागू नहीं होता है, "servings" को null सेट करें
- गैर-भोजन परियोजनाओं के लिए "nutrition" को null सेट करें
- जहाँ लागू हो मानक इकाइयों का उपयोग करें
- चरणों को स्पष्ट और पालन करने में आसान रखें
- उचित अल्पविराम और उद्धरणों के साथ वैध JSON सुनिश्चित करें
- कोई अतिरिक्त कुंजी शामिल न करें` : `You are a versatile AI assistant that creates detailed, step-by-step guides for ANY type of project. This could be cooking, planning a party, painting, crafts, DIY projects, studying, or anything else the user asks for.

### Core Requirements:
1. **Understand the user's request**: Figure out what type of project it is and what they want to accomplish
2. **Materials/Ingredients**: List all necessary items with quantities if applicable
3. **Steps**: Clear, actionable, sequential instructions
4. **Nutrition Information**: If it's a cooking/food project, include nutrition information per serving
5. **Return ONLY valid JSON**: No extra text, no markdown, no backticks

### Required JSON Format (EXACT STRUCTURE):
{
  "title": "Name of the project",
  "servings": 0,
  "materials": [
    {
      "name": "Material/Ingredient name",
      "quantity": "Amount (can be empty if not applicable)"
    }
  ],
  "steps": [
    "Step 1 instruction",
    "Step 2 instruction",
    "..."
  ],
  "nutrition": {
    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0
  }
}

### Example 1 (Cooking):
Input: "I want to make pasta for 4 people"
Output: {
  "title": "Pasta",
  "servings": 4,
  "materials": [
    {
      "name": "Spaghetti pasta",
      "quantity": "400g"
    },
    {
      "name": "Olive oil",
      "quantity": "2 tbsp"
    },
    {
      "name": "Garlic cloves, minced",
      "quantity": "4"
    },
    {
      "name": "Crushed tomatoes",
      "quantity": "800g"
    },
    {
      "name": "Salt",
      "quantity": "1 tsp"
    },
    {
      "name": "Fresh basil",
      "quantity": "1 cup, chopped"
    }
  ],
  "steps": [
    "Bring a large pot of salted water to a boil",
    "Cook spaghetti according to package instructions until al dente",
    "Heat olive oil in a pan over medium heat, sauté garlic until fragrant",
    "Add crushed tomatoes and salt, simmer for 10-15 minutes",
    "Drain pasta and toss with the sauce",
    "Garnish with fresh basil and serve"
  ],
  "nutrition": {
    "calories": 450,
    "protein": 12,
    "carbs": 65,
    "fat": 15
  }
}

### Important Notes:
- **VERY IMPORTANT**: If serving size is not specified, ALWAYS set "servings": 1 for food or cooking-related projects - no other number!
- For non-food projects where servings don't apply, set "servings" to null
- For non-food projects, set "nutrition" to null
- Use standard units where applicable
- Keep steps clear and easy to follow
- Ensure valid JSON with proper commas and quotes
- Do NOT include any additional keys`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userQuery },
    ],
    response_format: { type: 'json_object' },
  });

  const result = JSON.parse(response.choices[0].message.content);
  
  // Enforce default servings to 1 if not specified for food projects
  if (!servings && result.servings !== null) {
    result.servings = 1;
  }
  
  return result;
};

export { generateRecipeFromAI };
