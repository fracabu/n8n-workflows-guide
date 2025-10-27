# 🚀 Guida N8N Workflows - Agente RAG Gratuito

Una guida completa e interattiva per creare workflow avanzati in N8N senza scrivere codice, con focus su un **Agente RAG 100% gratuito** utilizzando Google Gemini.

![N8N + Gemini](https://img.shields.io/badge/N8N-Workflows-ea4b71?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector%20DB-00D4AA?style=for-the-badge)

## 📋 Contenuti

- **Tutorial Agente RAG completo** - Crea un assistente AI addestrato sui tuoi documenti
- **Soluzione 100% gratuita** - Nessun costo, usando Google Gemini e Pinecone Free Tier
- **Guide passo-passo** - Istruzioni dettagliate con screenshot e diagrammi
- **Import rapido** - JSON del workflow pronto all'uso

## 🎯 Cosa puoi fare con questa guida

Imparerai a costruire un **Agente RAG (Retrieval Augmented Generation)** che:
- 📚 Legge e analizza i tuoi documenti (PDF, TXT, Google Docs)
- 🔍 Trova informazioni rilevanti quando fai domande
- 💬 Risponde in modo intelligente basandosi sui tuoi contenuti
- 🆓 Funziona completamente **GRATIS** con Google Gemini

## 🛠️ Tecnologie utilizzate

### Stack 100% Gratuito
- **N8N** - Piattaforma di automazione workflow (self-hosted o cloud)
- **Google Gemini Embeddings** - Modello di embedding gratuito (dimensione 768)
- **Google Gemini LLM** - Modello linguistico gratuito
- **Pinecone Free Tier** - Database vettoriale gratuito (fino a 100k vettori)
- **Google Drive** - Storage documenti

## 📦 Documento di Esempio

Nella cartella `examples/` trovi:
- **esempio-documento-rag.docx**: Il documento Word usato come esempio nella guida
  - Policy di rimborso spese e trasferte fittizie
  - Tabelle di massimali già convertite in formato lista
  - Perfetto per testare il tuo primo RAG agent!

**📌 Nota:** Ricorda di convertire il Word in Google Docs e caricarlo su Google Drive prima di usarlo in N8N.

---

## 🚀 Come iniziare

### 1. Apri la guida web

Apri il file `index.html` nel tuo browser:

```bash
# Su Windows
start index.html

# Su Mac
open index.html

# Su Linux
xdg-open index.html
```

### 2. Prerequisiti

Prima di iniziare, assicurati di avere:
- ✅ Account N8N (self-hosted o cloud)
- ✅ Account Google (per Gemini API e Google Drive)
- ✅ Account Pinecone (gratuito)

### 3. Segui la guida

La guida web ti guiderà attraverso:

#### **FASE 1: Preparazione e Inserimento (Ingestion)**
1. Setup del workflow N8N
2. Configurazione Pinecone con indice custom (dimensione 768)
3. Download documenti da Google Drive
4. Vettorizzazione e salvataggio

#### **FASE 2: Interrogazione e Risposta**
1. Creazione interfaccia chat
2. Configurazione agente AI con Gemini
3. Integrazione database vettoriale come tool
4. Test e deployment

## 📦 Import rapido del workflow

Nella guida troverai un **JSON pronto all'uso** per importare il workflow direttamente in N8N:

1. Vai su N8N → Menu → Import from File
2. Copia il JSON dalla guida (sezione "Import Rapido")
3. Incolla e importa
4. Configura le tue credenziali

## 🎨 Caratteristiche della web app

- ✨ **Design moderno e responsive** - Funziona su desktop e mobile
- 🔍 **Ricerca integrata** - Trova rapidamente le informazioni
- 📊 **Diagrammi visivi** - Comprendi la struttura del workflow
- 📋 **Copia con un click** - JSON e snippet di codice
- ⌨️ **Shortcuts da tastiera**:
  - `/` - Focus sulla ricerca
  - `Esc` - Chiudi ricerca
  - `Ctrl/Cmd + P` - Stampa sezione corrente

## 📖 Struttura del progetto

```
n8n-workflows-guide/
├── examples/
│   └── esempio-documento-rag.docx  # Documento di esempio per testare il RAG
├── index.html                       # Pagina principale con tutta la guida
├── style.css                        # Stili e tema N8N
├── script.js                        # Interattività e funzionalità
├── CLAUDE.md                        # Guida per Claude Code
└── README.md                        # Questo file
```

## 🔑 Configurazione chiavi API

### Google Gemini API
1. Vai su [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nuova API key
3. Aggiungi la chiave in N8N nelle credentials

### Pinecone API
1. Vai su [pinecone.io](https://www.pinecone.io)
2. Registrati e accedi alla dashboard
3. Vai su "API Keys" → "Create API Key"
4. Copia e aggiungi in N8N

### Google Drive
1. In N8N, crea una nuova credential per Google Drive
2. Segui il processo OAuth2 (circa 5 minuti)
3. Autorizza l'accesso al tuo Drive

## 📊 Esempio di workflow completato

### Fase 1 - Ingestion
```
Manual Trigger → Google Drive Download → Pinecone Vector Store
                                          ↑           ↑
                            Gemini Embeddings   Default Data Loader
```

### Fase 2 - Chat
```
Chat Trigger → AI Agent → Response
                ↓
         Pinecone Tool (con Gemini Embeddings)
```

## 💡 Suggerimenti e best practices

### Per la produzione
- Usa **Google Drive Trigger** invece di Manual Trigger per aggiornamenti automatici
- Implementa una **memoria SQL** invece della memoria semplice
- Monitora i **costi API** (anche se Gemini è gratuito)
- Imposta **limiti di rate** per evitare abusi

### Ottimizzazione
- Regola il numero di **chunks recuperati** (default: 4)
- Usa **metric: cosine** in Pinecone per similarità testuale
- Testa diverse **dimensioni dei chunk** nel Document Loader

## 🐛 Risoluzione problemi comuni

### "Il RAG risponde con valori sbagliati" ⚠️ PROBLEMA PIÙ COMUNE
✅ **CAUSA**: Le tabelle nei PDF non sono leggibili dagli LLM
✅ **SOLUZIONE**:
1. Converti il documento in **Google Docs** (non PDF!)
2. Sostituisci le tabelle con **liste in formato testo**:
   ```
   MILANO: Alloggio €160 per notte, Pasti €40 al giorno
   ROMA: Alloggio €150 per notte, Pasti €38 al giorno
   BOLOGNA: Alloggio €130 per notte, Pasti €36 al giorno
   ```
3. Crea un **nuovo indice Pinecone** (invece di cancellare 100+ vettori manualmente)
4. Ri-esegui la **Fase 1** con il nuovo documento
5. Aggiorna la **Fase 2** per usare il nuovo indice

**Dettagli completi nella sezione "Troubleshooting" della guida web!**

### "Il RAG non trova le informazioni"
✅ Verifica che il modello di embedding sia **identico** in tutti e tre i punti:
- Indice Pinecone (dimensione 768)
- Fase 1 - Inserimento (Gemini Embeddings)
- Fase 2 - Query (Gemini Embeddings)

✅ Aumenta il **Top K** a 8-10 nel nodo KnowledgeBase (Fase 2)

### "L'agente risponde sempre con la stessa città"
✅ La memoria ricorda le domande precedenti:
- Clicca "Clear execution" tra una domanda e l'altra
- Migliora il prompt: "Ogni domanda è INDIPENDENTE"

### "L'agente risponde in formato JSON"
✅ Il prompt chiede esplicitamente il formato JSON:
- Rimuovi le istruzioni JSON dal prompt dell'AI Agent
- Usa un prompt minimalista che chiede risposte in testo normale

### "Errore connessione Pinecone"
✅ Controlla che:
- L'API key sia corretta
- L'indice esista e sia in stato "Ready"
- Il nome dell'indice corrisponda (es. `n8n-rag`)

### "File non scaricato da Google Drive"
✅ Verifica che:
- Le credenziali Google siano configurate
- Il file sia accessibile dal tuo account
- Il formato sia supportato (Google Docs consigliato!)

## 🌟 Esempi di utilizzo

Con questo agente RAG puoi:

- 📚 **Knowledge Base aziendale** - Rispondi a domande su documenti interni
- 📖 **Assistente documentazione** - Aiuta gli utenti a navigare manuali complessi
- 🎓 **Tutor personalizzato** - Crea un assistente basato sui tuoi appunti
- 💼 **FAQ automatico** - Risposte basate su policy e procedure
- 🔬 **Analisi ricerca** - Interroga paper e articoli scientifici

## 🚧 Roadmap

Prossimi esempi in arrivo:
- 📧 Email Automation
- 📊 Data Processing e Analytics
- 🔄 API Integration avanzata
- 🤖 Multi-agent systems

## 🤝 Contributi

Hai suggerimenti o miglioramenti? Le pull request sono benvenute!

## 📝 Licenza

Questo progetto è rilasciato sotto licenza MIT - sentiti libero di usarlo e modificarlo.

## 🙏 Crediti

Creato con ❤️ per la community N8N

- **N8N** - [n8n.io](https://n8n.io)
- **Google Gemini** - [ai.google.dev](https://ai.google.dev)
- **Pinecone** - [pinecone.io](https://pinecone.io)

## 📧 Supporto

Hai domande? Apri una issue o contattaci!

---

⭐ Se questa guida ti è stata utile, lascia una stella!
