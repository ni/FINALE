import json
import pathlib
import os.path
import filecmp
from pathlib import Path
import utils
from utils import *

EXPECTED_PATH_KEY = "expectedPath"
EXPECTED_CONTENT_KEY = "expectedContent"
FILE_NOTGENERATED_ERROR = "File Not Generated: "
REFERENCEFILE_NOTFOUND_ERROR = "Reference File Not Found: "

class TestCase():

    def __init__(self, temp_directory, expected_output):
        self.temp_directory = temp_directory
        self.expected_outputs = expected_output
        self.error_message_list = []

    def _filenotfound_error_generator(self, error_message, filename):
        error_message = error_message + get_path_relative_to_username(filename)
        self.error_message_list.append(error_message)
        return

    def _sort_json_objects(self, json_object):
        if isinstance(json_object, dict):
            return sorted((k, self._sort_json_objects(v)) for k, v in json_object.items())
        if isinstance(json_object, list):
            return sorted(self._sort_json_objects(x) for x in json_object)
        else:
            return json_object
    
    def _get_absolutepath(self, expected_outputpath_index):
        # Path of file created in temporary directory.
        generated_path = self.temp_directory / \
            self.expected_outputs[expected_outputpath_index][EXPECTED_PATH_KEY]
        # Path of file in the tests/enabled folder.
        expected_path = Path.cwd().parent.parent / \
            self.expected_outputs[expected_outputpath_index][EXPECTED_CONTENT_KEY]
        return (generated_path, expected_path)

    def _assert_jsons_match(self, generated_and_expected_paths):
        generated_path, expected_path = generated_and_expected_paths
        generated_path_flag = 1
        expected_path_flag = 1
        try:
            with open(generated_path) as gp:
                generated_path_json = json.load(gp)
        except FileNotFoundError as f:
            self._filenotfound_error_generator(FILE_NOTGENERATED_ERROR, f.filename)
            generated_path_flag = 0
        try:
            with open(expected_path) as ep:
                expected_path_json = json.load(ep)
        except FileNotFoundError as f:
            self._filenotfound_error_generator(REFERENCEFILE_NOTFOUND_ERROR, f.filename)
            expected_path_flag = 0
        if generated_path_flag and expected_path_flag:
            if not self._sort_json_objects(expected_path_json) == self._sort_json_objects(generated_path_json):
                error_message = "Mismatch in json file: " + get_path_relative_to_username(generated_path)
                self.error_message_list.append(error_message)

    def _compare_textfiles(self, generated_and_expected_paths):
        generated_path, expected_path = generated_and_expected_paths
        if Path.exists(generated_path) and Path.exists(expected_path):
            if not filecmp.cmp(generated_path, expected_path):
                error_message = "Mismatch in .txt file: " + get_path_relative_to_username(generated_path)
                self.error_message_list.append(error_message)
        else:
            if not Path.exists(generated_path):
                self._filenotfound_error_generator(FILE_NOTGENERATED_ERROR, generated_path)
            if not Path.exists(expected_path):
                self._filenotfound_error_generator(REFERENCEFILE_NOTFOUND_ERROR, expected_path)

    def _load_and_assert_jsons_match(self, expected_outputpath_index):
        self._assert_jsons_match(self._get_absolutepath(expected_outputpath_index))

    def _load_and_assert_textfiles_match(self, expected_outputpath_index):
        self._compare_textfiles(self._get_absolutepath(expected_outputpath_index))

    def _load_and_assert_image_exists(self, expected_outputpath_index):
        generated_path, expected_path = self._get_absolutepath(expected_outputpath_index)
        if not Path.exists(generated_path):
            self._filenotfound_error_generator(FILE_NOTGENERATED_ERROR, generated_path)
        if not Path.exists(expected_path):
            self._filenotfound_error_generator(REFERENCEFILE_NOTFOUND_ERROR, expected_path)

    def verify_expected_and_generated_files_match(self):
        # Extract the file type from file extension.
        for expected_outputpath_index, expected_outputpath in enumerate(self.expected_outputs):
            if Path(expected_outputpath[EXPECTED_CONTENT_KEY]).suffix in ['.json']:
                self._load_and_assert_jsons_match(expected_outputpath_index)
            elif Path(expected_outputpath[EXPECTED_CONTENT_KEY]).suffix in ['.txt']:
                self._load_and_assert_textfiles_match(expected_outputpath_index)
            elif Path(expected_outputpath[EXPECTED_CONTENT_KEY]).suffix in ['.png']:
                self._load_and_assert_image_exists(expected_outputpath_index)
            else:
                error_message = "Unkown File type created: " + str(expected_outputpath[EXPECTED_CONTENT_KEY])
                self.error_message_list.append(error_message)
        return 
