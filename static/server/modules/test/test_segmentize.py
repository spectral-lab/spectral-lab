from unittest import TestCase, skip
from .. import segmentize, export_graph, compute_seeds
from skimage.data import binary_blobs
import numpy as np
from skimage import img_as_float
from skimage.exposure import rescale_intensity
from skimage.measure import label
import os
import random
from pdb import set_trace
from .helpers import iter_all_files

TARGET_ACCURACY_RATE = 0.85
NUMBER_OF_TEST_LOOPS = 1

__dirname__ = os.path.dirname(os.path.realpath(__file__))


# noinspection PyTypeChecker
class TestSegmentize(TestCase):
    @skip("")
    def test_accuracy_rate(self):
        # TODO: Refactor
        accuracy_rate = 0
        for _ in range(NUMBER_OF_TEST_LOOPS):
            specimen = img_as_float(binary_blobs(length=16, seed=1))
            expected_num_segments = label(specimen).max()
            sigma = 0.35
            specimen += 0.07 * np.random.normal(loc=0, scale=sigma, size=specimen.shape)
            specimen = rescale_intensity(specimen, in_range=(specimen.min(), specimen.max()), out_range=(0., 1.))
            line_continuity = 0
            seed_markers = compute_seeds(specimen)
            segment_labels = segmentize(specimen, seed_markers, line_continuity)
            actual_num_segments = segment_labels.max() + 1
            print(specimen)
            print(segment_labels)
            print(expected_num_segments)
            print(actual_num_segments)
            if actual_num_segments == expected_num_segments:
                accuracy_rate += 1. / NUMBER_OF_TEST_LOOPS
                set_trace()
        if accuracy_rate < TARGET_ACCURACY_RATE:
            print('accuracy rate is')
            print(accuracy_rate)
        self.assertTrue(accuracy_rate > TARGET_ACCURACY_RATE)

    @skip("")
    def test_smoothing(self):
        specimen = img_as_float(binary_blobs(length=16, seed=1))
        sigma = 0.35
        specimen += 0.07 * np.random.normal(loc=0, scale=sigma, size=specimen.shape)
        specimen = rescale_intensity(specimen, in_range=(specimen.min(), specimen.max()), out_range=(0., 1.))
        line_continuity = 2
        seed_markers = compute_seeds(specimen)
        segment_labels = segmentize(specimen, line_continuity, seed_markers)
        number_of_segments = segment_labels.max() + 1
        self.assertTrue(number_of_segments > 0)

    @skip("")
    def test_with_real_data(self):
        @iter_all_files(__dirname__ + '/data/seed_markers')
        def check_reproducing_labels(file_path: str):
            spectrogram_img = np.load(os.path.join(__dirname__, "data/spectrogram", os.path.basename(file_path)))
            seed_markers = np.load(file_path)
            actual_labels = segmentize(spectrogram_img, seed_markers)
            # np.save(os.path.join(__dirname__, "data/segment_labels", os.path.basename(file_path)), actual_labels)
            expected_labels = np.load(os.path.join(__dirname__, "data/segment_labels", os.path.basename(file_path)))
            self.assertTrue(np.array_equal(actual_labels, expected_labels))

        check_reproducing_labels()
