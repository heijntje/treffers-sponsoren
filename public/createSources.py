import json
import os
import re

print("Creating sources.json...")

# PDF support (pypdfium2 + Pillow)
try:
    import pypdfium2 as pdfium
    from PIL import Image
    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False
    print("Notice: 'pypdfium2' or 'Pillow' is not installed. Run 'pip install -r requirements.txt' for automatic PDF conversion.")


def convert_pdfs_in_directory(dir_path):
    """
    Checks for .pdf files in the directory.
    Converts each page of a PDF into a high-resolution PNG image if not already converted
    or if the PDF file was modified after the existing image.
    Single-page PDFs become: <basename>.png
    Multi-page PDFs become: <basename>_p1.png, <basename>_p2.png, ...
    """
    if not PDF_SUPPORT:
        return

    try:
        filenames = os.listdir(dir_path)
    except OSError:
        return

    for file in filenames:
        if not file.lower().endswith(".pdf"):
            continue

        pdf_path = os.path.join(dir_path, file)
        base_name = os.path.splitext(file)[0]

        try:
            with pdfium.PdfDocument(pdf_path) as pdf:
                num_pages = len(pdf)
                if num_pages == 0:
                    continue

                output_targets = []
                if num_pages == 1:
                    output_targets.append((0, f"{base_name}.png"))
                else:
                    for p in range(num_pages):
                        output_targets.append((p, f"{base_name}_p{p+1}.png"))

                for page_idx, out_filename in output_targets:
                    out_path = os.path.join(dir_path, out_filename)
                    if os.path.exists(out_path):
                        if os.path.getmtime(out_path) >= os.path.getmtime(pdf_path):
                            continue

                    print(f"  [PDF] Rendering {file} (page {page_idx + 1}/{num_pages}) -> {out_filename}...")
                    page = pdf[page_idx]
                    # Scale 2.5 produces ~1800-2500px, crisp on 1080p and 4K screens
                    image = page.render(scale=2.5).to_pil()
                    image.save(out_path, format="PNG")
        except Exception as e:
            print(f"  [PDF Error] Could not convert {file}: {e}")


# List of directories to scan
directories = [
    "hoofdsponsor",
    "businessclub",
    "fivestars",
    "fourstars",
    "threestars",
    "advertisements",
    "announcements",
    "wedstrijdsponsor",
    "balsponsor",
    "buffetsponsor",
    "overige",
]

# Load links.json if it exists
links_file = os.path.join("public", "links.json")
links = {}
if os.path.exists(links_file):
    try:
        with open(links_file, "r", encoding="utf-8") as f:
            links = json.load(f)
    except Exception as e:
        print(f"Warning: could not parse links.json: {e}")

# Empty dictionary to hold our data
data = {}

# For each directory
for directory in directories:
    dir_path = os.path.join("public", directory)
    if not os.path.exists(dir_path):
        continue
    print(f"Scanning {directory}...")

    # Pass 1: Automatically convert any PDFs to PNG images
    convert_pdfs_in_directory(dir_path)

    # Pass 2: Read directory contents (including newly converted PNGs)
    files = os.listdir(dir_path)

    # Create a list of dictionaries for each file
    file_dicts = []
    for file in files:
        # Ignore link sidecar files
        if file.endswith(".link") or file.endswith(".url") or file.endswith(".website"):
            continue

        # Skip raw PDF files because converted PNG images are used instead
        if file.lower().endswith(".pdf"):
            continue

        # Skip hidden or system files
        if file.startswith(".") or file == "Thumbs.db":
            continue

        file_path = os.path.join(dir_path, file)

        if file.endswith(".json"):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content_data = json.load(f)
                if isinstance(content_data, list):
                    for j_item in content_data:
                        if isinstance(j_item, dict) and "name" in j_item:
                            sponsor_entry = {
                                "name": j_item["name"],
                                "url": j_item.get("url", ":txt:" + j_item["name"])
                            }
                            if "website" in j_item:
                                sponsor_entry["website"] = j_item["website"]
                            # Carry over any extra fields for future compatibility
                            for k, v in j_item.items():
                                if k not in sponsor_entry:
                                    sponsor_entry[k] = v
                            file_dicts.append(sponsor_entry)
                    continue
            except Exception as e:
                print(f"Warning: could not parse json file {file}: {e}")

        name = os.path.splitext(file)[0]

        # If a .txt file exists alongside a .json list with the same base name, skip the .txt to avoid duplicates
        if file.endswith(".txt") and os.path.exists(os.path.join(dir_path, name + ".json")):
            continue

        item = {"name": name}

        if file.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            item["url"] = ":txt:" + content
        else:
            item["url"] = file

        # Check for website link
        website = None
        # Support root name for multi-page generated files (e.g., ad_p1 -> ad)
        base_root = re.sub(r'_p\d+$', '', name)
        candidate_names = [name]
        if base_root != name:
            candidate_names.append(base_root)

        for c_name in candidate_names:
            for sidecar_name in [f"{c_name}.link", f"{c_name}.url", f"{c_name}.website", f"{file}.link", f"{file}.url"]:
                sidecar_path = os.path.join(dir_path, sidecar_name)
                if os.path.exists(sidecar_path):
                    with open(sidecar_path, "r", encoding="utf-8") as sf:
                        website = sf.read().strip()
                    break
            if website:
                break

        if not website:
            for c_name in candidate_names:
                website = links.get(c_name) or links.get(f"{c_name}.pdf") or links.get(file)
                if website:
                    break

        if website:
            if not (website.startswith("http://") or website.startswith("https://")):
                website = "https://" + website
            item["website"] = website

        file_dicts.append(item)

    data[directory] = file_dicts

# Write data to sources.json
with open(os.path.join("public", "sources.json"), "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("sources.json created successfully.")
