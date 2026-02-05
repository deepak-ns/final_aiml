from fastapi import FastAPI
from pydantic import BaseModel
from langchain.agents import create_sql_agent
from langchain.sql_database import SQLDatabase
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# ------------ PostgreSQL Database Setup ------------

db_user = os.getenv("db_user")
db_password = os.getenv("db_password")
db_host = os.getenv("db_host")
db_port = os.getenv("db_port")
db_name = os.getenv("db_name")

db_uri = (
    f"postgresql+psycopg2://{db_user}:{db_password}"
    f"@{db_host}:{db_port}/{db_name}"
)

# ✅ ALL TABLES INCLUDED
db = SQLDatabase.from_uri(db_uri)

# ------------ SYSTEM PROMPT ------------

SYSTEM_PROMPT = """
You are an AI assistant for a hydraulic system monitoring platform.

Each machine cycle has interpreted component states derived from model outputs:

Cooler condition based on output1:
- output1 ≤ 5 means close to total failure
- output1 ≤ 25 means reduced efficiency
- otherwise full efficiency

Valve condition based on output2:
- output2 ≥ 95 means optimal switching behavior
- output2 ≥ 85 means small lag
- output2 ≥ 75 means severe lag
- otherwise close to total failure

Pump condition based on output3:
- 0 means no leakage
- 1 means weak leakage
- 2 means severe leakage

Accumulator condition based on output4:
- output4 ≥ 125 means optimal pressure
- output4 ≥ 110 means slightly reduced pressure
- output4 ≥ 95 means severely reduced pressure
- otherwise close to total failure

Timestamps come from start_time and represent the cycle time.

Answer questions related only to hydraulic machines, component health,
trends across recent cycles, anomalies, degradation, and maintenance insights.

If the question is unrelated, respond:
"I can answer queries related to the hydraulic system only."

Do not use markdown, bullets, or formatting.
"""


# ------------ LLM + SQL Agent Setup ------------

agent = create_sql_agent(
    llm=ChatGroq(
        api_key=os.getenv("GROQ_API_KEY"),
        model_name="meta-llama/llama-4-scout-17b-16e-instruct"
    ),
    db=db,
    verbose=True,
    system_message=SYSTEM_PROMPT,
)

# ------------ Request Body ------------

class Query(BaseModel):
    question: str

# ------------ API Endpoint ------------

@app.post("/ask")
def ask_agent(query: Query):
    if not query.question:
        return {"response": "Question is required"}

    # Same pattern as your example
    final_query = SYSTEM_PROMPT + "\n" + query.question
    response = agent.run(final_query)

    return {
        "response": response
    }
