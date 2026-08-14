package conf

import (
	"github.com/spf13/viper"

	"github.com/aceberg/WatchYourNuts/internal/check"
	"github.com/aceberg/WatchYourNuts/internal/models"
)

func readConfig(path string) (config models.Conf) {

	viper.SetDefault("HOST", "0.0.0.0")
	viper.SetDefault("PORT", "8860")
	viper.SetDefault("THEME", "emerald")
	viper.SetDefault("COLOR", "light")

	viper.AutomaticEnv() // Get ENVIRONMENT variables

	viper.SetConfigFile(path)
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	check.IfError(err)

	err = viper.Unmarshal(&config)
	check.IfError(err)

	return config
}
