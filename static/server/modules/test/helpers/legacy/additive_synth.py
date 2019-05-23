import sys
import numpy as np
from scipy.signal import savgol_filter
from .convert import to_matrix


def synthesize(points, sr, smoothing_level=10):
    # # make synthesized signal by adding multiple sine waves
    # # smoothing level must be natural number
    times, freqs, amps = to_matrix(points)
    sines = np.zeros(shape=(np.ceil(points[:, 0].max() * sr).astype(int), freqs.size))
    for i, freq in enumerate(freqs):
        endtime = times[-1]
        t_sample = np.arange(0, endtime, 1 / sr)
        a_sample = np.interp(t_sample, times, amps[i, :])
        a_sample = savgol_filter(a_sample, np.round(smoothing_level * sr // 100 + 1).astype(int), 3)
        sample = a_sample * np.sin(2 * np.pi * freq * t_sample)
        sines[:, i] = sample

    synthesized = np.sum(sines, axis=1)
    synthesized = synthesized / abs(synthesized).max()  # normalize
    return synthesized
