# Bachelor Thesis – AI-based Software Inspection (RB-UBR)

**Author:** Maik Bender  
**Supervisor:** Kai Petersen

---

## Overview

This repository contains all artifacts for a bachelor thesis comparing LLM-based and human software inspectors using **Rank-Based Usage-Based Reading (RB-UBR)**.

The same inspection experiment originally conducted by Petersen et al. (2008) with M.Sc. students is replicated here using `claude-sonnet-4-6`. Results are compared directly against the human baseline (n=10, RB-UBR group).

**Reference:** Petersen, K., Rönkkö, K., & Wohlin, C. (2008). *The Impact of Time Controlled Reading on Software Inspection Effectiveness and Efficiency.* ESEM'08.

---

## Repository Structure

```
Claude Code Inspektion/
├── Input/                          # All documents provided to the LLM inspector
│   ├── Inspection_Agent_Prompt.md  # Role, rules, and output format for the LLM
│   ├── Inspektionsplan.md          # RB-UBR inspection process (step-by-step)
│   ├── Taxi_des_exp_v2.md          # Software Top Level Design Document (inspected artifact)
│   ├── TextReqSpec_v3.6.md         # Textual Requirements Specification (ground truth)
│   └── UseCasesRank_v3.4.md        # 19 prioritized use cases
│
├── Template/
│   └── Inspection Record Empty.json  # Blank form — never modify
│
├── Results/
│   └── Run_XX/
│       └── Run_XX_Inspection_Record.json
│
└── Human_Reference_NOT_FOR_AI/     # Human inspection results from Petersen (2008)
    └── Inspection Record Original.json
```

> **Important:** `Human_Reference_NOT_FOR_AI/` must NOT be shown to the LLM before or during an inspection run. It may only be accessed after all runs are complete.

---

## Running an Inspection

Each run is started in a new Claude Code session with the following trigger prompt (replace `XX` with the run number):

```
Lies `Claude Code Inspektion/Input/Inspection_Agent_Prompt.md` und befolge die Anweisungen exakt. Dies ist Run_XX.
```

The LLM then reads all input documents and produces a JSON inspection record following the RB-UBR process defined in `Inspektionsplan.md`.

---

## Experimental Setup

| Parameter | Value |
|-----------|-------|
| Model | claude-sonnet-4-6 |
| Inspection method | RB-UBR (Rank-Based Usage-Based Reading) |
| Artifact inspected | Taxi Evolution System – Top Level Design |
| Known faults | 38 (13A, 14B, 11C) |
| Use cases | 19 (rank-ordered) |
| Phase 1 runs | 10 (baseline, Standard effort) |
| Phase 2 runs | Variable (Effort-Level variations) |
| Human baseline | n=10, RB-UBR group, Petersen et al. (2008) |

