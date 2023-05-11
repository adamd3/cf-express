import sys
import logging
logging.basicConfig(stream=sys.stderr)

activate_this = '/var/www/html/cf-express-backend/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

sys.path.insert(0, '/var/www/html/cf-express-backend/')

from app import create_app
application = create_app()
