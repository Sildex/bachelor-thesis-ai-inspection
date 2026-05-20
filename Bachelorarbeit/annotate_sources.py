import fitz
import shutil
from pathlib import Path

DESKTOP = Path(r"C:\Users\Maik\Desktop")
SRC = Path(r"C:\Users\Maik\Documents\Claude Code\Bachelorarbeit\Privat\Reference_Papers")

# (pdf_filename, page_0indexed, search_strings, color_rgb)
# Colors: yellow=(1,1,0), green=(0,1,0.5), cyan=(0,0.9,1), orange=(1,0.6,0)
ANNOTATIONS = [
    # [1] Boehm & Basili
    ("Boehm_Basili_2001_SoftwareDefectReductionTop10.pdf", None,
     ["often 100 times more expensive", "100 times"], (1, 1, 0)),

    # [2] Fagan - 82%
    ("Fagan_1976_DesignCodeInspections.pdf", None,
     ["82", "82%", "82 per"], (1, 1, 0)),
    # [2] Fagan - 38%
    ("Fagan_1976_DesignCodeInspections.pdf", None,
     ["38% FEWER", "38 percent", "38%"], (0, 1, 0.5)),
    # [2] Fagan - 23%
    ("Fagan_1976_DesignCodeInspections.pdf", None,
     ["23 percent", "23%"], (0, 0.9, 1)),
    # [2] Fagan - two thirds
    ("Fagan_1976_DesignCodeInspections.pdf", None,
     ["two thirds", "two-thirds"], (1, 0.6, 0)),
    # [2] Fagan - Table 3 (5 operations)
    ("Fagan_1976_DesignCodeInspections.pdf", None,
     ["Overview", "Preparation", "Rework", "Follow-up"], (1, 0.2, 0.2)),

    # [3] Wohlin - GQM
    ("Wohlin_2012_ExperimentationInSoftwareEngineering.pdf", None,
     ["Goal/Question/Metric", "Goal/Question", "GQM"], (1, 1, 0)),
    # [3] Wohlin - validity types
    ("Wohlin_2012_ExperimentationInSoftwareEngineering.pdf", None,
     ["Conclusion Validity", "Internal Validity", "Construct Validity", "External Validity"], (0, 1, 0.5)),

    # [4] Thelin - faults count
    ("Thelin_2001_UsageBasedReading.pdf", None,
     ["37", "faults", "defects"], (1, 1, 0)),
    # [4] Thelin - prioritised vs random
    ("Thelin_2001_UsageBasedReading.pdf", None,
     ["prioriti", "random"], (0, 0.9, 1)),

    # [5] Petersen - subjects
    ("Petersen_ESEM08.pdf", None,
     ["23", "19", "excluded", "withdrew", "non-conformance", "conformance"], (1, 1, 0)),
    # [5] Petersen - p-values
    ("Petersen_ESEM08.pdf", None,
     ["0.795", "0.951", "0.532", "significant"], (0, 1, 0.5)),
    # [5] Petersen - 108.7
    ("Petersen_ESEM08.pdf", None,
     ["108.7", "108", "109"], (0, 0.9, 1)),

    # [6] Vaswani - self-attention / parallel
    ("Vaswani_2017_AttentionIsAllYouNeed.pdf", None,
     ["dispensing with recurrence", "parallelizable", "self-attention", "Self-attention"], (1, 1, 0)),

    # [7] Brown - 175B params
    ("Brown_2020_GPT3_FewShotLearners.pdf", None,
     ["175 billion", "175B", "175.0B"], (1, 1, 0)),
    # [7] Brown - few-shot/zero-shot
    ("Brown_2020_GPT3_FewShotLearners.pdf", None,
     ["few-shot", "zero-shot", "Few-Shot", "Zero-Shot"], (0, 1, 0.5)),
    # [7] Brown - emergent (should NOT appear)
    ("Brown_2020_GPT3_FewShotLearners.pdf", None,
     ["emergent"], (1, 0.2, 0.2)),

    # [8] Hou - 395 papers
    ("Hou_2024_LLMs_SoftwareEngineering_SLR.pdf", None,
     ["395"], (1, 1, 0)),
    # [8] Hou - 85 tasks, 6 categories
    ("Hou_2024_LLMs_SoftwareEngineering_SLR.pdf", None,
     ["85 specific", "six core", "85 tasks"], (0, 1, 0.5)),
]

def annotate_pdf(src_path, annotations_for_file):
    doc = fitz.open(src_path)
    count = 0
    for (_, _, search_terms, color) in annotations_for_file:
        for term in search_terms:
            for page in doc:
                hits = page.search_for(term, quads=True)
                for hit in hits:
                    annot = page.add_highlight_annot(hit)
                    annot.set_colors(stroke=color)
                    annot.update()
                    count += 1
    return doc, count

# Group annotations by file
from collections import defaultdict
by_file = defaultdict(list)
for ann in ANNOTATIONS:
    by_file[ann[0]].append(ann)

results = []
for filename, anns in by_file.items():
    src = SRC / filename
    if not src.exists():
        results.append(f"MISSING: {filename}")
        continue
    dst = DESKTOP / f"ANNOTATED_{filename}"
    doc, n = annotate_pdf(src, anns)
    doc.save(str(dst))
    doc.close()
    results.append(f"OK ({n} highlights): {dst.name}")

for r in results:
    print(r)
