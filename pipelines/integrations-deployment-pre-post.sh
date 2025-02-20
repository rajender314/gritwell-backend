#!/bin/bash
set -x
set -e
STAGE_SRC_DIR="/var/www/subdomains/gritwell-api/"
#PROD_SRC_DIR="/var/www/subdomains/gritwell-api/"
#m_prod_deployment() {
    ##Stoping supervisor before coping the files
#    systemctl stop supervisor
    #####Coping secret files to api
#    echo ****************coping secure files.......***************************
#    /usr/local/bin/aws s3 cp s3://gritwell-env-private/productionAPI.env $PROD_SRC_DIR/.env
    ###Installing nodemon
#    cd $STAGE_SRC_DIR/
#    sudo npm install 
#    ###Restart supervisor
#    systemctl restart supervisor
#}
m_stage_deployment() {
    ##Stoping supervisor before coping the files
    systemctl stop supervisor
    #####Coping secret files to api
    echo ****************coping secure files.......***************************
    /usr/local/bin/aws s3 cp s3://gritwell-env-private/stagingAPI.env $STAGE_SRC_DIR/.env
    ###Installing nodemon
    cd $STAGE_SRC_DIR
    sudo rm -rf node_modules
    sudo npm install 
    ###Restart supervisor
    systemctl restart supervisor
}
if [ "$DEPLOYMENT_GROUP_NAME" == "stage-grit-well-api-group" ]; then
    echo **************************************Running Deployment************************************
    m_stage_deployment
fi
#if [ "$DEPLOYMENT_GROUP_NAME" == "" ]; then
#    echo **************************************Running Deployment************************************
#    m_prod_deployment
#fi