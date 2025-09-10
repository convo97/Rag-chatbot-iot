from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# Config
PERSIST_DIR = "chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
OLLAMA_MODEL = "mistral"  # or "llama2", "gemma", etc.

# Load embeddings + vector DB
embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
db = Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)

# Retriever
retriever = db.as_retriever()

# Ollama LLM
llm = OllamaLLM(model=OLLAMA_MODEL, temperature=0.0)

# Memory for chat history
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# Conversational RAG pipeline
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory
)

print("✅ LangChain RAG with Ollama — type 'exit' to quit")

while True:
    query = input("You: ")
    if query.lower() in ["exit", "quit"]:
        break

    result = qa_chain.invoke({"question": query})
    print("Bot:", result["answer"])
