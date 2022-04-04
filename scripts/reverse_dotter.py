import sys
from pathlib import Path

from PIL import Image
import numpy as np

target_filepath = Path(sys.argv[1])
img = Image.open(target_filepath)
img.paste(img, (-1, -1), img)
img_array = np.array(img)
small_img_array = img_array[::3, ::3, :]
small_img = Image.fromarray(small_img_array)
small_img.save(target_filepath.with_suffix('.1-1.png'))
