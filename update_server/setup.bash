# Just some ideas
SERVER_ADDRESS=root@...

SSH
which git || (
  apt-get update
  apt-get -y install git
)
which node || (

)
which yarn || (


)
which supervisor || (

)
echo "


" > /etc/supervisord/config
echo "
  . /etc/profile
  set -e
  rm -rf /repo
  git clone repo
  cd repo
  yarn
  LEVEL=medium yarn fetch || echo 'yarn failed'
  git add . || echo 'nothing to add'
  (git commit -m 'update from a packet bot' && git push origin HEAD) || echo 'can not commit'
  sleep 3600
"

supervisorctl reread
supervisorctl update all
supervisorctl restart all

