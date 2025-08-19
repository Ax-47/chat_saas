import "reflect-metadata";
import { container } from "tsyringe";
import { VectorDatabaseRepository } from "./infrastructures/vector_db";
import { ChromaClient } from "chromadb";
import { QAPairVectorDatabaseRepository, QAPairVectorDatabaseRepositoryImpl } from "./infrastructures/qa_pair/vector_database";
import { GoogleGenAI } from "@google/genai";
import { ChatRepository, ChatRepositoryImpl } from "./repositories/chat";
import { LLMRepository, LLMRepositoryImpl } from "./infrastructures/llm";
container.register(ChromaClient, {
  useValue: new ChromaClient(
    {
      ssl: false,
      host: "localhost",
      port: 8000,
      tenant: "default_tenant",
      database: "default_database",
    }
  )
});

container.register(GoogleGenAI, { useValue: new GoogleGenAI({ apiKey: process.env.LLMAPIKEY }) });
container.register("MODEL_NAME", { useValue: process.env.LLMMODEL });
container.register("VectorDatabaseRepository", { useClass: VectorDatabaseRepository });
container.register<QAPairVectorDatabaseRepository>("QAPairVectorDatabaseRepository", { useClass: QAPairVectorDatabaseRepositoryImpl });
container.register<LLMRepository>("LLMRepository", {
  useClass: LLMRepositoryImpl
});
container.register<ChatRepository>("ChatRepository", {
  useClass: ChatRepositoryImpl
})

export { container };
