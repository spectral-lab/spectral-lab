import numpy as np
from typing import Iterable, Union


def to_matrix(points: np.ndarray) -> Iterable[Union[np.ndarray, np.ndarray, np.ndarray]]:
    x = points[:, 0].flatten()
    y = points[:, 1].flatten()
    z = points[:, 2].flatten()
    times = np.sort(np.unique(x))
    freqs = np.sort(np.unique(y))
    magnitude = np.empty(shape=(freqs.size, times.size))
    it = np.nditer(magnitude, flags=['multi_index'])
    while not it.finished:
        its_time = times[it.multi_index[1]]
        its_freq = freqs[it.multi_index[0]]
        row_idx_in_points = np.logical_and(x == its_time, y == its_freq)
        magnitude_to_add = 0
        if np.sum(row_idx_in_points) > 0:
            magnitude_to_add = z[row_idx_in_points][0]
        if np.sum(row_idx_in_points) == 0:
            magnitude_to_add = 0
        magnitude[it.multi_index] = magnitude_to_add
        it.iternext()
    return times, freqs, magnitude


def to_points(time, freq, magnitude):
    magnitude_2d = magnitude

    num_times = magnitude_2d.shape[1]
    num_freqs = magnitude_2d.shape[0]

    time_2d = np.empty(shape=(1, num_times))
    time_2d[0, :] = time
    time_2d = np.repeat(time_2d, num_freqs, axis=0)

    freq_2d = np.empty(shape=(num_freqs, 1))
    freq_2d[:, 0] = freq
    freq_2d = np.repeat(freq_2d, num_times, axis=1)

    x = time_2d.flatten()
    y = freq_2d.flatten()
    z = magnitude_2d.flatten()

    points = np.column_stack([x, y, z])

    return points
