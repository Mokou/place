import sys
from pathlib import Path

from PIL import Image
import numpy as np

target_filepath = Path(sys.argv[1])
img = Image.open(target_filepath).convert('RGBA')  # make sure image is RGBA
arr = np.array(img)
# add threshold to alpha channel
arr[:, :, 3] = np.where(arr[:, :, 3] > 32, 255, 0)
img_back = Image.fromarray(arr)
img_back.save(f"{target_filepath.stem}_alpha.png")
