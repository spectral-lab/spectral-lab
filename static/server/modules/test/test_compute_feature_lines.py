from unittest import TestCase, skip
from .. import compute_feature_lines, polynomial_regression, coefs_to_formula, export_graph, \
               extract_training_points, nearest_magnitude, feature_lines_to_image
from typing import List, Callable
from .helpers import iter_all_files
import os
import numpy as np
from pdb import set_trace

__dirname__ = os.path.dirname(os.path.realpath(__file__))


class TestComputeFeatureLines(TestCase):
    # @skip("")
    def test_with_real_data(self):
        @iter_all_files(__dirname__ + '/data/segment_labels')
        def main(file_path):
            # print()
            # print("checking " + file_path)
            segment_labels = np.load(file_path)
            spectrogram_img = np.random.rand(*segment_labels.shape)
            export_graph(spectrogram_img, "spectrogram")
            export_graph(segment_labels, "segment_labels")
            training_points = extract_training_points(segment_labels, spectrogram_img, pass_rate=0.3)
            export_graph(feature_lines_to_image(training_points, spectrogram_img.shape), "training_points")
            feature_lines = compute_feature_lines(training_points, degree=3)
            export_graph(feature_lines_to_image(feature_lines, spectrogram_img.shape), "feature_lines")
            # np.save(os.path.join(__dirname__, "data/feature_lines", os.path.basename(file_path)), actual_feature_lines)

        main()

    # @skip("")
    def test_polynomial_regression(self):
        x = np.arange(1000, dtype=float)
        orig_coefs = np.array([3., -2., 1., -1.])
        y = orig_coefs[0] + orig_coefs[1] * x + orig_coefs[2] * x ** 2 + orig_coefs[3] * x ** 3
        y += np.random.rand(*x.shape) * 0.5
        regressed_coefs = polynomial_regression(x, y, degree=3)
        mean_diff = np.mean(regressed_coefs - orig_coefs)
        is_acceptable = -0.1 < mean_diff < 0.1
        if not is_acceptable:
            print()
            print("originla coefs: ")
            print(orig_coefs)
            print("regressed coefs: ")
            print(regressed_coefs)
            print(mean_diff)
        self.assertTrue(is_acceptable)

    # @skip("")
    def test_coefs_to_formula(self):
        x = np.arange(5)
        coefs = np.array([2, 1, -4, 0])
        calc_y: Callable = coefs_to_formula(coefs)
        actual_y = calc_y(x)
        expected_y = coefs[0] + coefs[1] * x + coefs[2] * x ** 2 + coefs[3] * x ** 3
        is_acceptable = np.array_equal(actual_y, expected_y)
        if not is_acceptable:
            print()
            print("actual Y: ")
            print(actual_y)
            print("expected Y: ")
            print(expected_y)
        self.assertTrue(is_acceptable)

    # @skip("")
    def test_nearest_magnitude(self):
        times = np.array([0.1, 0.2, 0.3, 0.4])
        freqs = np.array([100.3, 200.2, 300.6, 400.7])
        points = np.array([[0.1, 100, 1.1],
                           [0.1, 101, 2.2],
                           [0.1, 102, 3.3],
                           [0.2, 100, 1.2],
                           [0.2, 200, 2.3],
                           [0.3, 100, 3.6]])
        actual_magnitudes = nearest_magnitude(times, freqs, points)
        expected_magnitudes = [1.1, 2.3, 3.6, 0]
        is_acceptable = np.array_equal(actual_magnitudes, expected_magnitudes)
        if not is_acceptable:
            print()
            print("actual magnitudes: ")
            print(actual_magnitudes)
            print("expected magnitudes: ")
            print(expected_magnitudes)
        self.assertTrue(is_acceptable)