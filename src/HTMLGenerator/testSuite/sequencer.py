import os.path
import tempfile
import pathlib
import errno
import json
import time
from pathlib import Path
from asserter import TestCase
from tqdm import tqdm
import utils
import subprocess
from utils import *
import sys
sys.path.append("..")
import converter
from converter import run_converter

CURRENT_CONFIGURATION_PATH = "currentConfiguration.txt"
NOTIFICATION_PATH = "complete.txt"
LABVIEW_PATH = Path("C:/Program Files/National Instruments/LabVIEW 2017/LabVIEW.exe")
ERROR_REPORT_JSON = r'errorReport.json'

def convert_test_case(top_level_output_directory, top_level_input_directory, json_with_filepaths, path_to_current_working_directory = Path.cwd()):
    current_configuration_absolute_path = Path(path_to_current_working_directory / CURRENT_CONFIGURATION_PATH)

    # Writing the top, preload, input and output path to the currentConfiguration.txt file.
    try:
        with open(current_configuration_absolute_path, 'w') as current_configuration_file:
            current_configuration_file.write(
                '/top:' + str(top_level_output_directory / json_with_filepaths["topPath"]) + "\n")
            current_configuration_file.write(
                '/preload:' + str(Path(json_with_filepaths["preloadedFiles"])) + "\n")
            current_configuration_file.write(
                '/input:' + str(top_level_input_directory / json_with_filepaths["inputPath"]) + "\n")
            current_configuration_file.write(
                '/out:' + str(Path(json_with_filepaths["outputPath"])) + "\n")
            current_configuration_file.flush()

    except FileNotFoundError as f:
        error_message = str(f.strerror, get_path_relative_to_username(f.filename))
        return error_message

    else:
        run_converter(path_to_current_working_directory)
        
def main():
    test_failures = {}
    test_assets = Path.cwd().parent.parent 
    json_tests_directory = Path.cwd()/"tests"/"enabled"
    try:
        os.remove(ERROR_REPORT_JSON)
    except:
        pass
    try:
        for json_test in tqdm(os.listdir(json_tests_directory)):
            try:
                with tempfile.TemporaryDirectory() as temp_folder:
                    top_level_output_directory = Path(temp_folder)/"src"
                    error_message = create_directory(top_level_output_directory)     # Create a "src" directory in the temporary directory.
                    if error_message:
                        test_failures = write_to_dict(test_failures, json_test, error_message)
                        break

                    try:
                        with open(json_tests_directory/json_test) as json_test_file:
                            test_cases_json = json.load(json_test_file)
                            
                            converter_error = convert_test_case(top_level_output_directory, test_assets, test_cases_json, Path.cwd().parent)
                            if converter_error:
                                test_failures = write_to_dict(test_failures, json_test, converter_error)
                                continue

                            # Call asserter to check the expectedJSON.
                            expected_output = test_cases_json["expectedOutput"]
                            test_case = TestCase(top_level_output_directory, expected_output)
                            test_case.verify_expected_and_generated_files_match()

                            if test_case.error_message_list:
                                for error in test_case.error_message_list:
                                    test_failures = write_to_dict(test_failures, json_test, error)

                    except FileNotFoundError as f:
                        error_message = str(f.strerror, get_path_relative_to_username(f.filename))
                        test_failures = write_to_dict(test_failures, json_test, error_message)

                    except OSError as e:
                        error_message = str(e.strerror)
                        test_failures = write_to_dict(test_failures, json_test, error_message)

            except OSError as e:
                error_message = str(e.strerror)
                test_failures = write_to_dict(test_failures, json_test, error_message)   

        write_to_json_file(ERROR_REPORT_JSON, test_failures)

    except OSError as e:
        print("<ERROR>: ", e.strerror)

if __name__ == "__main__":
    main()
        
