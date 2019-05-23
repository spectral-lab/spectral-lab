from skimage.segmentation import random_walker
from skimage.filters import gaussian
from skimage.measure import label
import numpy as np
from pdb import set_trace


def segmentize(img: np.ndarray, seed_markers: np.ndarray, line_continuity: int = 0) -> np.ndarray:
    """
    Segmentize spectrogram image. return labels which indicates background as -1 and foreground as index starts from 0

    :return
        : np.ndarray
            labels which indicates background as -1 and foreground as index starts from 0
    """
    smoothed_img = gaussian(img, sigma=(line_continuity, 0))

    # Each element of seed_markers is one of below.
    # ignored: -1, unknown: 0, background: 1, foreground: 2
    # random_walker determine which category each unknown element belongs to
    result_of_random_walker: np.ndarray = random_walker(smoothed_img, seed_markers, beta=10, mode='bf')
    # Set ignored -1 as background 1
    result_of_random_walker[result_of_random_walker == -1] = 1
    # ATTENTION: Background will then be labeled as -1:
    # See https://scikit-image.org/docs/0.13.x/api/skimage.measure.html#skimage.measure.label
    labels = label(result_of_random_walker, background=1) - 1
    return labels
