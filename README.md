# Taiwan_Tourguide

# build image
```
docker build taiwan_tourguide:latest .
```

# start service
```
docker-compose up -d # image, container be create
docker-compose start taiwan_tourguide
```

# stop service
```
docker-compose down
docker-compose stop taiwan_tourguide
```

# attach service
```
docker exec -it taiwan_tourguide /bin/bash
```

# in container

## install pnpm packages
```
pnpm i 
```

## run frontend service 
```
pnpm run dev

or 

vite
```