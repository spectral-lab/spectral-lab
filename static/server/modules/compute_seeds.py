import numpy as np
from math import ceil
from pdb import set_trace
from .constants import IGNORE_RATE


def compute_seeds(img: np.ndarray,
                  proportion_of_hottest_area: float = 0.0005,
                  proportion_of_coldest_area: float = 0.0005) -> np.ndarray:
    """
    :param img: image of spectrogram
    :param proportion_of_hottest_area: from 0. to 1.
    :param proportion_of_coldest_area: from 0. to 1.
    :return: Ndarray which indicates the hottest area as 2, the coldest area as 1,
             area which should be ignored as -1, and remaining area as 0.
    """

    ignore_area = compute_ignore_area(img)
    is_cold = detect_cold_pixels(img, img.size * proportion_of_coldest_area, ignore_area)
    is_hot = detect_hot_pixels(img, img.size * proportion_of_hottest_area, ignore_area)

    seed_markers = np.zeros(img.shape, dtype=np.int)
    seed_markers[is_cold] = 1
    seed_markers[is_hot] = 2
    seed_markers[ignore_area] = -1
    return seed_markers


def detect_cold_pixels(_img: np.ndarray, target_num_pixels: int or float, ignore_area: np.ndarray) -> np.array:
    img = _img + ignore_area  # ignore area will be larger number than 1
    is_cold = np.zeros(img.shape, dtype=bool)
    num_detected = 0
    unique, counts = np.unique(img, return_counts=True)
    while target_num_pixels > num_detected:
        min_magnitude = unique.min()
        is_cold[img == min_magnitude] = True
        num_detected += counts[unique == min_magnitude][0]
        unique[unique == min_magnitude] = 1.
    return is_cold


def detect_hot_pixels(_img: np.ndarray, target_num_pixels: int or float, ignore_area: np.ndarray) -> np.array:
    coef = 1 - ignore_area
    img = _img * coef  # ignore area will be 0
    is_hot = np.zeros(img.shape, dtype=bool)
    num_detected = 0
    unique, counts = np.unique(img, return_counts=True)
    while target_num_pixels > num_detected:
        max_magnitude = unique.max()
        is_hot[img == max_magnitude] = True
        num_detected += counts[unique == max_magnitude][0]
        unique[unique == max_magnitude] = 0.
    return is_hot


def compute_ignore_area(img: np.ndarray):
    """
    :param img:
    :return: Element of ndarray is bool which indicates whether the corresponding pixel should be ignored
    """
    ignore_area = np.zeros(img.shape, dtype=bool)
    num_ignore_columns = ceil(img.shape[0] * IGNORE_RATE)
    ignore_area[0:num_ignore_columns, :] = True
    return ignore_area
