"""Compatibility launcher for the shared-voting preview (requires Node 22.13+)."""
from pathlib import Path
import shutil
import subprocess
import sys

if __name__ == '__main__':
    node = shutil.which('node')
    if not node:
        sys.exit('Node.js 22.13+ is required. Install it, then run npm start.')
    server = Path(__file__).with_name('server.mjs')
    raise SystemExit(subprocess.call([node, str(server), *sys.argv[1:]]))
