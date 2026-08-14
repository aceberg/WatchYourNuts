package conf

import (
	"log"

	"github.com/spf13/viper"

	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/models"
)

// Write - write config to file
func Write(config models.Conf) {

	log.Println("INFO: Writing config to", config.ConfPath)

	viper.SetConfigFile(config.ConfPath)
	viper.SetConfigType("yaml")

	viper.Set("HOST", config.Host)
	viper.Set("PORT", config.Port)
	viper.Set("THEME", config.Theme)
	viper.Set("COLOR", config.Color)

	err := viper.WriteConfig()
	check.IfError(err)
}
