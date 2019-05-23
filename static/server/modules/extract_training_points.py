import numpy as np
from typing import List
from math import floor, ceil
from .export_graph import export_3d_scatter
from pdb import set_trace
from . import export_graph


def extract_training_points(segment_labels: np.ndarray, spectrogram2d: np.ndarray, pass_rate=0.5) -> List[np.ndarray]:
    """
    :param segment_labels
    :param spectrogram2d
    :param pass_rate: rate to be judged as training points.
    :return: Each element represents training points in one segment.
             Training points are formatted like [time, freq, magnitude].
             The shape of ndarray is (n, 3).
    """
    if spectrogram2d.shape != segment_labels.shape:
        raise Exception('Input shape does not match')

    selected_points = []

    for target_label in range(segment_labels.max() + 1):
        masked_spectrogram = spectrogram2d * (segment_labels == target_label)
        time_indices, freq_indices = np.meshgrid(np.arange(segment_labels.shape[1]), np.arange(segment_labels.shape[0]))

        is_higher = audition_magnitude(masked_spectrogram, pass_rate)

        selected_points.append(
            np.column_stack([
                time_indices[is_higher],
                freq_indices[is_higher],
                spectrogram2d[is_higher]
            ])
        )

    return selected_points


def audition_magnitude(masked_spectrogram, pass_rate=0.5) -> np.ndarray:
    """
    After determining the threshold based on the pass_rate param,
    make ndarray of bool which indicates if the magnitude is higher or not
    :param masked_spectrogram:
    :param pass_rate: threshold is set to achieve this pass rate.
    """

    is_higher = np.zeros(masked_spectrogram.shape, dtype=bool)

    for time_idx, column_of_spectrogram in enumerate(masked_spectrogram.T):
        if column_of_spectrogram.max() <= 0:
            continue
        magnitudes = np.unique(column_of_spectrogram)
        num_nonzero = np.count_nonzero(magnitudes)
        num_points_to_pass = ceil(num_nonzero * pass_rate)

        threshold = 0
        if abs(-num_points_to_pass-1) <= magnitudes.shape[-1]:
            threshold = np.sort(magnitudes)[-num_points_to_pass-1]
        is_higher[column_of_spectrogram > threshold, time_idx] = True

    return is_higher
