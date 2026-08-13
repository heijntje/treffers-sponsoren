import json
import os

print("Creating sources.json...")

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
    files = os.listdir(dir_path)

    # Create a list of dictionaries for each file
    file_dicts = []
    for file in files:
        # Ignore link sidecar files in main file iteration
        if file.endswith(".link") or file.endswith(".url") or file.endswith(".website"):
            continue

        name = os.path.splitext(file)[0]
        item = {"name": name}

        if file.endswith(".txt"):
            with open(os.path.join(dir_path, file), "r", encoding="utf-8") as f:
                content = f.read().strip()
            item["url"] = ":txt:" + content
        else:
            item["url"] = file

        # Check for website link:
        # 1) Check sidecar file (e.g. Cornelion.link or Cornelion.png.link)
        website = None
        for sidecar_name in [f"{name}.link", f"{file}.link", f"{name}.url", f"{file}.url"]:
            sidecar_path = os.path.join(dir_path, sidecar_name)
            if os.path.exists(sidecar_path):
                with open(sidecar_path, "r", encoding="utf-8") as sf:
                    website = sf.read().strip()
                break

        # 2) Fallback to links.json lookup by name or filename
        if not website:
            website = links.get(name) or links.get(file)

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
