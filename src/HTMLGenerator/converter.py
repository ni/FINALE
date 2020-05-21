import time
import os.path
import subprocess
import pathlib
from pathlib import Path
import json

CURRENT_CONFIGURATION_PATH = "currentConfiguration.txt"
NOTIFICATION_PATH = "complete.txt"
LABVIEW_PATH = Path("C:/Program Files/National Instruments/LabVIEW 2017/LabVIEW.exe")

def _get_path_relative_to_username(filename):
    # Return a path that is relative to the ~user
    s = Path("~") 
    filename_path = Path(filename)
    return str(filename_path.relative_to(s.expanduser()))

def convert(top_level_output_directory, top_level_input_directory, json_with_filepaths, path_to_current_working_directory = Path.cwd()):    
    converter_path = Path(path_to_current_working_directory / "ConvertFromConfigurationFile.vi")
    current_configuration_absolute_path = Path(path_to_current_working_directory / CURRENT_CONFIGURATION_PATH)
    notification_absolute_path = Path(path_to_current_working_directory / NOTIFICATION_PATH)
    call_converter_command = str(LABVIEW_PATH) + " " + str(converter_path)
    try:
        if os.path.isfile(notification_absolute_path):
            os.remove(notification_absolute_path)                
    except:
        pass
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
        error_message = str(f.strerror, _get_path_relative_to_username(f.filename))
        return error_message

    else:
        try:
            process = subprocess.Popen(call_converter_command, stdin=subprocess.PIPE)
        except OSError as e:
            error_message = str(e)
            print(error_message , "\n")
            return error_message   

    while(True):
        if(os.path.isfile(notification_absolute_path)): 
            process.stdin.close()
            process.wait()
            break
        else:
            time.sleep(3)
    os.remove(notification_absolute_path)
    os.remove(current_configuration_absolute_path)

    return

def convertFromCli(jsonFilePath) :
    with open(jsonFilePath) as jsonFile:
            json_with_filepaths = json.load(jsonFile)
            converter_path = Path(Path.cwd() / "ConvertFromConfigurationFile.vi")
            current_configuration_absolute_path = Path(Path.cwd() / CURRENT_CONFIGURATION_PATH)
            notification_absolute_path = Path(Path(json_with_filepaths["outputPath"]) / NOTIFICATION_PATH)
            call_converter_command = str(LABVIEW_PATH) + " " + str(converter_path)
            try:
                if os.path.isfile(notification_absolute_path):
                    os.remove(notification_absolute_path)                
            except:
                pass
            # Writing the top, preload, input and output path to the currentConfiguration.txt file.
            try:
                with open(current_configuration_absolute_path, 'w') as current_configuration_file:
                    if "topPath" in json_with_filepaths:
                        current_configuration_file.write(
                        '/top:' + str(json_with_filepaths["topPath"]) + "\n")
                    current_configuration_file.write(
                    '/input:' + str(json_with_filepaths["inputPath"]) + "\n")
                    if "preloadedFiles" in json_with_filepaths:    
                        current_configuration_file.write(
                        '/preload:' + str(Path(json_with_filepaths["preloadedFiles"])) + "\n")
                    if "outputPath" in json_with_filepaths:
                        current_configuration_file.write(
                        '/out:' + str(json_with_filepaths["outputPath"]) + "\n")
                    current_configuration_file.flush()

            except FileNotFoundError as f:
                error_message = str(f.strerror, _get_path_relative_to_username(f.filename))
                return error_message

            else:
                try:
                    process = subprocess.Popen(call_converter_command, stdin=subprocess.PIPE)
                except OSError as e:
                    error_message = str(e)
                    print(error_message , "\n")
                    return error_message   

            while(True):
                if(os.path.isfile(notification_absolute_path)): 
                    process.stdin.close()
                    process.wait()
                    break
                else:
                    time.sleep(3)
            os.remove(notification_absolute_path)
            os.remove(current_configuration_absolute_path)

            return
