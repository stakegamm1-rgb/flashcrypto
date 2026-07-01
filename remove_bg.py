import os
from rembg import remove
from PIL import Image

image_dir = "/Users/apple/Documents/Delaine/work/crypto master/src/assets/Images"
images_to_process = [
    "binance.jpeg",
    "binance2.jpeg",
    "binance3.jpeg",
    "trustwallet.jpeg"
]

for img_name in images_to_process:
    input_path = os.path.join(image_dir, img_name)
    if os.path.exists(input_path):
        output_name = img_name.replace(".jpeg", "_nobg.png")
        output_path = os.path.join(image_dir, output_name)
        
        try:
            print(f"Processing {input_path}...")
            input_img = Image.open(input_path)
            output_img = remove(input_img)
            output_img.save(output_path)
            print(f"Saved {output_path}")
        except Exception as e:
            print(f"Error processing {img_name}: {e}")
    else:
        print(f"File not found: {input_path}")
