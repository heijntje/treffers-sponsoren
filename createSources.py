import os
import json

# List of directories to scan
directories = ["businessclub", "fivestars", "fourstars", "threestars", "advertisements"]

# Empty dictionary to hold our data
data = {}

# For each directory
for directory in directories:
    # Get a list of all files in the directory
    files = os.listdir(directory)
    
    # Create a list of dictionaries for each file
    file_dicts = [{"name": os.path.splitext(file)[0], "url": file} for file in files]
    
    # Add this list to our data dictionary
    data[directory] = file_dicts

# Write our data dictionary to a JSON file in the parent directory's src folder
with open(os.path.join("..", "src", "sources.json"), "w") as f:
    json.dump(data, f, indent=2)