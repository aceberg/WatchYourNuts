[![Docker](https://github.com/aceberg/WatchYourNuts/actions/workflows/main-docker-all.yml/badge.svg)](https://github.com/aceberg/WatchYourNuts/actions/workflows/main-docker-all.yml)
[![Binary-release](https://github.com/aceberg/WatchYourNuts/actions/workflows/binary-release.yml/badge.svg)](https://github.com/aceberg/WatchYourNuts/actions/workflows/binary-release.yml)
![Docker Image Size (latest semver)](https://img.shields.io/docker/image-size/aceberg/watchyournuts)

<h1><a href="https://github.com/aceberg/WatchYourNuts">
    <img src="https://raw.githubusercontent.com/aceberg/WatchYourNuts/main/assets/logo.png" width="20" />
</a>WatchYourNuts</h1>
<br/>

WatchYourNuts (aka Nutrients): self-hosted calorie tracker

![Screenshot_2](https://raw.githubusercontent.com/aceberg/WatchYourNuts/main/assets/Screenshot_2.png)  

## Quick start

```sh
docker run --name WatchYourNuts \
-e "TZ=$YOURTIMEZONE" \
-v ~/.dockerdata/WatchYourNuts:/data/WatchYourNuts \
-p 8860:8860 \
aceberg/watchyournuts
```

## Config

Configuration can be done through `config.yaml` file or GUI, or environment variables

| Variable  | Description | Default |
| --------  | ----------- | ------- |
| HOST | Listen address | 0.0.0.0 |
| PORT   | Port for web GUI | 8860 |
| THEME | Any theme name from https://bootswatch.com in lowcase or [additional](https://github.com/aceberg/aceberg-bootswatch-fork) | emerald |
| COLOR | Background color: light or dark | light |
| TZ | Set your timezone for correct time | "" |

## Options

| Key  | Description | Default | 
| --------  | ----------- | ------- | 
| -d | Path to config dir | /data/WatchYourNuts | 

## Thanks
- [Bootstrap](https://getbootstrap.com/)
- Themes: [Free themes for Bootstrap](https://bootswatch.com)
- Favicon and logo: <a href="https://www.flaticon.com/free-icons/nut" title="nut icons">Nut icons created by amoghdesign - Flaticon</a>