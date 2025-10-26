# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **interactive web guide** for building N8N workflows, specifically focused on creating a free RAG (Retrieval Augmented Generation) agent using Google Gemini and Pinecone. The project is a static website (HTML/CSS/JavaScript) that provides comprehensive tutorials for N8N automation workflows.

**Language**: Italian
**Target Audience**: N8N users wanting to build AI agents without coding

## Project Structure

```
n8n-workflows-guide/
├── index.html      # Single-page application with complete tutorial content
├── style.css       # Styling and theme (gradient designs, responsive layout)
├── script.js       # Navigation, search, and interactive features
└── README.md       # Project documentation
```

## Key Architecture Decisions

### Single-Page Application
The entire guide is contained in a single HTML file (`index.html`) with multiple content sections that are toggled via JavaScript. Sections include:
- Introduction (`#intro`)
- RAG Agent overview (`#rag-agent`)
- Phase 1: Document Ingestion (`#rag-fase1`)
- Phase 2: Query and Response (`#rag-fase2`)
- Production setup (`#rag-produzione`)

### Navigation System
Navigation is handled through:
- Sidebar links with `data-section` attributes (script.js:8-14)
- URL hash-based routing (script.js:42-61)
- Browser history integration (script.js:54-61)

The navigation function `navigateToSection()` is globally accessible and handles:
- Showing/hiding content sections
- Updating active nav states
- URL hash updates
- Smooth scrolling

### Search Functionality
The search implementation (script.js:64-161):
- Real-time search through all content sections
- Automatic navigation to first matching section
- Live text highlighting with yellow background
- Clears highlights on blur/escape

### Interactive Features
Built-in features include:
- Progress bar showing reading position (script.js:197-219)
- Copy buttons for code blocks (script.js:222-267)
- Scroll-to-top button (script.js:270-313)
- Keyboard shortcuts:
  - `/` - Focus search
  - `Esc` - Clear search
  - `Ctrl/Cmd + P` - Print

## Content Architecture

### Tutorial Structure
The RAG agent tutorial is divided into two main phases:

**FASE 1 - Ingestion Workflow** (5 nodes):
```
Manual Trigger → Google Drive Download → Pinecone Vector Store
                                         ↑              ↑
                               Gemini Embeddings   Default Data Loader
```

**FASE 2 - Query Workflow**:
```
Chat Trigger → AI Agent → Response
               ↓
         Pinecone Tool (with Gemini Embeddings)
```

### Critical Technical Details
The guide emphasizes that **Google Gemini Embeddings use dimension 768**, which must match across:
1. Pinecone index configuration
2. Phase 1 embedding model
3. Phase 2 query embedding model

This is highlighted as the most common failure point (index.html:253-278, 504-516).

### Embedded JSON Workflow
The guide includes an importable N8N workflow JSON (index.html:349-417) with a copy button function (`copyWorkflowJSON()` in script.js:331-349).

## Styling Conventions

### CSS Architecture
- CSS Custom Properties for theming (style.css:8-23)
- Gradient backgrounds extensively used for visual hierarchy
- Component-based styling (info boxes, cards, steps)
- Responsive breakpoints at 768px (style.css:453-481)

### Visual System
- Primary color: `#ea4b71` (pink/red)
- Gradient schemes:
  - Sidebar: Dark blue gradient
  - Success: Green gradient (#00b894 → #00cec9)
  - Workflow: Purple gradient (#667eea → #764ba2)

### Component Classes
- `.info-box` - Blue background for informational content
- `.tip-box` - Yellow background for tips
- `.warning-box` - Red background for warnings
- `.success-box` - Green background for completion messages
- `.highlight` - Inline gradient highlight for key terms
- `.step` - White card for tutorial steps

## Development Commands

### Running the Project
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

No build process required - this is a static site with no dependencies.

### Testing
Open in browser and verify:
- Navigation between sections works
- Search functionality operates correctly
- All interactive features respond (copy buttons, scroll to top)
- Responsive design on mobile viewports

## Making Changes

### Adding New Tutorial Sections
1. Add navigation link in sidebar (index.html:18-30)
2. Create new `<section id="section-id" class="content-section">` in main content
3. No JavaScript changes needed - navigation is automatic

### Modifying the N8N Workflow JSON
The workflow JSON is embedded in the HTML (index.html:349-417). When updating:
- Ensure proper JSON formatting inside the `<pre><code>` tags
- Test the copy functionality with `copyWorkflowJSON()`
- Update any references to node names or configuration

### Styling Guidelines
- Use CSS custom properties for colors (defined in `:root`)
- Maintain gradient themes for consistency
- Test responsive layout changes at 768px breakpoint
- Keep box-shadow consistent: use `var(--shadow)` and `var(--shadow-lg)`

## Important Notes

### Language
All content is in Italian. When adding new content:
- Maintain informal but professional tone ("tu" form)
- Use technical terms in English (RAG, embeddings, chunks, workflow)
- Provide clear explanations for non-technical users

### Focus on Free Solutions
The guide emphasizes using completely free tools:
- Google Gemini (free API)
- Pinecone free tier
- N8N (self-hosted or cloud)

Any changes should maintain this focus on accessibility and zero cost.

### Critical Configuration Points
Always emphasize when editing:
1. Pinecone dimension must be 768 for Gemini
2. Same embedding model must be used in all three places
3. Credential setup is required for Google Drive, Gemini, and Pinecone

## Common Issues and Troubleshooting

### Most Common Issue: Tables in PDFs Not Readable by LLMs
**Problem**: When users upload PDF documents with tables, the Default Data Loader converts them into a format that LLMs cannot parse correctly (e.g., "Bologna\n\n130\n\n36"). This causes the agent to return wrong values or mix up data between different rows.

**Solution**:
1. Convert documents to **Google Docs** format (not PDF)
2. Replace tables with text-based lists:
   ```
   BOLOGNA: Alloggio €130 per notte, Pasti €36 al giorno
   ```
3. Create a new Pinecone index instead of manually deleting hundreds of vectors
4. Re-run Phase 1 ingestion with the new document
5. Update Phase 2 to use the new index

**Key Learning**: Google Docs processes better than PDFs, and list-based formats are much more LLM-friendly than tables.

### Memory Confusion
**Problem**: The Simple Memory node remembers previous conversations, causing the agent to respond with information from earlier queries (e.g., always responding "Milano" when asked about different cities).

**Solution**: Add to the AI Agent prompt: "IMPORTANTE: Ogni domanda è INDIPENDENTE. Rispondi SOLO con i dati recuperati dal tool per la domanda CORRENTE."

### Tool Not Being Called
**Problem**: The agent responds without consulting the knowledge base, making up answers or saying it doesn't have information.

**Solution**: Ensure the tool description is clear and compelling. Example:
```
Cerca informazioni sui massimali di spesa, rimborsi, trasferte e policy aziendali. Usa SEMPRE questo tool per rispondere a domande su limiti di spesa, città specifiche, procedure di rimborso o regole.
```

### JSON vs Text Responses
If the prompt explicitly requests JSON format, the agent will return structured JSON. For human-readable responses, use a minimalist prompt that requests plain text format.

### Debugging Workflow
When troubleshooting:
1. Check Pinecone vector count (should be > 0)
2. Verify chunks on Pinecone contain readable text
3. Confirm both workflows use the same Pinecone index
4. Verify embedding models match (dimension 768)
5. Check AI Agent logs to see if tool is being called
6. Inspect tool output to verify correct chunks are retrieved
