from unittest import TestCase, skip
from .. import export_graph, extract_training_points, feature_lines_to_image
from .helpers import iter_all_files
import os
import numpy as np

__dirname__ = os.path.dirname(os.path.realpath(__file__))


class TestExtractTrainingPoints(TestCase):
    # @skip("")
    def test_with_real_data(self):
        @iter_all_files(__dirname__ + '/data/segment_labels')
        def main(file_path):
            # print()
            # print("checking " + file_path)
            filename = os.path.splitext(os.path.basename(file_path))[0]
            segment_labels = np.load(file_path)
            spectrogram_img = np.random.rand(*segment_labels.shape)
            export_graph(spectrogram_img, filename + "_spectrogram")
            export_graph(segment_labels, filename + "_segment_labels")
            training_points = extract_training_points(segment_labels, spectrogram_img, pass_rate=0.3)
            export_graph(feature_lines_to_image(training_points, spectrogram_img.shape), filename + "_training_points")

        main()
