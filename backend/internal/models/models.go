package models

// Conf - app config
type Conf struct {
	Host     string `form:"host"`
	Port     string `form:"port"`
	Theme    string `form:"theme"`
	Color    string `form:"color"`
	DirPath  string
	ConfPath string
	DBPath   string
	Version  string
}

// Food is one food item
type Food struct {
	ID    int64 `gorm:"primaryKey"`
	Date  string
	Name  string
	Group string
	Tag   string
	Fat   int64
	Prot  int64
	Carb  int64
	Kcal  int64
	Size  int64
	Link  string
}
