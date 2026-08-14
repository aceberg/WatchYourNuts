package main

import (
	"flag"

	_ "time/tzdata"

	"github.com/aceberg/WatchYourNuts/internal/conf"
	"github.com/aceberg/WatchYourNuts/internal/gdb"
	"github.com/aceberg/WatchYourNuts/internal/web"
)

const dirPath = "/data/WatchYourNuts"

func main() {
	dirPtr := flag.String("d", dirPath, "Path to config dir")
	flag.Parse()

	// Make AppConfig
	conf.Start(*dirPtr)

	gdb.Start()

	web.Gui()
}
