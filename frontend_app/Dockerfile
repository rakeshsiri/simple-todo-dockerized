FROM node:16
ADD . /node_web
WORKDIR /node_web

# Test that the flask_service host is defined

CMD curl "flask_host:5000"