from unittest import TestCase, skip
from .. import export_graph
import numpy as np
import os
from .helpers import iter_all_files
from pdb import set_trace

__dirname__ = os.path.dirname(os.path.realpath(__file__))


# noinspection PyTypeChecker
class TestExportGraph(TestCase):
    # @skip("Takes a lot of time to generate graphs")
    def test_export_graph_spectrogram(self):
        @iter_all_files(__dirname__ + '/data/spectrogram')
        def export_spectrogram(file_path):
            spectrogram_img = np.load(file_path)
            title = os.path.splitext(os.path.basename(file_path))[0]
            export_graph(spectrogram_img, "spectrogram_" + title)

        export_spectrogram()

    # @skip("Takes a lot of time to generate graphs")
    def test_export_marks(self):
        @iter_all_files(__dirname__ + '/data/seed_markers')
        def export_seed_markers(file_path):
            seed_markers = np.load(file_path)
            title = os.path.splitext(os.path.basename(file_path))[0]
            export_graph(seed_markers, "seed_markers_" + title)

        export_seed_markers()

    # @skip("Takes a lot of time to generate graphs")
    def test_export_segment_labels(self):
        @iter_all_files(__dirname__ + '/data/segment_labels')
        def export_segment_labels(file_path: str):
            segment_labels = np.load(file_path)
            title = os.path.splitext(os.path.basename(file_path))[0]
            export_graph(segment_labels, "segment_labels_" + title)

        export_segment_labels()



