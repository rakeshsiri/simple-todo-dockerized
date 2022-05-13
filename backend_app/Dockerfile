FROM python:3.8.8
ADD . /python-flask
WORKDIR /python-flask
RUN pip install -r requirements.txt

# Test that the mongo_service host is defined

# RUN apk add --update --no-cache curl

CMD curl "mongodb_host:27017"