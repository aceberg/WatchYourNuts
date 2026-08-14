package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/conf"
)

func getConfig(c *gin.Context) {
	c.JSON(http.StatusOK, conf.AppConfig)
}

func saveConfig(c *gin.Context) {

	config := conf.AppConfig
	err := c.ShouldBind(&config)

	if !check.IfError(err) {
		conf.AppConfig = config
		conf.Write(conf.AppConfig)
	}

	c.Redirect(http.StatusFound, c.Request.Referer())
}
