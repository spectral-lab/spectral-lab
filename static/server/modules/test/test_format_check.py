from unittest import TestCase
from skimage.data import binary_blobs
from skimage import img_as_int, img_as_float
from skimage.exposure import rescale_intensity
import numpy as np
from .. import check_format
import os
import random
from .helpers import iter_all_files

__dirname__ = os.path.dirname(os.path.realpath(__file__))


class TestFormatCheck(TestCase):
    def test_with_none(self):
        result = check_format(None)
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("ndarray") > 0)

    def test_with_str(self):
        result = check_format('hello')
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("ndarray") > 0)

    def test_bool_ndarray(self):
        specimen = binary_blobs(length=4, seed=1)
        result = check_format(specimen)
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("float") > 0)

    def test_int_ndarray(self):
        specimen = binary_blobs(length=4, seed=1)
        specimen = img_as_int(specimen)
        result = check_format(specimen)
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("float") > 0)

    def test_out_of_range(self):
        specimen = binary_blobs(length=4, seed=1)
        specimen = img_as_float(specimen)
        sigma = 0.35
        specimen += np.random.normal(loc=0, scale=sigma, size=specimen.shape)
        specimen = rescale_intensity(specimen, in_range=(specimen.min(), specimen.max()), out_range=(-1., 1.))
        result = check_format(specimen)
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("range") > 0)

    def test_invalid_dimension(self):
        sigma = 0.5
        specimen = np.random.normal(loc=0, scale=sigma, size=(4, 2, 2))
        specimen = rescale_intensity(specimen, in_range=(specimen.min(), specimen.max()), out_range=(0., 1.))
        result = check_format(specimen)
        self.assertFalse(result['is_ok'])
        self.assertTrue(result['msg'].find("dimension") > 0)

    def test_correct_data(self):
        sigma = 0.5
        specimen = np.random.normal(loc=0, scale=sigma, size=(4, 2))
        specimen = rescale_intensity(specimen, in_range=(specimen.min(), specimen.max()), out_range=(0., 1.))
        result = check_format(specimen)
        self.assertTrue(result['is_ok'])
        self.assertTrue(result['msg'] == "")

    def test_real_data(self):
        @iter_all_files(__dirname__ + "/data/spectrogram")
        def main(filepath):
            spectrogram_img = np.load(filepath)
            result = check_format(spectrogram_img)
            self.assertTrue(result['is_ok'])
            self.assertTrue(result['msg'] == "")

        main()


