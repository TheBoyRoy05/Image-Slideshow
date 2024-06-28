import os
import json

try:
    filenames = os.listdir('./Images')
    with open("output.json", "w") as f:
        json.dump({"paths": filenames}, f)
except OSError as e:
    print(f"Error reading directory './Images': {e}")