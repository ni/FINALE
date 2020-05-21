import os.path
import tempfile
import pathlib
import errno
import json
from pathlib import Path
from asserter import TestCase
from tqdm import tqdm
import utils
from utils import *
import sys
sys.path.append("..")
import converter
from converter import convert

ERROR_REPORT_JSON = r'errorReport.json'

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
                            converter_error = convert(test_cases_json, top_level_output_directory, test_assets, Path.cwd().parent)

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
        
