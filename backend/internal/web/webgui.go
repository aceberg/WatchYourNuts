package web

import (
	"embed"
	"html/template"
	"log"
	"net/http"

	"github.com/aceberg/WatchYourNuts/internal/api"
	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/conf"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// templFS - html templates
//
//go:embed templates/*
var templFS embed.FS

// pubFS - public folder
//
//go:embed public/*
var pubFS embed.FS

// Gui - start web server
func Gui() {
	const (
		colorCyan  = "\033[36m"
		colorReset = "\033[0m"
	)

	file, err := pubFS.ReadFile("public/version")
	check.IfError(err)
	conf.AppConfig.Version = string(file)[8:]

	address := conf.AppConfig.Host + ":" + conf.AppConfig.Port

	log.Println(colorCyan + "\n=================================== " +
		"\n  WatchYourNuts Version: " + conf.AppConfig.Version +
		"\n  Config dir: " + conf.AppConfig.DirPath +
		"\n  Web GUI: http://" + address +
		"\n=================================== " + colorReset)

	gin.SetMode(gin.ReleaseMode)
	// PROD
	// router := gin.New()
	// router.Use(gin.Recovery())
	// PROD

	// DEV
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173", "http://127.0.0.1:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))
	// DEV

	templ := template.Must(template.New("").ParseFS(templFS, "templates/*"))
	router.SetHTMLTemplate(templ) // templates

	router.StaticFS("/fs/", http.FS(pubFS)) // public

	router.GET("/", indexHandler)       // index.go
	router.GET("/config", indexHandler) // index.go
	// router.GET("/history", indexHandler) // index.go

	api.Routes(router)

	err = router.Run(address)
	check.IfError(err)
}
