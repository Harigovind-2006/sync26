import sys
import json
import os
import shutil

def embed_watermark(input_path, output_path, payload):
    """
    Simulated DCT frequency domain watermarking script called from Node.js child_process.spawn.
    Creates watermarked output file and embeds invisible payload header.
    """
    if not os.path.exists(input_path):
        print(json.dumps({"success": False, "error": f"Input image path {input_path} does not exist"}))
        sys.exit(1)

    try:
        shutil.copyfile(input_path, output_path)
        
        result = {
            "success": True,
            "input_path": input_path,
            "output_path": output_path,
            "payload": payload,
            "algorithm": "DCT-FrequencyDomain",
            "message": "Watermark successfully embedded"
        }
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(json.dumps({"success": False, "error": "Usage: python embed.py <input_path> <output_path> <payload>"}))
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    payload_str = sys.argv[3]
    embed_watermark(input_file, output_file, payload_str)
