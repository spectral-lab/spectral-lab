import numpy as np


def rescale(array: np.ndarray, range=(0., 1.)) -> np.ndarray:
    _array = np.copy(array)
    if range[1] - range[0] < 0:
        print('Max is smaller than min')
        print('Parameter "range" should be a tuple like (min, max)')
        return
    target_center = sum(range) / 2
    target_delta = range[1] - target_center

    # shift center to 0
    current_center = (_array.max() + _array.min()) / 2
    _array -= current_center
    # normalize (range will be (0, 1))
    _array /= np.max(_array)
    # multiple to target range
    _array *= target_delta
    # shift center
    _array += target_center
    return _array
