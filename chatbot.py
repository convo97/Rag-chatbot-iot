import requests
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# Config
PERSIST_DIR = "chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
OLLAMA_MODEL = "mistral"  
API_URL = "https://iot-api-production-cc46.up.railway.app/api/data"

# Load embeddings + vector DB
embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
db = Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)

# Retriever
retriever = db.as_retriever()

# Ollama LLM
llm = OllamaLLM(model=OLLAMA_MODEL, temperature=0.0)

# Memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# Conversational RAG pipeline
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory
)

def get_api_data():
    try:
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status()
        data = response.json()

        # If API returns a list, pick the latest (last element)
        if isinstance(data, list):
            data = data[-1]

        return data
    except Exception as e:
        print(f"API request failed: {e}")
        return None

# Few-shot examples to guide the LLM
FEW_SHOT_PROMPT = """
You are an agricultural assistant. Use the live sensor data to give helpful, concise farming advice. 
Here are some examples:

Example 1:
Data → Soil Moisture: 20, Temperature: 36, Humidity: 40
Question → Should I water my crops?
Answer → Yes, the soil moisture is low (20%), and the temperature is high. Irrigation is recommended.

Example 2:
Data → Soil Moisture: 75, Temperature: 28, Humidity: 70
Question → Should I water my crops?
Answer → No, the soil moisture is already high (75%), so additional watering is not needed.

Example 3:
Data → Soil Moisture: 40, Temperature: 15, Humidity: 85
Question → Is there any risk for my crops?
Answer → Yes, high humidity (85%) combined with cooler temperatures increases the risk of fungal diseases. Monitor crops closely.
"""

print("✅ LangChain RAG with Ollama + Few-Shot Guidance — type 'exit' to quit")

while True:
    query = input("You: ")
    if query.lower() in ["exit", "quit"]:
        break

    sensor_data = get_api_data()

    if sensor_data:
        context = (
            f"{FEW_SHOT_PROMPT}\n\n"
            f"Now use the following live data:\n"
            f"Info: {sensor_data.get('info', '')}, "
            f"Voltage: {sensor_data.get('voltage', 0)}, "
            f"Current: {sensor_data.get('current', 0)}, "
            f"Humidity: {sensor_data.get('humidity', 0)}, "
            f"Temperature: {sensor_data.get('temperature', 0)}, "
            f"Soil Moisture: {sensor_data.get('moisture', 0)}, "
            f"pH: {sensor_data.get('phValue', 0)}.\n\n"
            f"User query: {query}"
        )
    else:
        context = f"No live sensor data available. User query: {query}"

    result = qa_chain.invoke({"question": context})
    print("Bot:", result["answer"])
