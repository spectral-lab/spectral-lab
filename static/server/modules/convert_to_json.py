from flask import jsonify, wrappers
from typing import List
import numpy as np


def convert_to_json(feature_lines: List[np.ndarray]) -> wrappers.Response:
    to_convert = []
    for item in feature_lines:
        to_convert.append(item.tolist())

    return jsonify(to_convert)

