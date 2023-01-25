Stopping and Removing All Containers

```
$ docker ps -aq | xargs docker stop | xargs docker rm

or

$ docker ps -aq | xargs docker rm -f

```
