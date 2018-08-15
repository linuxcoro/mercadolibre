#!/bin/bash

set -e
set -u

# Set these environmental variables to override them,
# but they have safe defaults.
export PGHOST=ec2-50-17-194-129.compute-1.amazonaws.com
export PGDATABASE=ddjgevmsurduca
export PGUSER=nkhkzwpxietfbc
export PGPASSWORD=52140030c14ffbdd15a93968ba3e186a59acff91055d061798d7d86f7a9b21e9

RUN_PSQL="psql -X --set AUTOCOMMIT=off --set ON_ERROR_STOP=on "
${RUN_PSQL} <<SQL
INSERT INTO articulos (nombre,precio,imagen) VALUES("2 Pack - DIRECTV IR / RF Universal Remote Control (RC66RX)",9.64,"71lK+J4v9VL._SS135_.jpg");
SQL



