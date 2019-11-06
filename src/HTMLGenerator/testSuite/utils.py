import pathlib
from pathlib import Path
import os.path
import json

def jdefault(o):
     return o.__dict__

def get_path_relative_to_username(filename):
    # Return a path that is relative to the ~user
    s=Path("~") 
    filename_path = Path(filename)
    return str(filename_path.relative_to(s.expanduser()))

def create_directory(directory_path):
    try:
        os.makedirs(directory_path)
    except OSError as e:
        return str(e.strerror, ": ", get_path_relative_to_username(e.filename))

def write_to_json_file(json_file,test_failures):
    try:
        if test_failures:
            with open(json_file, 'w') as file:
                json.dump(test_failures, file, indent=4, separators=(",",": "))
    except FileNotFoundError:
        raise("Unable to create the JSON File: errorReport.json")

def write_to_dict(error_dict, filename, error_message):
    error_list = []
    error_list.append(error_message)
    filename_stem=Path(filename).stem
    if filename_stem in error_dict:
        error_dict[filename_stem].extend(error_list)
    else:
        error_dict[filename_stem] = error_list
    return error_dict
 