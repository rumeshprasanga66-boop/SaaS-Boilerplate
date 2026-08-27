"""Vendored open-source foundations (OpenShorts, MoneyPrinterTurbo, AI-YSG).

These modules were vendored as flat scripts and use bare top-level imports
(e.g. ``from subtitles import ...``). Add this package's directory to
``sys.path`` so those imports resolve when used as a package.
"""

import os as _os
import sys as _sys

_pkg_dir = _os.path.dirname(_os.path.abspath(__file__))
if _pkg_dir not in _sys.path:
    _sys.path.insert(0, _pkg_dir)