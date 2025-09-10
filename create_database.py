from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
import os

# Paths
DATA_PATH = "data"
DB_PATH = "chroma_db"

# Load PDFs
docs = []
for file in os.listdir(DATA_PATH):
    if file.endswith(".pdf"):
        loader = PyPDFLoader(os.path.join(DATA_PATH, file))
        docs.extend(loader.load())
        print(f"Loaded {len(docs)} pages from {file}")

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
print(f"Split into {len(splits)} chunks")

# Create embeddings (using sentence-transformers)
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)

# Save to Chroma DB
db = Chroma.from_documents(splits, embeddings, persist_directory=DB_PATH)
db.persist()
print(f"✅ Vector DB saved to {DB_PATH}")
