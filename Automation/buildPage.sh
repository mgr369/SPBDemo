#!/bin/bash

WEB_PORT=8005
function funStartWebServer() {
  (
  cat << __EOF
from os import chdir
from http.server import HTTPServer, SimpleHTTPRequestHandler

HOST='127.0.0.1'
port = ${WEB_PORT}
httpd = HTTPServer( (HOST,port), SimpleHTTPRequestHandler )
httpd.serve_forever()
__EOF
  ) | python3 1>http.log 2>&1 &
}

function funStopWebServer() {
    killall python3 # TODO:(0) Improve
}

INPUT=$1
if [[ ! -f $INPUT ]]; then 
    echo "Single file supported as input at this moment"
    exit 1
fi
OUTPUT_FILE=${INPUT}_map.html
GIT_PUBLISH_URL="git remote get-url origen"

METAL_KEYWORDS_CSV="" # TODO:(0)
HTML_TITLE=""         # TODO:(0)
URL_JS="./IT_notes/map_v1.js"
URL_CSS="./IT_notes/map_v1.css"

###############################
# STEP 1)  CREATE HTML HEADER #
###############################
cat << EOF_BODY > ${OUTPUT_FILE}
<!DOCTYPE html>
<html>
   <meta charset="UTF-8">
   <meta name="keywords" content="${METAL_KEYWORDS_CSV}">
   <meta name="viewport"
     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   <title>${HTML_TITLE}</title>
<head>
<script type=module src=${URL_JS}></script>

<link rel='stylesheet' type='text/css' href='${URL_CSS}' />
</head>
<body>
EOF_BODY

########################
# STEP 2)  INSERT BODY #
########################
cat $INPUT >> ${OUTPUT_FILE}

########################
# STEP 3)  INSERT FOOT #
########################
cat << EOF_FOOT >> ${OUTPUT_FILE}
</body>
</html>
EOF_FOOT

##########################
# STEP 4)  Launch server #
##########################
# Check if local http server is up:
netstat -ntlp | grep 8005.*python
if [[ $? == 0 ]] ; then 
    echo "HTTP Server detected. Stop it?"
    select OPT  in YES NO
    do 
    if [[   $OPT  == "YES" ]] ; then funStopWebServer ; fi 
    break
    done
fi

funStartWebServer # It can fail if already running.

###########################
# STEP 5)  Launch browser #
###########################
firefox http://localhost:${WEB_PORT}/${OUTPUT_FILE}?query=.
