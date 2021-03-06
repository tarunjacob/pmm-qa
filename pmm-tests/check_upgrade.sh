#!/bin/sh

#check for packages after upgrade
export PMM_SERVER_DOCKER_CONTAINER=$(docker ps | grep 'pmm-server' | awk '{print $12}')
echo $PMM_SERVER_DOCKER_CONTAINER
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep percona-qan-app-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep percona-qan-api2-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep percona-dashboards-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep pmm-update-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep pmm-server-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep pmm-managed-$1
docker exec $PMM_SERVER_DOCKER_CONTAINER rpm -qa | grep pmm2-client-$1