import numpy as np


def check_format(input_data: any) -> dict:
    """
    Checking if input data is correctly formatted as ndarray or not.
    Each item in ndarray is expected as float value with range 0. to 1.
    """
    # Set default
    result = dict(is_ok=False, msg="")

    if type(input_data) != np.ndarray:
        result["msg"] = "Cannot convert into ndarray"
        return result

    if len(input_data.shape) != 2:
        result["msg"] = "Invalid dimension"
        return result

    for item in input_data.flatten():
        if type(item) != np.float64:
            result["msg"] = "There is some non float value"
            return result

    for number in input_data.flatten():
        if number < 0. or 1. < number:
            result["msg"] = "There is some value out of range 0. to 1."
            return result

    result['is_ok'] = True

    return result
