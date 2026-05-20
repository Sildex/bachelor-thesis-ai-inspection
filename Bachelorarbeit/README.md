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
├── Input/                              # All documents provided to the LLM inspector
│   ├── Inspection_Agent_Prompt.md      # Phase 1 prompt (baseline_v1, single-pass)
│   ├── Inspection_Agent_Prompt_v2.md   # Phase 2 prompt (improved_v1, 3-pass multi-check)
│   ├── Inspektionsplan.md              # RB-UBR inspection process reference (used by v1)
│   ├── Taxi_des_exp_v2.md              # Software Top Level Design Document (inspected artifact)
│   ├── TextReqSpec_v3.6.md             # Textual Requirements Specification (background reading)
│   └── UseCasesRank_v3.4.md            # 19 prioritized use cases
│
├── Template/
│   └── Inspection Record Empty.json    # Blank form — never modify
│
├── Results/
│   ├── Ohne Parametervariation/        # Phase 1: Baseline runs (prompt_config: baseline_v1)
│   │   └── Run_XX/
│   │       └── Run_XX_Inspection_Record.json
│   └── Mit Parametervariation/         # Phase 2: Improved runs (prompt_config: improved_v1)
│       └── Run_XX/
│           └── Run_XX_Inspection_Record.json
│
└── Human_Reference_NOT_FOR_AI/         # Human inspection results from Petersen (2008)
    └── Inspection Record Original.json
```

> **Important:** `Human_Reference_NOT_FOR_AI/` must NOT be shown to the LLM before or during an inspection run. It may only be accessed after all runs are complete.

---

## Running an Inspection

Each run is started in a new Claude Code session. Replace `XX` with the run number.

**Phase 1 – Baseline (prompt_config: baseline_v1, single-pass):**
```
Lies `Claude Code Inspektion/Input/Inspection_Agent_Prompt.md` und befolge die Anweisungen exakt. Dies ist Run_XX.
```

**Phase 2 – Improved (prompt_config: improved_v1, 3-pass multi-check):**
```
Lies `Claude Code Inspektion/Input/Inspection_Agent_Prompt_v2.md` und befolge die Anweisungen exakt. Dies ist Run_XX.
```

Results are saved to the respective subfolder (`Ohne Parametervariation/` or `Mit Parametervariation/`).

---

## Experimental Setup

| Parameter | Value |
|-----------|-------|
| Model | claude-sonnet-4-6 |
| Inspection method | RB-UBR (Rank-Based Usage-Based Reading) |
| Artifact inspected | Taxi Evolution System – Top Level Design |
| Known faults | 38 (13A, 14B, 11C) |
| Use cases | 19 (rank-ordered) |
| Phase 1 runs | 4 (baseline_v1, saturation reached after Run 03) |
| Phase 2 runs | Variable (improved_v1, 3-pass multi-check) |
| Human baseline | n=10, RB-UBR group, Petersen et al. (2008) |

