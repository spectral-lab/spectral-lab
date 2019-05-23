import numpy as np
from typing import List, Callable
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from pdb import set_trace


def compute_feature_lines(training_points: List[np.ndarray], degree: int = 0) -> List[np.ndarray]:
    """
    :param training_points:
    :param degree:
    :return: [timeIdx, freqIdx , magnitude ] pairs splitted into some chunks which represents a peak line.
    """
    list_of_feature_lines = []
    for target_training_points in training_points:
        if target_training_points.shape[0] < 1:
            raise Exception('No training points')
        training_x = target_training_points[:, 0]
        coefs_y = polynomial_regression(training_x, target_training_points[:, 1], degree)
        calc_y: Callable = coefs_to_formula(coefs_y)
        x = np.sort(np.unique(training_x))
        y = calc_y(x)
        z = nearest_magnitude(x, y, target_training_points)
        list_of_feature_lines.append(np.column_stack([x, y, z]))
    return list_of_feature_lines


def polynomial_regression(x: np.ndarray, y: np.ndarray, degree=0) -> np.ndarray:
    model = Pipeline([('poly', PolynomialFeatures(degree)),
                      ('linear', LinearRegression(fit_intercept=False))])
    model = model.fit(x[:, np.newaxis], y)
    coefs = model.named_steps['linear'].coef_
    return coefs


def coefs_to_formula(coefs: np.ndarray) -> Callable[[np.ndarray], np.ndarray]:
    def ret_formula(x: np.ndarray) -> np.ndarray:
        y = np.zeros(x.shape)
        for i in range(coefs.shape[0]):
            y += coefs[i] * x ** i
        return y

    return ret_formula


def nearest_magnitude(times, freqs, points):
    magnitudes = np.zeros(times.shape)
    for i, time in enumerate(times):
        target_points = points[points[:, 0] == time, :]
        if target_points.size < 1:
            continue
        freq = freqs[i]
        diffs = abs(target_points[:, 1] - freq)
        magnitudes[i] = target_points[diffs == diffs.min(), 2][0]
    return magnitudes
