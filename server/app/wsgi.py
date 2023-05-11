import sys
import logging
logging.basicConfig(stream=sys.stderr)

sys.path.insert(0, '/var/www/cf-express-backend/')

from app import create_app
application = create_app()
