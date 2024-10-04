import os
import json

print("Creating sources.json...")

# List of directories to scan
directories = ["businessclub", "fivestars", "fourstars", "threestars", "advertisements", "wedstrijdsponsor", "balsponsor", "buffetsponsor", "overige"]

# Empty dictionary to hold our data
data = {}

# For each directory
for directory in directories:
    print(f"Scanning {directory}...")
    # Get a list of all files in the directory
    files = os.listdir(os.path.join("public", directory))
    
    # Create a list of dictionaries for each file
    file_dicts = []
    for file in files:
        if file.endswith('.txt'):
            with open(os.path.join("public", directory, file), 'r') as f:
                content = f.read()
            file_dicts.append({"name": os.path.splitext(file)[0], "url": ":txt:" + content})
        else:
            file_dicts.append({"name": os.path.splitext(file)[0], "url": file})
    
    # Add this list to our data dictionary
    data[directory] = file_dicts

# Write our data dictionary to a JSON file in the parent directory's src folder
with open(os.path.join("public", "sources.json"), "w") as f:
    json.dump(data, f, indent=2)